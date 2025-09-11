import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft,
  Home,
  Settings,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Droplets,
  Calendar as CalendarIcon
} from 'lucide-react';
import { southAfricanLocations } from '../../constants/data';

interface SettingsScreenProps {
  formData: any;
  isLoading: boolean;
  navigateToDashboard: () => void;
  navigateHome: () => void;
  navigateToForm: () => void;
  navigateToCalendar: () => void;
  handleResetSettings: () => void;
  handleSaveSettings: () => void;
}

export default function SettingsScreen({
  formData,
  isLoading,
  navigateToDashboard,
  navigateHome,
  navigateToForm,
  navigateToCalendar,
  handleResetSettings,
  handleSaveSettings
}: SettingsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={navigateToDashboard} className="hover:bg-blue-50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Farm Settings
              </h1>
            </div>
          </div>
          <Button variant="outline" onClick={navigateHome} className="border-orange-300 hover:bg-orange-50">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Settings Hero */}
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Farm settings and configuration"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Farm Configuration Center</h1>
              <p className="text-lg text-blue-100">Manage your smart irrigation system settings</p>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <Settings className="w-6 h-6 mr-3" />
              System Configuration & Water Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Current Settings Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2" />
                    Farm Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Farmer:</span>
                      <span className="font-medium">{formData.farmerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Farm:</span>
                      <span className="font-medium">{formData.farmName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{formData.location}, {formData.province}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{formData.fieldSize} hectares</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <Droplets className="w-5 h-5 mr-2" />
                    Irrigation Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Crop Type:</span>
                      <span className="font-medium">{formData.cropType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth Stage:</span>
                      <span className="font-medium">{formData.growthStage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil Type:</span>
                      <span className="font-medium">{formData.soilType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">System:</span>
                      <span className="font-medium">{formData.irrigationSystem}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Water Risk Assessment */}
            <Card className={`border-2 ${
              southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' 
                ? 'border-red-300 bg-red-50' 
                : southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'Medium Risk'
                ? 'border-yellow-300 bg-yellow-50'
                : 'border-green-300 bg-green-50'
            }`}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Regional Water Risk Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' 
                        ? 'text-red-600' 
                        : southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'Medium Risk'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}>
                      {southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus}
                    </div>
                    <div className="text-sm text-gray-600">Water Status</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      R{southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost}/L
                    </div>
                    <div className="text-sm text-gray-600">Water Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">32%</div>
                    <div className="text-sm text-gray-600">Potential Savings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-emerald-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  System Status & Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Weather API Connected</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Irrigation System Active</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Smart Scheduling Enabled</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Water Conservation Mode</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Cost Tracking Active</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Alerts Configured</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleResetSettings}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-2" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <Settings className="w-5 h-5 mr-2" />
                    Reset to Defaults
                  </>
                )}
              </Button>

              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>

            {/* Additional Settings Links */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={navigateToForm}
                  className="justify-start border-green-300 hover:bg-green-50"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Update Farm Details
                </Button>
                <Button
                  variant="outline"
                  onClick={navigateToCalendar}
                  className="justify-start border-blue-300 hover:bg-blue-50"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}