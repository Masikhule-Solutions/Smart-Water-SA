import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft,
  Home,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Droplets,
  Thermometer,
  Wind,
  Gauge,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Smartphone,
  MessageSquare,
  Settings
} from 'lucide-react';
import { iotSensorData } from '../../constants/data';

interface IoTScreenProps {
  formData: any;
  navigateToDashboard: () => void;
  navigateHome: () => void;
}

// Mock real-time sensor data
const generateSensorReading = (baseValue: number, variation: number = 5) => {
  return Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variation));
};

export default function IoTScreen({
  formData,
  navigateToDashboard,
  navigateHome
}: IoTScreenProps) {
  const [sensorReadings, setSensorReadings] = useState(iotSensorData);
  const [realTimeData, setRealTimeData] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update sensor readings
      setSensorReadings(prev => prev.map(sensor => ({
        ...sensor,
        currentValue: generateSensorReading(sensor.currentValue, 3),
        lastUpdate: Math.random() > 0.7 ? `${Math.floor(Math.random() * 5) + 1} minutes ago` : sensor.lastUpdate,
        batteryLevel: Math.max(0, sensor.batteryLevel - (Math.random() * 0.1))
      })));

      // Add new real-time data point
      setRealTimeData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          soilMoisture: generateSensorReading(68, 5),
          temperature: generateSensorReading(24, 3),
          humidity: generateSensorReading(65, 8)
        };
        return [...prev.slice(-20), newPoint]; // Keep last 20 points
      });

      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'Soil Moisture': return Droplets;
      case 'Temperature': return Thermometer;
      case 'Wind Speed': return Wind;
      default: return Gauge;
    }
  };

  const getSensorStatus = (sensor: any) => {
    if (sensor.batteryLevel < 20) return { status: 'Low Battery', color: 'red', icon: BatteryLow };
    if (sensor.lastUpdate.includes('minute')) return { status: 'Warning', color: 'yellow', icon: AlertTriangle };
    return { status: 'Active', color: 'green', icon: CheckCircle };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Navigation Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-green-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={navigateToDashboard} className="hover:bg-green-50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {isConnected ? <Wifi className="w-8 h-8 text-green-600" /> : <WifiOff className="w-8 h-8 text-red-600" />}
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
                    IoT Sensor Network
                  </h1>
                  <p className="text-sm text-gray-600">Last update: {lastUpdate.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsConnected(!isConnected)} className="border-green-300 hover:bg-green-50">
              <RefreshCw className="w-4 h-4 mr-2" />
              {isConnected ? 'Connected' : 'Reconnect'}
            </Button>
            <Button variant="outline" onClick={navigateHome} className="border-blue-300 hover:bg-blue-50">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* IoT Hero */}
        <div className="relative rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="IoT sensors in agricultural field"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-blue-900/60 to-indigo-900/80">
            <div className="p-8 h-full flex items-center">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">Smart Farm IoT Network</h1>
                <p className="text-xl text-green-100 mb-4">
                  Real-time monitoring for {formData.farmName} • {sensorReadings.length} sensors active
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-5 h-5 text-green-300" />
                    <span>Network Status: {isConnected ? 'Connected' : 'Offline'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-blue-300" />
                    <span>{sensorReadings.filter(s => s.status === 'Active').length} Active Sensors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status Alert */}
        {!isConnected && (
          <Alert className="bg-red-50 border-red-300 shadow-lg">
            <WifiOff className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Connection Lost:</strong> Unable to connect to IoT sensor network. 
              Some sensors may be offline. Check your internet connection and sensor power status.
            </AlertDescription>
          </Alert>
        )}

        {/* Real-time Sensor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sensorReadings.map((sensor, index) => {
            const Icon = getSensorIcon(sensor.type);
            const status = getSensorStatus(sensor);
            const StatusIcon = status.icon;
            
            return (
              <Card key={sensor.sensorId} className={`shadow-lg transition-all duration-300 hover:scale-105 ${
                status.color === 'red' ? 'border-red-300 bg-red-50' :
                status.color === 'yellow' ? 'border-yellow-300 bg-yellow-50' :
                'border-green-300 bg-green-50'
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-6 h-6 ${
                        status.color === 'red' ? 'text-red-600' :
                        status.color === 'yellow' ? 'text-yellow-600' :
                        'text-green-600'
                      }`} />
                      <div>
                        <h3 className="font-bold text-sm">{sensor.sensorId}</h3>
                        <p className="text-xs text-gray-600">{sensor.location}</p>
                      </div>
                    </div>
                    <StatusIcon className={`w-4 h-4 ${
                      status.color === 'red' ? 'text-red-600' :
                      status.color === 'yellow' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      status.color === 'red' ? 'text-red-600' :
                      status.color === 'yellow' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {sensor.currentValue}
                      {sensor.type === 'Soil Moisture' ? '%' : 
                       sensor.type === 'Temperature' ? '°C' : 
                       sensor.type === 'Wind Speed' ? 'km/h' : ''}
                    </div>
                    <div className="text-xs text-gray-500">{sensor.type}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Battery:</span>
                      <span className={sensor.batteryLevel < 20 ? 'text-red-600' : 'text-green-600'}>
                        {Math.round(sensor.batteryLevel)}%
                      </span>
                    </div>
                    <Progress 
                      value={sensor.batteryLevel} 
                      className={`h-1 ${sensor.batteryLevel < 20 ? 'bg-red-100' : 'bg-green-100'}`}
                    />
                    
                    <div className="flex justify-between text-xs">
                      <span>Status:</span>
                      <Badge className={`text-xs ${
                        status.color === 'red' ? 'bg-red-500' :
                        status.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}>
                        {status.status}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-center">
                      Last: {sensor.lastUpdate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Real-time Data Visualization */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <Gauge className="w-6 h-6 mr-3" />
              Real-time Sensor Data Stream
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="soilMoisture" stackId="1" stroke="#10B981" fill="#D1FAE5" name="Soil Moisture %" />
                  <Area type="monotone" dataKey="temperature" stackId="2" stroke="#F59E0B" fill="#FEF3C7" name="Temperature °C" />
                  <Area type="monotone" dataKey="humidity" stackId="3" stroke="#3B82F6" fill="#DBEAFE" name="Humidity %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {realTimeData.length > 0 ? Math.round(realTimeData[realTimeData.length - 1]?.soilMoisture || 0) : 68}%
                </div>
                <div className="text-sm text-green-800">Current Soil Moisture</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {realTimeData.length > 0 ? Math.round(realTimeData[realTimeData.length - 1]?.temperature || 0) : 24}°C
                </div>
                <div className="text-sm text-orange-800">Current Temperature</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {realTimeData.length > 0 ? Math.round(realTimeData[realTimeData.length - 1]?.humidity || 0) : 65}%
                </div>
                <div className="text-sm text-blue-800">Current Humidity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS/WhatsApp Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                SMS/WhatsApp Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Irrigation Reminders</p>
                      <p className="text-sm text-green-600">Next: Tomorrow 6:00 AM</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-800">Weather Alerts</p>
                      <p className="text-sm text-orange-600">Storm warnings enabled</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Gauge className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Sensor Alerts</p>
                      <p className="text-sm text-blue-600">Low battery & offline warnings</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">Active</Badge>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Alert Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Alert className="border-yellow-300 bg-yellow-50">
                  <BatteryLow className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Low Battery:</strong> Sensor SMS002 battery at 15%. Replace within 48 hours.
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-green-300 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>System Healthy:</strong> All sensors responding normally. Network connectivity excellent.
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-300 bg-blue-50">
                  <Droplets className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Soil Moisture Alert:</strong> Section A moisture dropping to 65%. Irrigation recommended.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}