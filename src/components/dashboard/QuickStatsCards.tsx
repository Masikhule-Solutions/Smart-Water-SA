import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Clock, Target, DollarSign, Leaf, Wifi, Bug } from 'lucide-react';

interface QuickStatsCardsProps {
  formData: any;
}

export default function QuickStatsCards({ formData }: QuickStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:scale-105 transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Next Irrigation</p>
              <p className="text-2xl font-bold">Tomorrow 6:00 AM</p>
              <p className="text-xs text-orange-200">Duration: 45 minutes</p>
            </div>
            <Clock className="w-8 h-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:scale-105 transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Water Savings</p>
              <p className="text-2xl font-bold">22%</p>
              <p className="text-xs text-blue-200">Target: 30% this season</p>
            </div>
            <Target className="w-8 h-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-lg hover:scale-105 transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Cost Savings</p>
              <p className="text-2xl font-bold">R3,450</p>
              <p className="text-xs text-yellow-200">This month</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:scale-105 transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Conservation Score</p>
              <p className="text-2xl font-bold">87/100</p>
              <p className="text-xs text-green-200">Excellent performance</p>
            </div>
            <Leaf className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-0 shadow-lg hover:scale-105 transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">IoT Sensors</p>
              <p className="text-2xl font-bold">4 Active</p>
              <p className="text-xs text-indigo-200">All systems online</p>
            </div>
            <Wifi className="w-8 h-8 text-indigo-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-lg hover:scale-105 transition-transform">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Disease Risk</p>
              <p className="text-2xl font-bold">Medium</p>
              <p className="text-xs text-red-200">Monitor daily</p>
            </div>
            <Bug className="w-8 h-8 text-red-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}