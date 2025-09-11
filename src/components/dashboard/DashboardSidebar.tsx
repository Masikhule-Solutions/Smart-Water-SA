import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Target, DollarSign, AlertTriangle, CheckCircle, Droplets, Settings, MessageSquare, Smartphone } from 'lucide-react';
import { impactData, southAfricanLocations } from '../../constants/data';

interface DashboardSidebarProps {
  formData: any;
  navigateToNotifications?: () => void;
}

export default function DashboardSidebar({ formData, navigateToNotifications }: DashboardSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Impact Metrics */}
      <Card className="shadow-lg border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Water Conservation Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Farm analytics and conservation metrics"
            className="w-full h-24 object-cover rounded-lg mb-4"
          />
          
          <div className="space-y-4">
            {impactData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                  <span className="text-sm font-bold" style={{color: item.color}}>{item.current}{item.unit}</span>
                </div>
                <Progress 
                  value={(item.current / item.target) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Target: {item.target}{item.unit}</span>
                  <span>{Math.round((item.current / item.target) * 100)}% achieved</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SMS/WhatsApp Alerts */}
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              SMS & WhatsApp Alerts
            </CardTitle>
            {navigateToNotifications && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={navigateToNotifications}
                className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
              >
                <Settings className="w-3 h-3 mr-1" />
                Configure
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              alt="Mobile phone with farming notifications"
              className="w-full h-20 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <p className="text-sm font-bold">Rural Communication Active</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Irrigation Reminders</p>
                  <p className="text-xs text-green-600">Next: Tomorrow 6:00 AM</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Weather Alerts</p>
                  <p className="text-xs text-orange-600">Storm warnings enabled</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">WhatsApp Reports</p>
                  <p className="text-xs text-blue-600">Weekly summaries active</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>

            {/* Always visible configure button */}
            {navigateToNotifications && (
              <Button 
                onClick={navigateToNotifications}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 mt-3"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure Alert Settings
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card className="shadow-lg border-yellow-200">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Water Cost Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Financial savings from smart irrigation"
            className="w-full h-24 object-cover rounded-lg mb-4"
          />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-700">Monthly Savings</span>
              <span className="text-lg font-bold text-green-600">R3,450</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-700">Water Cost per L</span>
              <span className="text-lg font-bold text-blue-600">
                R{southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost || '0.025'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-yellow-700">ROI This Season</span>
              <span className="text-lg font-bold text-yellow-600">285%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-700">Water Saved (L)</span>
              <span className="text-lg font-bold text-purple-600">128,000L</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Conservation Alerts */}
      <Card className="shadow-lg border-red-200">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Water Conservation Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Water conservation and drought awareness"
            className="w-full h-20 object-cover rounded-lg mb-4"
          />

          <div className="space-y-3">
            <Alert className="border-yellow-300 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Dry Period Ahead:</strong> No rainfall expected for 5 days. Increase irrigation frequency.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-blue-300 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Excellent Progress:</strong> 22% water savings achieved this month. Keep up the great work!
              </AlertDescription>
            </Alert>

            {southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' && (
              <Alert className="border-red-300 bg-red-50">
                <Droplets className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Regional Water Restriction:</strong> Level 3 restrictions in effect. 
                  Consider rainwater harvesting systems.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}