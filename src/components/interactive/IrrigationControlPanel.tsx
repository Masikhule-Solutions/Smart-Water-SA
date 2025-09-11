import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Droplets, 
  Play, 
  Square, 
  Clock, 
  Zap, 
  Thermometer,
  Gauge,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Timer,
  Activity
} from 'lucide-react';

interface IrrigationControlPanelProps {
  farmData: any;
  onStatusChange?: (status: any) => void;
}

interface IrrigationZone {
  id: string;
  name: string;
  isActive: boolean;
  flowRate: number; // L/min
  duration: number; // minutes
  soilMoisture: number; // percentage
  temperature: number; // celsius
  pressure: number; // bar
  lastIrrigated: string;
}

export default function IrrigationControlPanel({ farmData, onStatusChange }: IrrigationControlPanelProps) {
  const [zones, setZones] = useState<IrrigationZone[]>([
    {
      id: 'zone1',
      name: 'North Field',
      isActive: false,
      flowRate: 85,
      duration: 45,
      soilMoisture: 68,
      temperature: 24,
      pressure: 2.1,
      lastIrrigated: '2 hours ago'
    },
    {
      id: 'zone2', 
      name: 'South Field',
      isActive: true,
      flowRate: 92,
      duration: 30,
      soilMoisture: 72,
      temperature: 26,
      pressure: 2.3,
      lastIrrigated: 'Currently active'
    },
    {
      id: 'zone3',
      name: 'Greenhouse',
      isActive: false,
      flowRate: 45,
      duration: 20,
      soilMoisture: 78,
      temperature: 28,
      pressure: 1.8,
      lastIrrigated: '45 minutes ago'
    }
  ]);

  const [masterControlActive, setMasterControlActive] = useState(false);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [systemPressure, setSystemPressure] = useState(2.2);
  const [totalWaterUsed, setTotalWaterUsed] = useState(1847);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prevZones => 
        prevZones.map(zone => ({
          ...zone,
          soilMoisture: zone.isActive 
            ? Math.min(85, zone.soilMoisture + Math.random() * 2)
            : Math.max(45, zone.soilMoisture - Math.random() * 0.5),
          pressure: 1.5 + Math.random() * 1.0,
          flowRate: zone.isActive 
            ? zone.flowRate + (Math.random() - 0.5) * 10
            : zone.flowRate
        }))
      );
      
      if (zones.some(zone => zone.isActive)) {
        setTotalWaterUsed(prev => prev + Math.random() * 5);
      }
      
      setSystemPressure(2.0 + Math.random() * 0.6);
    }, 2000);

    return () => clearInterval(interval);
  }, [zones]);

  const handleZoneControl = async (zoneId: string, action: 'start' | 'stop') => {
    setIsLoading(true);
    setLastAction(`${action === 'start' ? 'Starting' : 'Stopping'} irrigation for ${zones.find(z => z.id === zoneId)?.name}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setZones(prevZones =>
      prevZones.map(zone =>
        zone.id === zoneId
          ? { 
              ...zone, 
              isActive: action === 'start',
              lastIrrigated: action === 'start' ? 'Just started' : 'Just stopped'
            }
          : zone
      )
    );
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      message: `${zones.find(z => z.id === zoneId)?.name} irrigation ${action === 'start' ? 'started' : 'stopped'} successfully`,
      type: action === 'start' ? 'success' : 'info',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
    setIsLoading(false);
    setLastAction('');
    
    if (onStatusChange) {
      onStatusChange({ action, zoneId, timestamp: new Date() });
    }
  };

  const handleMasterControl = async () => {
    setIsLoading(true);
    const newState = !masterControlActive;
    setLastAction(`${newState ? 'Activating' : 'Deactivating'} master irrigation control`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setMasterControlActive(newState);
    
    if (!newState) {
      // Stop all zones when master is turned off
      setZones(prevZones =>
        prevZones.map(zone => ({ ...zone, isActive: false, lastIrrigated: 'Stopped by master control' }))
      );
    }
    
    setIsLoading(false);
    setLastAction('');
  };

  const handleEmergencyStop = async () => {
    setIsLoading(true);
    setLastAction('EMERGENCY STOP ACTIVATED');
    setEmergencyStop(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Stop all irrigation immediately
    setZones(prevZones =>
      prevZones.map(zone => ({ ...zone, isActive: false, lastIrrigated: 'Emergency stopped' }))
    );
    setMasterControlActive(false);
    
    const emergencyNotification = {
      id: Date.now(),
      message: 'EMERGENCY STOP activated - All irrigation stopped',
      type: 'emergency',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setNotifications(prev => [emergencyNotification, ...prev.slice(0, 4)]);
    
    setIsLoading(false);
    setLastAction('');
    setTimeout(() => setEmergencyStop(false), 5000); // Reset after 5 seconds
  };

  const handleDurationChange = (zoneId: string, newDuration: number[]) => {
    setZones(prevZones =>
      prevZones.map(zone =>
        zone.id === zoneId ? { ...zone, duration: newDuration[0] } : zone
      )
    );
  };

  const totalActiveZones = zones.filter(zone => zone.isActive).length;
  const totalFlowRate = zones.reduce((sum, zone) => zone.isActive ? sum + zone.flowRate : sum, 0);

  return (
    <div className="space-y-6">
      {/* Header with Real-time Status */}
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Activity className="w-6 h-6 mr-3" />
              Real-time Irrigation Control Center
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${totalActiveZones > 0 ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm">{totalActiveZones} Active</span>
              </div>
              <Badge className={`${emergencyStop ? 'bg-red-500' : totalActiveZones > 0 ? 'bg-green-500' : 'bg-gray-500'}`}>
                {emergencyStop ? 'EMERGENCY' : totalActiveZones > 0 ? 'RUNNING' : 'STANDBY'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Real-time irrigation control system"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/80 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-xl font-bold">System Status: {emergencyStop ? 'EMERGENCY STOP' : 'OPERATIONAL'}</h3>
                <p className="text-blue-200">
                  Total Flow: {totalFlowRate.toFixed(1)}L/min • System Pressure: {systemPressure.toFixed(1)} bar
                </p>
              </div>
            </div>
          </div>

          {/* Real-time System Metrics */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-700">{totalWaterUsed.toFixed(0)}L</div>
              <div className="text-xs text-blue-600">Today's Usage</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Gauge className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-700">{systemPressure.toFixed(1)} bar</div>
              <div className="text-xs text-green-600">System Pressure</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-orange-700">{totalActiveZones}</div>
              <div className="text-xs text-orange-600">Active Zones</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Timer className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-purple-700">{totalFlowRate.toFixed(0)}L/min</div>
              <div className="text-xs text-purple-600">Flow Rate</div>
            </div>
          </div>

          {/* Master Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Master Control</p>
                  <p className="text-sm text-blue-600">Enable/disable all zones</p>
                </div>
              </div>
              <Switch
                checked={masterControlActive}
                onCheckedChange={handleMasterControl}
                disabled={isLoading || emergencyStop}
              />
            </div>
            
            <div className="flex items-center justify-center">
              <Button
                onClick={handleEmergencyStop}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
              >
                <Square className="w-5 h-5 mr-2" />
                EMERGENCY STOP
              </Button>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">System Health</p>
              <p className="text-xs text-green-600">All sensors operational</p>
            </div>
          </div>

          {/* Loading/Action Indicator */}
          {(isLoading || lastAction) && (
            <Alert className="mb-4 bg-blue-50 border-blue-300">
              <Activity className="h-4 w-4 text-blue-600 animate-spin" />
              <AlertDescription className="text-blue-800">
                {lastAction || 'Processing irrigation command...'}
              </AlertDescription>
            </Alert>
          )}

          {/* Recent Notifications */}
          {notifications.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-2">Recent Actions</h4>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notification) => (
                  <Alert 
                    key={notification.id} 
                    className={`py-2 ${
                      notification.type === 'emergency' ? 'bg-red-50 border-red-300' :
                      notification.type === 'success' ? 'bg-green-50 border-green-300' :
                      'bg-blue-50 border-blue-300'
                    }`}
                  >
                    <AlertDescription className={`text-sm ${
                      notification.type === 'emergency' ? 'text-red-800' :
                      notification.type === 'success' ? 'text-green-800' :
                      'text-blue-800'
                    }`}>
                      <span className="font-medium">{notification.timestamp}</span> - {notification.message}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual Zone Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <Card key={zone.id} className={`shadow-lg transition-all duration-300 ${
            zone.isActive ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'
          }`}>
            <CardHeader className={`${
              zone.isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'
            } text-white rounded-t-lg`}>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  {zone.name}
                </CardTitle>
                <div className={`w-3 h-3 rounded-full ${zone.isActive ? 'bg-green-300 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {/* Zone Status */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <Droplets className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-blue-700">{zone.soilMoisture.toFixed(1)}%</div>
                  <div className="text-xs text-blue-600">Soil Moisture</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <Thermometer className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-orange-700">{zone.temperature}°C</div>
                  <div className="text-xs text-orange-600">Temperature</div>
                </div>
              </div>

              {/* Soil Moisture Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Soil Moisture</span>
                  <span>{zone.soilMoisture.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={zone.soilMoisture} 
                  className={`h-2 ${zone.soilMoisture < 60 ? 'bg-red-100' : zone.soilMoisture > 80 ? 'bg-blue-100' : 'bg-green-100'}`} 
                />
                <div className="text-xs text-gray-500 mt-1">
                  {zone.soilMoisture < 60 ? 'Low - Irrigation recommended' :
                   zone.soilMoisture > 80 ? 'High - Consider reducing' :
                   'Optimal range'}
                </div>
              </div>

              {/* Duration Slider */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Duration</span>
                  <span>{zone.duration} minutes</span>
                </div>
                <Slider
                  value={[zone.duration]}
                  onValueChange={(value) => handleDurationChange(zone.id, value)}
                  max={120}
                  min={5}
                  step={5}
                  className="w-full"
                  disabled={zone.isActive}
                />
              </div>

              {/* Zone Controls */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleZoneControl(zone.id, 'start')}
                    disabled={zone.isActive || !masterControlActive || isLoading || emergencyStop}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                  <Button
                    onClick={() => handleZoneControl(zone.id, 'stop')}
                    disabled={!zone.isActive || isLoading || emergencyStop}
                    variant="outline"
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                    size="sm"
                  >
                    <Square className="w-4 h-4 mr-1" />
                    Stop
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Last: {zone.lastIrrigated}
                </div>
                
                {zone.isActive && (
                  <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                    <div className="text-sm font-medium text-green-800">Currently Irrigating</div>
                    <div className="text-xs text-green-600">Flow: {zone.flowRate.toFixed(1)}L/min</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}