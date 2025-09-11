import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Alert, AlertDescription } from '../ui/alert';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft,
  Home,
  MessageSquare,
  Smartphone,
  Mail,
  Bell,
  Clock,
  Droplets,
  Sun,
  Bug,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';

interface NotificationSettingsScreenProps {
  currentUser: any;
  navigateToDashboard: () => void;
  navigateHome: () => void;
  onSaveSettings: (settings: any) => void;
}

export default function NotificationSettingsScreen({
  currentUser,
  navigateToDashboard,
  navigateHome,
  onSaveSettings
}: NotificationSettingsScreenProps) {
  const [settings, setSettings] = useState({
    // Contact Information
    phoneNumber: currentUser?.phone || '',
    whatsappNumber: currentUser?.phone || '',
    email: currentUser?.email || '',
    
    // SMS Alerts
    smsAlerts: currentUser?.preferences?.smsAlerts || true,
    smsIrrigation: true,
    smsWeather: true,
    smsEmergency: true,
    smsSystem: false,
    
    // WhatsApp Alerts
    whatsappAlerts: currentUser?.preferences?.whatsappAlerts || true,
    whatsappIrrigation: true,
    whatsappWeather: true,
    whatsappEmergency: true,
    whatsappSystem: true,
    whatsappReports: true,
    
    // Email Alerts
    emailAlerts: currentUser?.preferences?.emailAlerts || true,
    emailReports: true,
    emailAnalytics: true,
    emailMarketing: false,
    
    // Timing Preferences
    quietHoursEnabled: false,
    quietStart: '22:00',
    quietEnd: '06:00',
    timezone: 'Africa/Johannesburg'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSaveSettings(settings);
      setSaveSuccess(true);
      setIsLoading(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const validatePhoneNumber = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, '');
    return /^(\+27|0)[6-8][0-9]{8}$/.test(cleanPhone);
  };

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
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                SMS & WhatsApp Settings
              </h1>
            </div>
          </div>
          <Button variant="outline" onClick={navigateHome} className="border-blue-300 hover:bg-blue-50">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Hero Section */}
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Mobile phone with farming alerts and notifications"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Rural Communication Setup</h1>
              <p className="text-lg text-blue-100">Configure SMS & WhatsApp alerts for reliable farm communication</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-300">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Notification settings saved successfully! You'll start receiving alerts according to your preferences.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-700 font-medium">SMS Phone Number</Label>
                  <Input
                    value={settings.phoneNumber}
                    onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                    placeholder="+27 82 123 4567"
                    className={`border-blue-300 focus:border-blue-500 ${
                      settings.phoneNumber && !validatePhoneNumber(settings.phoneNumber) ? 'border-red-500' : ''
                    }`}
                  />
                  {settings.phoneNumber && !validatePhoneNumber(settings.phoneNumber) && (
                    <p className="text-red-600 text-sm">Please enter a valid South African phone number</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="text-blue-700 font-medium">WhatsApp Number</Label>
                  <Input
                    value={settings.whatsappNumber}
                    onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
                    placeholder="+27 82 123 4567"
                    className={`border-blue-300 focus:border-blue-500 ${
                      settings.whatsappNumber && !validatePhoneNumber(settings.whatsappNumber) ? 'border-red-500' : ''
                    }`}
                  />
                  <p className="text-xs text-gray-600">Must have WhatsApp installed</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-blue-700 font-medium">Email Address</Label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="border-blue-300 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* SMS Alert Settings */}
          <Card className="shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                SMS Alert Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Enable SMS Alerts</p>
                    <p className="text-sm text-gray-600">Receive text messages for important farm updates</p>
                  </div>
                </div>
                <Switch
                  checked={settings.smsAlerts}
                  onCheckedChange={(checked) => handleSettingChange('smsAlerts', checked)}
                />
              </div>

              {settings.smsAlerts && (
                <div className="pl-8 space-y-3 border-l-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Irrigation reminders</span>
                    </div>
                    <Switch
                      checked={settings.smsIrrigation}
                      onCheckedChange={(checked) => handleSettingChange('smsIrrigation', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Weather alerts</span>
                    </div>
                    <Switch
                      checked={settings.smsWeather}
                      onCheckedChange={(checked) => handleSettingChange('smsWeather', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Emergency alerts</span>
                    </div>
                    <Switch
                      checked={settings.smsEmergency}
                      onCheckedChange={(checked) => handleSettingChange('smsEmergency', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">System notifications</span>
                    </div>
                    <Switch
                      checked={settings.smsSystem}
                      onCheckedChange={(checked) => handleSettingChange('smsSystem', checked)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* WhatsApp Settings */}
          <Card className="shadow-lg border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp Alert Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">Enable WhatsApp Alerts</p>
                    <p className="text-sm text-gray-600">Receive rich media messages with images and detailed reports</p>
                  </div>
                </div>
                <Switch
                  checked={settings.whatsappAlerts}
                  onCheckedChange={(checked) => handleSettingChange('whatsappAlerts', checked)}
                />
              </div>

              {settings.whatsappAlerts && (
                <div className="pl-8 space-y-3 border-l-2 border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Irrigation schedules & reminders</span>
                    </div>
                    <Switch
                      checked={settings.whatsappIrrigation}
                      onCheckedChange={(checked) => handleSettingChange('whatsappIrrigation', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Weather forecasts with images</span>
                    </div>
                    <Switch
                      checked={settings.whatsappWeather}
                      onCheckedChange={(checked) => handleSettingChange('whatsappWeather', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Emergency & critical alerts</span>
                    </div>
                    <Switch
                      checked={settings.whatsappEmergency}
                      onCheckedChange={(checked) => handleSettingChange('whatsappEmergency', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bug className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">Disease monitoring alerts</span>
                    </div>
                    <Switch
                      checked={settings.whatsappSystem}
                      onCheckedChange={(checked) => handleSettingChange('whatsappSystem', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Weekly reports & analytics</span>
                    </div>
                    <Switch
                      checked={settings.whatsappReports}
                      onCheckedChange={(checked) => handleSettingChange('whatsappReports', checked)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card className="shadow-lg border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Notification Timing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Enable Quiet Hours</p>
                    <p className="text-sm text-gray-600">No non-emergency alerts during specified hours</p>
                  </div>
                </div>
                <Switch
                  checked={settings.quietHoursEnabled}
                  onCheckedChange={(checked) => handleSettingChange('quietHoursEnabled', checked)}
                />
              </div>

              {settings.quietHoursEnabled && (
                <div className="pl-8 grid grid-cols-2 gap-4 border-l-2 border-purple-200">
                  <div className="space-y-2">
                    <Label className="text-purple-700 font-medium">Start Time</Label>
                    <Input
                      type="time"
                      value={settings.quietStart}
                      onChange={(e) => handleSettingChange('quietStart', e.target.value)}
                      className="border-purple-300 focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-700 font-medium">End Time</Label>
                    <Input
                      type="time"
                      value={settings.quietEnd}
                      onChange={(e) => handleSettingChange('quietEnd', e.target.value)}
                      className="border-purple-300 focus:border-purple-500"
                    />
                  </div>
                </div>
              )}

              <Alert className="bg-blue-50 border-blue-300">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Important:</strong> Emergency alerts (system failures, extreme weather) will always be sent regardless of quiet hours.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              size="lg"
              className="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving Settings...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Save Notification Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}