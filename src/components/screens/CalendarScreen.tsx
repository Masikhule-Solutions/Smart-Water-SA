import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft,
  Home,
  Calendar as CalendarIcon,
  Download,
  Clock,
  Droplets,
  Leaf,
  Sun
} from 'lucide-react';
import { detailedSchedule, crops, southAfricanLocations } from '../../constants/data';

interface CalendarScreenProps {
  formData: any;
  navigateToDashboard: () => void;
  navigateHome: () => void;
  downloadSchedule: () => void;
}

export default function CalendarScreen({
  formData,
  navigateToDashboard,
  navigateHome,
  downloadSchedule
}: CalendarScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-green-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={navigateToDashboard} className="hover:bg-green-50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-8 h-8 text-green-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                Irrigation Calendar
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={downloadSchedule} className="border-green-300 hover:bg-green-50">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={navigateHome} className="border-orange-300 hover:bg-orange-50">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Calendar Hero */}
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Irrigation calendar scheduling system"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/80 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Smart Irrigation Calendar</h1>
              <p className="text-lg text-green-100">Optimized scheduling for {formData.farmName} • Water-Smart Technology</p>
            </div>
          </div>
        </div>

        {/* Enhanced Schedule View */}
        <Card className="shadow-2xl border-green-200 mb-6">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl flex items-center">
                <CalendarIcon className="w-6 h-6 mr-3" />
                Detailed Irrigation Schedule - August 2025
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className="bg-white/20 text-white">
                  Next: Tomorrow 6:00 AM
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Schedule Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-green-200">
                    <th className="text-left p-3 font-semibold text-green-800">Date & Time</th>
                    <th className="text-left p-3 font-semibold text-green-800">Zone</th>
                    <th className="text-left p-3 font-semibold text-green-800">Duration</th>
                    <th className="text-left p-3 font-semibold text-green-800">Volume</th>
                    <th className="text-left p-3 font-semibold text-green-800">Priority</th>
                    <th className="text-left p-3 font-semibold text-green-800">Weather</th>
                    <th className="text-left p-3 font-semibold text-green-800">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedSchedule.map((item, index) => (
                    <tr key={index} className={`border-b hover:bg-gray-50 ${
                      item.priority === 'Critical' ? 'bg-red-50' :
                      item.priority === 'High' ? 'bg-orange-50' :
                      item.priority === 'Medium' ? 'bg-yellow-50' :
                      'bg-blue-50'
                    }`}>
                      <td className="p-3">
                        <div className="font-medium text-gray-800">{item.date}</div>
                        <div className="text-sm text-gray-600">{item.time}:00</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{item.zone}</div>
                        <div className="text-xs text-gray-500">Soil: {item.soilMoisture}%</div>
                      </td>
                      <td className="p-3">
                        <span className="font-medium">{item.duration} min</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-blue-600">{item.volume.toLocaleString()} L</span>
                      </td>
                      <td className="p-3">
                        <Badge className={`${
                          item.priority === 'Critical' ? 'bg-red-500' :
                          item.priority === 'High' ? 'bg-orange-500' :
                          item.priority === 'Medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        } text-white`}>
                          {item.priority}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="text-xs text-gray-600 max-w-32">
                          {item.weather}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-green-600">
                          R{(item.volume * parseFloat(southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost || '0.025')).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calendar Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <div className="text-sm text-green-800">Irrigation Sessions</div>
                  <div className="text-xs text-green-600">This Month</div>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">24,500L</div>
                  <div className="text-sm text-blue-800">Total Water</div>
                  <div className="text-xs text-blue-600">Scheduled</div>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">R612</div>
                  <div className="text-sm text-yellow-800">Estimated Cost</div>
                  <div className="text-xs text-yellow-600">This Month</div>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">32%</div>
                  <div className="text-sm text-purple-800">Water Savings</div>
                  <div className="text-xs text-purple-600">vs Traditional</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Irrigation Session</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Maintenance Check</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">Critical Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">High Priority</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Irrigation Recommendations */}
        <Card className="shadow-lg border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Optimal Irrigation Times & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Best Irrigation Times for {formData.cropType}</h3>
                <div className="space-y-3">
                  {crops.find(crop => crop.name === formData.cropType)?.optimalIrrigationTimes.map((time, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">{time}</span>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        {index === 0 ? 'Morning' : 'Evening'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Water Conservation Tips</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Early morning irrigation reduces evaporation by 30%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Avoid midday watering during hot weather</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Monitor soil moisture before each session</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}