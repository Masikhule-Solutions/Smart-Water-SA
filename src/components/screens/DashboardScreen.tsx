import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Droplets, 
  Home,
  LogOut,
  Sun,
  Wind,
  Download,
  Calendar as CalendarIcon,
  Settings,
  Wifi,
  Bug,
  AlertTriangle,
  Activity,
  Calculator,
  Zap,
  Star,
  Target,
  TrendingUp,
  BarChart3,
  Brain,
  Shield
} from 'lucide-react';
import { southAfricanLocations } from '../../constants/data';
import QuickStatsCards from '../dashboard/QuickStatsCards';
import WeatherForecastCard from '../dashboard/WeatherForecastCard';
import IrrigationScheduleCard from '../dashboard/IrrigationScheduleCard';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import IrrigationControlPanel from '../interactive/IrrigationControlPanel';
import WaterConservationCalculator from '../interactive/WaterConservationCalculator';

interface DashboardScreenProps {
  formData: any;
  currentUser: any;
  isLoggedIn: boolean;
  handleLogout: () => void;
  navigateHome: () => void;
  navigateToCalendar: () => void;
  navigateToSettings: () => void;
  navigateToWeather: () => void;
  navigateToIoT?: () => void;
  navigateToDiseaseMonitoring?: () => void;
  navigateToNotifications?: () => void;
  downloadSchedule: () => void;
}

export default function DashboardScreen({
  formData,
  currentUser,
  isLoggedIn,
  handleLogout,
  navigateHome,
  navigateToCalendar,
  navigateToSettings,
  navigateToWeather,
  navigateToIoT,
  navigateToDiseaseMonitoring,
  navigateToNotifications,
  downloadSchedule
}: DashboardScreenProps) {
  // Default to 'overview' to show main dashboard first
  const [activeTab, setActiveTab] = useState('overview');
  const [irrigationStatus, setIrrigationStatus] = useState(null);
  const [savedScenarios, setSavedScenarios] = useState([]);

  const handleIrrigationStatusChange = (status) => {
    setIrrigationStatus(status);
    console.log('Irrigation status changed:', status);
  };

  const handleSaveScenario = (scenario) => {
    setSavedScenarios(prev => [scenario, ...prev.slice(0, 4)]);
    console.log('Scenario saved:', scenario);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50 texture-soil">
      {/* Navigation Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-green-300 p-4 sticky top-0 z-10 shadow-farm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={navigateHome} className="hover:bg-green-50">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-farm-gradient rounded-full flex items-center justify-center shadow-farm">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-farm-green">
                  {formData.farmName || 'SmartWater SA'}
                </h1>
                <p className="text-sm text-field-sage">{formData.location}, {formData.province}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={navigateToWeather} className="border-blue-300 hover:bg-blue-50">
              <Sun className="w-4 h-4 mr-2" />
              Weather
            </Button>
            <Button variant="outline" onClick={navigateToCalendar} className="border-green-300 hover:bg-green-50">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            {navigateToIoT && (
              <Button variant="outline" onClick={navigateToIoT} className="border-indigo-300 hover:bg-indigo-50">
                <Wifi className="w-4 h-4 mr-2" />
                IoT Sensors
              </Button>
            )}
            {navigateToDiseaseMonitoring && (
              <Button variant="outline" onClick={navigateToDiseaseMonitoring} className="border-red-300 hover:bg-red-50">
                <Bug className="w-4 h-4 mr-2" />
                Disease Monitor
              </Button>
            )}
            <Button variant="outline" onClick={navigateToSettings} className="border-purple-300 hover:bg-purple-50">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={isLoggedIn ? handleLogout : navigateHome} 
              className="border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoggedIn ? 'Logout' : 'Exit'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Enhanced Farm Overview Hero with Strong Agricultural Imagery */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Vibrant South African farm landscape with modern irrigation systems combating water scarcity"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-green-800/75 to-amber-900/85">
            <div className="p-8 h-full flex items-center justify-between">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">Welcome back, {formData.farmerName}</h1>
                <p className="text-xl text-green-100 mb-4">
                  {formData.fieldSize} hectares of {formData.cropType} • {formData.growthStage} stage
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-300" />
                    <span>26°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-300" />
                    <span>{formData.soilMoisture}% moisture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-5 h-5 text-gray-300" />
                    <span>12 km/h SE</span>
                  </div>
                  {irrigationStatus && (
                    <div className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-green-300 animate-pulse" />
                      <span>Last action: {irrigationStatus.action}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <Button
                  onClick={downloadSchedule}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 mb-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Schedule
                </Button>
                <div className="text-green-100 text-sm">
                  Water Status: {southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prominent Dashboard Navigation Buttons */}
        <Card className="shadow-lg border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader className="bg-farm-gradient text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <BarChart3 className="w-6 h-6 mr-3" />
              Smart Farm Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                onClick={() => setActiveTab('overview')}
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                className={`h-24 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-farm-green text-white shadow-farm scale-105' 
                    : 'border-green-300 hover:bg-green-50 hover:scale-105'
                }`}
              >
                <Droplets className="w-8 h-8" />
                <span className="font-medium">Overview</span>
                <span className="text-xs opacity-75">Farm Dashboard</span>
              </Button>

              <Button
                onClick={() => setActiveTab('control')}
                variant={activeTab === 'control' ? 'default' : 'outline'}
                className={`h-24 flex flex-col items-center justify-center space-y-2 transition-all duration-200 relative ${
                  activeTab === 'control' 
                    ? 'bg-crop-green text-white shadow-farm scale-105' 
                    : 'border-green-300 hover:bg-green-50 hover:scale-105'
                }`}
              >
                <Activity className="w-8 h-8" />
                <span className="font-medium">Live Control</span>
                <span className="text-xs opacity-75">Real-time Control</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-barn-red rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
              </Button>

              <Button
                onClick={() => setActiveTab('calculator')}
                variant={activeTab === 'calculator' ? 'default' : 'outline'}
                className={`h-24 flex flex-col items-center justify-center space-y-2 transition-all duration-200 relative ${
                  activeTab === 'calculator' 
                    ? 'bg-harvest-gold text-white shadow-harvest scale-105' 
                    : 'border-amber-300 hover:bg-amber-50 hover:scale-105'
                }`}
              >
                <Calculator className="w-8 h-8" />
                <span className="font-medium">Calculator</span>
                <span className="text-xs opacity-75">Water Savings</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-crop-green rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-xs text-white font-bold">+</span>
                </div>
              </Button>

              <Button
                onClick={() => setActiveTab('insights')}
                variant={activeTab === 'insights' ? 'default' : 'outline'}
                className={`h-24 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
                  activeTab === 'insights' 
                    ? 'bg-purple-600 text-white shadow-lg scale-105' 
                    : 'border-purple-300 hover:bg-purple-50 hover:scale-105'
                }`}
              >
                <Brain className="w-8 h-8" />
                <span className="font-medium">AI Insights</span>
                <span className="text-xs opacity-75">Smart Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Features Announcement */}
        <Alert className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-300 shadow-lg">
          <Star className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>🎉 Interactive Features Available!</strong> Use the "Live Control" button to control irrigation in real-time, 
            or the "Calculator" button to optimize your water savings with interactive sliders and instant feedback.
          </AlertDescription>
        </Alert>

        {/* Water Scarcity Alert */}
        {southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' && (
          <Alert className="bg-red-50 border-red-300 shadow-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>High Water Risk Area:</strong> Your region is experiencing severe water scarcity. 
              Smart irrigation could save up to 40% more water. Current water cost: R{southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost}/L
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats Cards */}
        <QuickStatsCards formData={formData} />

        {/* Interactive Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Overview Tab - Original Dashboard */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weather & Irrigation */}
              <div className="lg:col-span-2 space-y-6">
                <WeatherForecastCard formData={formData} navigateToWeather={navigateToWeather} />
                <IrrigationScheduleCard formData={formData} downloadSchedule={downloadSchedule} />
              </div>

              {/* Sidebar Content */}
              <DashboardSidebar formData={formData} navigateToNotifications={navigateToNotifications} />
            </div>
          </TabsContent>

          {/* Live Control Tab - Interactive Irrigation Control */}
          <TabsContent value="control" className="space-y-6">
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-lg">
              <Activity className="h-4 w-4 text-blue-600 animate-pulse" />
              <AlertDescription className="text-blue-800">
                <strong>🎮 Interactive Touchpoint #1:</strong> Real-time irrigation control with immediate feedback. 
                Click the buttons below to start/stop irrigation zones and watch the live status updates, flow rates, and soil moisture changes.
                <br />
                <span className="text-sm text-blue-600 mt-1 block">
                  ✨ Try: Enable Master Control → Start a zone → Watch real-time data updates every 2 seconds
                </span>
              </AlertDescription>
            </Alert>
            <IrrigationControlPanel 
              farmData={formData} 
              onStatusChange={handleIrrigationStatusChange}
            />
          </TabsContent>

          {/* Calculator Tab - Interactive Water Conservation Calculator */}
          <TabsContent value="calculator" className="space-y-6">
            <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-lg">
              <Calculator className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>🧮 Interactive Touchpoint #2:</strong> Dynamic water conservation calculator with real-time calculations. 
                Move the sliders below and toggle settings to see instant updates on water usage, costs, and potential savings.
                <br />
                <span className="text-sm text-green-600 mt-1 block">
                  ✨ Try: Adjust field size slider → Toggle conservation methods → Watch savings calculations update live
                </span>
              </AlertDescription>
            </Alert>
            <WaterConservationCalculator 
              farmData={formData} 
              currentUser={currentUser}
              onSaveScenario={handleSaveScenario}
            />
          </TabsContent>

          {/* AI Insights Tab - Enhanced Coming Soon */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="shadow-lg border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Brain className="w-6 h-6 mr-3" />
                  AI-Powered Farm Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1581092918484-8313de7ca3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      alt="AI-powered agricultural technology and smart farming systems for South African agriculture"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent rounded-lg flex items-end justify-center pb-4">
                      <h3 className="text-white text-xl font-bold">Advanced AI Analytics Coming Soon</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Badge className="bg-purple-100 text-purple-800 px-3 py-1">🤖 Predictive Analytics</Badge>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Crop yield predictions with 95% accuracy</p>
                        <p>• Weather pattern analysis for irrigation planning</p>
                        <p>• Soil health monitoring and recommendations</p>
                        <p>• Market price forecasting for harvest timing</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Badge className="bg-green-100 text-green-800 px-3 py-1">🌱 Smart Detection</Badge>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>• Early pest and disease identification</p>
                        <p>• Automated irrigation optimization</p>
                        <p>• Nutrient deficiency detection</p>
                        <p>• Growth stage monitoring via satellite</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-purple-800 font-medium">
                      🚀 Coming in Q2 2025 - Be the first to experience AI-powered farming in South Africa!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Saved Scenarios Display */}
        {savedScenarios.length > 0 && (
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-700">Recently Saved Calculator Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedScenarios.slice(0, 3).map((scenario) => (
                  <div key={scenario.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="font-medium text-gray-800">{scenario.name}</div>
                    <div className="text-sm text-gray-600">
                      Efficiency: {scenario.results.efficiency.toFixed(1)}%
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Savings: R{scenario.results.conservationSavings.toLocaleString()}/year
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(scenario.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Combat South Africa's Water Crisis Section - MOVED TO SECOND LAST */}
        <Card className="shadow-2xl border-2 border-barn-red bg-gradient-to-r from-red-50 to-orange-50">
          <CardHeader className="bg-gradient-to-r from-barn-red to-harvest-gold text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Shield className="w-6 h-6 mr-3" />
              Combat South Africa's Water Crisis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="South African farmer using advanced drought-resistant irrigation technology to combat water scarcity crisis"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Smart Technology Solutions</h3>
                  <p className="text-sm text-gray-200">Advanced irrigation systems for drought resilience</p>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-100 rounded-lg">
                    <div className="text-3xl font-bold text-barn-red">40%</div>
                    <div className="text-sm text-red-600">Water Waste Reduced</div>
                  </div>
                  <div className="text-center p-4 bg-amber-100 rounded-lg">
                    <div className="text-3xl font-bold text-harvest-gold">R3,450</div>
                    <div className="text-sm text-amber-600">Monthly Savings</div>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-3xl font-bold text-crop-green">15%</div>
                    <div className="text-sm text-green-600">Yield Increase</div>
                  </div>
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="text-3xl font-bold text-blue-700">Level 6</div>
                    <div className="text-sm text-blue-600">Water Restrictions</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-barn-red" />
                    <span className="text-sm font-medium">Precision irrigation for maximum efficiency</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-harvest-gold" />
                    <span className="text-sm font-medium">Drought-resistant farming techniques</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-crop-green" />
                    <span className="text-sm font-medium">Real-time water conservation monitoring</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">
                    🚨 Your region: <strong>{southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus}</strong>
                    <br />Water cost: R{southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost}/L
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Features Guide - MOVED TO BOTTOM */}
        <Card className="shadow-lg border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardHeader className="bg-harvest-gradient text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Target className="w-6 h-6 mr-3" />
              🎯 Interactive Features Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center text-crop-green">
                  <Activity className="w-5 h-5 mr-2" />
                  Live Control Panel
                </h4>
                <ul className="text-sm space-y-1 ml-6 text-gray-700">
                  <li>• Click the green "Live Control" button above</li>
                  <li>• Toggle Master Control switch to enable system</li>
                  <li>• Start/stop irrigation zones with zone buttons</li>
                  <li>• Watch real-time data updates every 2 seconds</li>
                  <li>• Use emergency stop for immediate shutdown</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium flex items-center text-harvest-gold">
                  <Calculator className="w-5 h-5 mr-2" />
                  Water Conservation Calculator
                </h4>
                <ul className="text-sm space-y-1 ml-6 text-gray-700">
                  <li>• Click the gold "Calculator" button above</li>
                  <li>• Adjust field size and frequency sliders</li>
                  <li>• Toggle conservation method switches</li>
                  <li>• See instant cost and savings calculations</li>
                  <li>• Save scenarios using "Save Scenario" button</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}