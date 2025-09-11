import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft,
  Home,
  AlertTriangle,
  TrendingUp,
  Eye,
  Thermometer,
  Droplets,
  Wind,
  Bug,
  Shield,
  Activity,
  Calendar,
  MapPin
} from 'lucide-react';
import { crops, extendedWeatherData, diseaseRiskFactors } from '../../constants/data';

interface DiseaseMonitoringScreenProps {
  formData: any;
  navigateToDashboard: () => void;
  navigateHome: () => void;
}

export default function DiseaseMonitoringScreen({
  formData,
  navigateToDashboard,
  navigateHome
}: DiseaseMonitoringScreenProps) {
  const [selectedCrop, setSelectedCrop] = useState(formData.cropType);
  const [riskLevel, setRiskLevel] = useState('Medium');
  const [monitoringData, setMonitoringData] = useState([]);

  // Get current crop information
  const currentCrop = crops.find(crop => crop.name === selectedCrop) || crops[0];
  
  // Calculate disease risk based on weather
  const calculateDiseaseRisk = () => {
    const today = extendedWeatherData[0];
    if (today.humidity > 75 && today.temp >= 18 && today.temp <= 25 && today.windSpeed < 10) {
      return 'High';
    } else if (today.humidity > 60 && today.humidity <= 75) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  useEffect(() => {
    setRiskLevel(calculateDiseaseRisk());
    
    // Generate monitoring data
    const data = extendedWeatherData.slice(0, 7).map(day => ({
      date: day.date,
      riskScore: day.diseaseRisk === 'High' ? 85 : day.diseaseRisk === 'Medium' ? 55 : 25,
      humidity: day.humidity,
      temperature: day.temp,
      leafWetness: day.humidity > 80 ? 90 : day.humidity > 60 ? 60 : 30
    }));
    setMonitoringData(data);
  }, [selectedCrop]);

  const riskData = [
    { name: 'Low Risk', value: 40, color: '#10B981' },
    { name: 'Medium Risk', value: 35, color: '#F59E0B' },
    { name: 'High Risk', value: 25, color: '#EF4444' }
  ];

  const currentRiskInfo = diseaseRiskFactors[riskLevel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Navigation Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-red-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={navigateToDashboard} className="hover:bg-red-50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <Bug className="w-8 h-8 text-red-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-700 to-orange-700 bg-clip-text text-transparent">
                Disease Monitoring System
              </h1>
            </div>
          </div>
          <Button variant="outline" onClick={navigateHome} className="border-red-300 hover:bg-red-50">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Disease Monitoring Hero */}
        <div className="relative rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Crop disease monitoring and plant health assessment"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-orange-900/60 to-yellow-900/80">
            <div className="p-8 h-full flex items-center">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">Smart Disease Monitoring</h1>
                <p className="text-xl text-red-100 mb-4">
                  Weather-based disease prediction for {selectedCrop} • {formData.location}, {formData.province}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-300" />
                    <span>Risk Level: {riskLevel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-300" />
                    <span>Active Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-yellow-300" />
                    <span>{formData.fieldSize} hectares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Risk Assessment */}
        <Card className={`shadow-xl border-2 ${
          riskLevel === 'High' ? 'border-red-300 bg-red-50' :
          riskLevel === 'Medium' ? 'border-yellow-300 bg-yellow-50' :
          'border-green-300 bg-green-50'
        }`}>
          <CardHeader className={`rounded-t-lg text-white ${
            riskLevel === 'High' ? 'bg-gradient-to-r from-red-500 to-red-600' :
            riskLevel === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
            'bg-gradient-to-r from-green-500 to-emerald-500'
          }`}>
            <CardTitle className="text-2xl flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Current Disease Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  riskLevel === 'High' ? 'text-red-600' :
                  riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {riskLevel}
                </div>
                <div className="text-lg font-medium text-gray-800">Risk Level</div>
                <div className="text-sm text-gray-600 mt-2">{currentRiskInfo.conditions}</div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">At-Risk Diseases for {selectedCrop}:</h3>
                <div className="space-y-2">
                  {currentCrop.diseaseRisk?.map((disease, index) => (
                    <Badge key={index} className={`mr-2 ${
                      riskLevel === 'High' ? 'bg-red-500' :
                      riskLevel === 'Medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {disease}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Recommended Actions:</h3>
                <ul className="text-sm space-y-1">
                  {currentRiskInfo.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 mt-0.5 text-blue-600" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disease Monitoring Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Conditions Impact */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  7-Day Disease Risk Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="risk" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="risk">Risk Score</TabsTrigger>
                    <TabsTrigger value="conditions">Weather Conditions</TabsTrigger>
                    <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="risk" className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monitoringData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Area type="monotone" dataKey="riskScore" stroke="#EF4444" fill="#FEE2E2" name="Disease Risk Score" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="conditions" className="space-y-4">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monitoringData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="humidity" stackId="1" stroke="#3B82F6" fill="#DBEAFE" name="Humidity %" />
                          <Area type="monotone" dataKey="temperature" stackId="2" stroke="#F59E0B" fill="#FEF3C7" name="Temperature °C" />
                          <Area type="monotone" dataKey="leafWetness" stackId="3" stroke="#10B981" fill="#D1FAE5" name="Leaf Wetness %" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analysis" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={riskData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {riskData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold">Risk Distribution:</h3>
                        {riskData.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <span className="font-medium">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Disease Alerts & Actions */}
          <div className="space-y-6">
            <Card className="shadow-lg border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Bug className="w-5 h-5 mr-2" />
                  Disease Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {riskLevel === 'High' && (
                    <Alert className="border-red-300 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>High Risk:</strong> Conditions favor {currentCrop.diseaseRisk?.[0]}. 
                        Apply preventive treatments immediately.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Alert className="border-blue-300 bg-blue-50">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Monitoring:</strong> Daily field inspections recommended. 
                      Check for early disease symptoms.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-300 bg-green-50">
                    <Shield className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Prevention:</strong> Maintain good air circulation. 
                      Optimize irrigation timing to reduce leaf wetness.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Treatment Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="font-medium text-orange-800">Today</div>
                    <div className="text-sm text-orange-600">Apply copper-based fungicide</div>
                    <div className="text-xs text-orange-500">Early morning application recommended</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-800">Day 3</div>
                    <div className="text-sm text-blue-600">Field inspection for disease symptoms</div>
                    <div className="text-xs text-blue-500">Focus on lower leaves and high humidity areas</div>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800">Day 7</div>
                    <div className="text-sm text-green-600">Follow-up treatment if needed</div>
                    <div className="text-xs text-green-500">Based on weather conditions and symptoms</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-yellow-200">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Current Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <span className="font-medium">{extendedWeatherData[0].temp}°C</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <span className="font-medium">{extendedWeatherData[0].humidity}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Wind className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Wind Speed</span>
                    </div>
                    <span className="font-medium">{extendedWeatherData[0].windSpeed} km/h</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-sm text-gray-600 mb-2">Leaf Wetness Duration</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${Math.min(100, extendedWeatherData[0].humidity)}%`}}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {extendedWeatherData[0].humidity > 80 ? 'High' : extendedWeatherData[0].humidity > 60 ? 'Moderate' : 'Low'} wetness risk
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}