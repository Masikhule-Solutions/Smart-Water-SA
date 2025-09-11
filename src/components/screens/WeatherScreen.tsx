import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft,
  Home,
  Sun,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  BarChart3
} from 'lucide-react';
import { extendedWeatherData } from '../../constants/data';

interface WeatherScreenProps {
  formData: any;
  navigateToDashboard: () => void;
  navigateHome: () => void;
}

export default function WeatherScreen({
  formData,
  navigateToDashboard,
  navigateHome
}: WeatherScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={navigateToDashboard} className="hover:bg-blue-50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Detailed Weather Forecast
              </h1>
            </div>
          </div>
          <Button variant="outline" onClick={navigateHome} className="border-blue-300 hover:bg-blue-50">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Weather Hero */}
        <div className="relative rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Weather monitoring station"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-indigo-900/60 to-purple-900/80">
            <div className="p-8 h-full flex items-center">
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">14-Day Weather & Irrigation Forecast</h1>
                <p className="text-xl text-blue-100 mb-4">
                  Precision weather data for {formData.location}, {formData.province}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-red-300" />
                    <span>24°C Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-5 h-5 text-blue-300" />
                    <span>65% Humidity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-5 h-5 text-gray-300" />
                    <span>12 km/h SE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {extendedWeatherData.slice(0, 7).map((day, index) => (
            <Card key={index} className={`shadow-lg transition-all duration-300 hover:scale-105 ${
              day.irrigationRecommendation === 'Critical' ? 'border-red-300 bg-red-50' :
              day.irrigationRecommendation === 'High Priority' ? 'border-orange-300 bg-orange-50' :
              day.irrigationRecommendation === 'Medium Priority' ? 'border-yellow-300 bg-yellow-50' :
              day.irrigationRecommendation === 'Low Priority' ? 'border-blue-300 bg-blue-50' :
              'border-green-300 bg-green-50'
            }`}>
              <CardHeader className="pb-2">
                <div className="text-center">
                  <div className="font-bold text-lg">{day.day}</div>
                  <div className="text-sm text-gray-600">{day.date}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{day.temp}°C</div>
                  <div className="text-xs text-gray-500">{day.tempMin}° - {day.tempMax}°</div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="font-medium">{day.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rain:</span>
                    <span className="font-medium text-blue-600">{day.precipitation}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wind:</span>
                    <span className="font-medium">{day.windSpeed}km/h {day.windDirection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">UV Index:</span>
                    <span className="font-medium text-orange-600">{day.uvIndex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Soil Temp:</span>
                    <span className="font-medium">{day.soilTemp}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ET Rate:</span>
                    <span className="font-medium">{day.evapotranspiration}mm</span>
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <Badge className={`w-full justify-center text-xs ${
                    day.irrigationRecommendation === 'Critical' ? 'bg-red-500' :
                    day.irrigationRecommendation === 'High Priority' ? 'bg-orange-500' :
                    day.irrigationRecommendation === 'Medium Priority' ? 'bg-yellow-500' :
                    day.irrigationRecommendation === 'Low Priority' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}>
                    {day.irrigationRecommendation}
                  </Badge>
                  
                  {day.irrigationRecommendation !== 'Not Needed' && (
                    <div className="mt-2 text-xs text-center">
                      <div className="text-gray-600 mb-1">Best Times:</div>
                      <div className="font-medium text-green-700">
                        {day.optimalTimes.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Extended 14-Day Overview */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <BarChart3 className="w-6 h-6 mr-3" />
              14-Day Weather Trends & Irrigation Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="temperature" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="temperature">Temperature</TabsTrigger>
                <TabsTrigger value="precipitation">Rainfall</TabsTrigger>
                <TabsTrigger value="irrigation">Irrigation Needs</TabsTrigger>
                <TabsTrigger value="details">Detailed Data</TabsTrigger>
              </TabsList>
              
              <TabsContent value="temperature" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={extendedWeatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="tempMax" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
                      <Area type="monotone" dataKey="tempMin" stackId="2" stroke="#3B82F6" fill="#DBEAFE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="precipitation" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={extendedWeatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="precipitation" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="irrigation" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={extendedWeatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="evapotranspiration" stroke="#F59E0B" strokeWidth={3} />
                      <Line type="monotone" dataKey="soilTemp" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Temp Range</th>
                        <th className="text-left p-2">Rain</th>
                        <th className="text-left p-2">Humidity</th>
                        <th className="text-left p-2">Wind</th>
                        <th className="text-left p-2">Irrigation</th>
                        <th className="text-left p-2">Best Times</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extendedWeatherData.map((day, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{day.day} {day.date}</td>
                          <td className="p-2">{day.tempMin}° - {day.tempMax}°</td>
                          <td className="p-2 text-blue-600">{day.precipitation}mm</td>
                          <td className="p-2">{day.humidity}%</td>
                          <td className="p-2">{day.windSpeed}km/h {day.windDirection}</td>
                          <td className="p-2">
                            <Badge variant={day.irrigationRecommendation === 'Critical' ? 'destructive' : 'secondary'}>
                              {day.irrigationRecommendation}
                            </Badge>
                          </td>
                          <td className="p-2 text-green-700 font-medium">
                            {day.irrigationRecommendation !== 'Not Needed' ? day.optimalTimes.join(', ') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}