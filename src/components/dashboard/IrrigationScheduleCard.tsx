import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Droplets, Download, Calendar, Clock } from 'lucide-react';
import { detailedSchedule, southAfricanLocations } from '../../constants/data';

interface IrrigationScheduleCardProps {
  formData: any;
  downloadSchedule: () => void;
}

export default function IrrigationScheduleCard({ formData, downloadSchedule }: IrrigationScheduleCardProps) {
  return (
    <Card className="shadow-lg border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" />
            Smart Irrigation Schedule
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadSchedule}
            className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Download Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Advanced drip irrigation system"
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/80 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold">Next Irrigation: Tomorrow 6:00 AM</h3>
              <p className="text-green-200">Duration: 45 minutes • Volume: 1,250L • Cost: R31.25</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-sm font-bold text-green-600">5</div>
            <div className="text-xs text-green-800">Scheduled</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-sm font-bold text-blue-600">1,250L</div>
            <div className="text-xs text-blue-800">Tomorrow</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <div className="text-sm font-bold text-orange-600">R31.25</div>
            <div className="text-xs text-orange-800">Cost</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="text-sm font-bold text-purple-600">68%</div>
            <div className="text-xs text-purple-800">Soil</div>
          </div>
        </div>
        
        <div className="space-y-3">
          {detailedSchedule.slice(0, 5).map((item, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
              item.priority === 'Critical' ? 'bg-red-50 border-red-200' :
              item.priority === 'High' ? 'bg-orange-50 border-orange-200' :
              item.priority === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === 'irrigation' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex items-center space-x-2">
                  {item.type === 'irrigation' ? (
                    <Droplets className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {item.date} at {item.time}:00 - {item.zone}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.type === 'irrigation' ? 
                      `${item.duration}min • ${item.volume}L • Soil: ${item.soilMoisture}%` :
                      `${item.reason} • ${item.duration}min check`
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`${
                  item.priority === 'Critical' ? 'bg-red-500' :
                  item.priority === 'High' ? 'bg-orange-500' :
                  item.priority === 'Medium' ? 'bg-yellow-500' :
                  'bg-blue-500'
                } text-white`}>
                  {item.priority}
                </Badge>
                {item.type === 'irrigation' && (
                  <div className="text-sm text-green-700 font-medium mt-1">
                    R{(item.volume * parseFloat(southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost || '0.025')).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">This Week Summary</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-800">12 irrigations • 8,750L • R218.75</div>
              <div className="text-xs text-gray-600">Average: 45min sessions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}