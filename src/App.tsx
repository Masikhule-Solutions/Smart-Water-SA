import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Droplets, Tractor, Wheat, Leaf } from 'lucide-react';
import WelcomeScreen from './components/screens/WelcomeScreen';
import AuthScreen from './components/screens/AuthScreen';
import FormScreen from './components/screens/FormScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import WeatherScreen from './components/screens/WeatherScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import IoTScreen from './components/screens/IoTScreen';
import DiseaseMonitoringScreen from './components/screens/DiseaseMonitoringScreen';
import NotificationSettingsScreen from './components/screens/NotificationSettingsScreen';
import { downloadSchedule, getQuickDemoData, getEmptyFormData } from './utils/functions';

export default function SmartWaterSA() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentUser, setCurrentUser] = useState(null);
  const [userFormData, setUserFormData] = useState(getEmptyFormData());
  const [isLoading, setIsLoading] = useState(false);

  // Initialize app with South African timezone awareness
  useEffect(() => {
    // Set up South African timezone
    const southAfricaTime = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Check for existing user session
    const savedUser = localStorage.getItem('smartwater_current_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        const users = JSON.parse(localStorage.getItem('smartwater_users') || '{}');
        const fullUserData = users[userData.email];
        
        if (fullUserData) {
          setCurrentUser(fullUserData);
          if (fullUserData.farmData) {
            setUserFormData(fullUserData.farmData);
            setCurrentScreen('dashboard');
          } else {
            setCurrentScreen('form');
          }
        }
      } catch (error) {
        console.error('Error loading user session:', error);
        localStorage.removeItem('smartwater_current_user');
      }
    }
  }, []);

  // Save user data to localStorage
  const saveUserData = (email: string, userData: any) => {
    const users = JSON.parse(localStorage.getItem('smartwater_users') || '{}');
    users[email] = userData;
    localStorage.setItem('smartwater_users', JSON.stringify(users));
  };

  // Handle user login/signup - Fixed to prevent demo account conflicts
  const handleUserAuthentication = (userData) => {
    setCurrentUser(userData);
    setIsLoading(false);
    
    // Save current user session
    localStorage.setItem('smartwater_current_user', JSON.stringify({
      email: userData.email,
      loginTime: new Date().toISOString()
    }));

    // Don't auto-load demo data for real users
    if (userData.farmData && !userData.isNewUser) {
      setUserFormData(userData.farmData);
      setCurrentScreen('dashboard');
    } else {
      // New user or user without farm setup - go to form with clean data
      setUserFormData(getEmptyFormData());
      setCurrentScreen('form');
    }
  };

  // Handle user logout
  const handleLogout = () => {
    // Save current farm data before logout
    if (currentUser && userFormData.farmerName) {
      const updatedUser = {
        ...currentUser,
        farmData: userFormData,
        lastUpdated: new Date().toISOString()
      };
      saveUserData(currentUser.email, updatedUser);
    }
    
    setCurrentUser(null);
    setUserFormData(getEmptyFormData());
    localStorage.removeItem('smartwater_current_user');
    setCurrentScreen('welcome');
  };

  // Quick Demo functionality - only for existing users
  const handleQuickDemo = () => {
    if (!currentUser) {
      // Redirect to auth for demo
      setCurrentScreen('auth');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const demoData = getQuickDemoData();
      setUserFormData(demoData);
      
      // Save demo data to current user account
      const updatedUser = {
        ...currentUser,
        farmData: demoData,
        lastUpdated: new Date().toISOString(),
        isDemoData: true // Flag to indicate this is demo data
      };
      saveUserData(currentUser.email, updatedUser);
      setCurrentUser(updatedUser);
      
      setCurrentScreen('dashboard');
      setIsLoading(false);
    }, 2000);
  };

  // Navigation functions
  const navigateHome = () => setCurrentScreen('welcome');
  const navigateToAuth = () => setCurrentScreen('auth');
  const navigateToDashboard = () => setCurrentScreen('dashboard');
  const navigateToForm = () => setCurrentScreen('form');
  const navigateToCalendar = () => setCurrentScreen('calendar');
  const navigateToSettings = () => setCurrentScreen('settings');
  const navigateToWeather = () => setCurrentScreen('weather');
  const navigateToIoT = () => setCurrentScreen('iot');
  const navigateToDiseaseMonitoring = () => setCurrentScreen('disease');
  const navigateToNotifications = () => setCurrentScreen('notifications');

  // Settings handlers
  const handleResetSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserFormData(getEmptyFormData());
      
      // Update user data
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          farmData: null,
          lastUpdated: new Date().toISOString()
        };
        saveUserData(currentUser.email, updatedUser);
        setCurrentUser(updatedUser);
      }
      
      setIsLoading(false);
      setCurrentScreen('form');
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (currentUser && userFormData.farmerName) {
        const updatedUser = {
          ...currentUser,
          farmData: userFormData,
          lastUpdated: new Date().toISOString()
        };
        saveUserData(currentUser.email, updatedUser);
        setCurrentUser(updatedUser);
      }
      setIsLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  // Form submission with user data persistence
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          farmData: userFormData,
          lastUpdated: new Date().toISOString()
        };
        saveUserData(currentUser.email, updatedUser);
        setCurrentUser(updatedUser);
      }
      
      setCurrentScreen('dashboard');
      setIsLoading(false);
    }, 1500);
  };

  // Download functionality
  const handleDownloadSchedule = () => {
    downloadSchedule(userFormData, currentUser);
  };

  // Save notification settings
  const handleSaveNotificationSettings = (settings) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        preferences: {
          ...currentUser.preferences,
          ...settings
        },
        lastUpdated: new Date().toISOString()
      };
      saveUserData(currentUser.email, updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  // Screen routing with authentication checks
  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        isLoggedIn={!!currentUser}
        currentUser={currentUser}
        isLoading={isLoading}
        handleQuickDemo={handleQuickDemo}
        handleLogout={handleLogout}
        navigateToAuth={navigateToAuth}
        navigateToForm={navigateToForm}
        navigateToDashboard={navigateToDashboard}
      />
    );
  }

  if (currentScreen === 'auth') {
    return (
      <AuthScreen
        onLogin={handleUserAuthentication}
        onBack={navigateHome}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  }

  // Protected routes - require authentication with STRONG AGRICULTURAL THEME
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
        {/* Agricultural Background Layer */}
        <div className="relative overflow-hidden min-h-screen">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Expansive South African agricultural landscape with vibrant green fields, modern farming equipment, and irrigation systems under golden sunrise"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-green-900/60 to-emerald-900/70"></div>
          
          {/* Agricultural Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md shadow-2xl border-2 border-amber-300 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-amber-600 via-green-600 to-emerald-600 text-white rounded-t-lg text-center">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Tractor className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Wheat className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
                <p className="text-amber-100 text-sm">Smart Irrigation for South African Farmers</p>
              </CardHeader>
              <CardContent className="p-8 text-center">
                {/* Mini Agricultural Showcase */}
                <div className="mb-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Modern South African farm with smart irrigation technology and healthy crop rows"
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <div className="flex justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-sm text-green-700">
                      <Leaf className="w-4 h-4" />
                      <span>Smart Farming</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-blue-700">
                      <Droplets className="w-4 h-4" />
                      <span>Water Savings</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-amber-700">
                      <Wheat className="w-4 h-4" />
                      <span>Better Yields</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 font-medium">
                  Join thousands of South African farmers using smart irrigation to combat water scarcity and increase crop yields.
                </p>
                
                {/* Agricultural Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <div className="text-lg font-bold text-green-700">40%</div>
                    <div className="text-xs text-green-600">Water Saved</div>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <div className="text-lg font-bold text-amber-700">15%</div>
                    <div className="text-xs text-amber-600">Yield Increase</div>
                  </div>
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <div className="text-lg font-bold text-emerald-700">R3.5k</div>
                    <div className="text-xs text-emerald-600">Monthly Savings</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={navigateToAuth}
                    className="w-full bg-gradient-to-r from-amber-600 via-green-600 to-emerald-600 hover:from-amber-700 hover:via-green-700 hover:to-emerald-700 text-white font-semibold py-3 shadow-lg"
                  >
                    <Tractor className="w-4 h-4 mr-2" />
                    Access Your Smart Farm
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={navigateHome}
                    className="w-full border-2 border-green-400 text-green-700 hover:bg-green-50 font-medium"
                  >
                    <Leaf className="w-4 h-4 mr-2" />
                    Back to Farm Hub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'form') {
    return (
      <FormScreen
        formData={userFormData}
        setFormData={setUserFormData}
        isLoading={isLoading}
        handleFormSubmit={handleFormSubmit}
        navigateHome={navigateHome}
        currentUser={currentUser}
      />
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <DashboardScreen
        formData={userFormData}
        currentUser={currentUser}
        isLoggedIn={!!currentUser}
        handleLogout={handleLogout}
        navigateHome={navigateHome}
        navigateToCalendar={navigateToCalendar}
        navigateToSettings={navigateToSettings}
        navigateToWeather={navigateToWeather}
        navigateToIoT={navigateToIoT}
        navigateToDiseaseMonitoring={navigateToDiseaseMonitoring}
        navigateToNotifications={navigateToNotifications}
        downloadSchedule={handleDownloadSchedule}
      />
    );
  }

  if (currentScreen === 'weather') {
    return (
      <WeatherScreen
        formData={userFormData}
        navigateToDashboard={navigateToDashboard}
        navigateHome={navigateHome}
      />
    );
  }

  if (currentScreen === 'calendar') {
    return (
      <CalendarScreen
        formData={userFormData}
        navigateToDashboard={navigateToDashboard}
        navigateHome={navigateHome}
        downloadSchedule={handleDownloadSchedule}
      />
    );
  }

  if (currentScreen === 'settings') {
    return (
      <SettingsScreen
        formData={userFormData}
        currentUser={currentUser}
        isLoading={isLoading}
        navigateToDashboard={navigateToDashboard}
        navigateHome={navigateHome}
        navigateToForm={navigateToForm}
        navigateToCalendar={navigateToCalendar}
        navigateToNotifications={navigateToNotifications}
        handleResetSettings={handleResetSettings}
        handleSaveSettings={handleSaveSettings}
      />
    );
  }

  if (currentScreen === 'notifications') {
    return (
      <NotificationSettingsScreen
        currentUser={currentUser}
        navigateToDashboard={navigateToDashboard}
        navigateHome={navigateHome}
        onSaveSettings={handleSaveNotificationSettings}
      />
    );
  }

  if (currentScreen === 'iot') {
    return (
      <IoTScreen
        formData={userFormData}
        navigateToDashboard={navigateToDashboard}
        navigateHome={navigateHome}
      />
    );
  }

  if (currentScreen === 'disease') {
    return (
      <DiseaseMonitoringScreen
        formData={userFormData}
        navigateToDashboard={navigateToDashboard}
        navigateHome={navigateHome}
      />
    );
  }

  // Enhanced Agricultural-themed Error Fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      <div className="relative min-h-screen">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Peaceful South African farm landscape with golden fields and agricultural infrastructure"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-4xl mx-auto p-4 flex items-center justify-center min-h-screen">
          <Card className="shadow-2xl border-2 border-amber-300 bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-amber-600 via-green-600 to-emerald-600 text-white rounded-t-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Tractor className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">SmartWater SA - Navigation Error</CardTitle>
              <p className="text-amber-100">Something went wrong with your farm dashboard</p>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Irrigation system in agricultural field showing modern farming technology"
                className="w-full h-32 object-cover rounded-lg mb-6"
              />
              <p className="text-gray-700 mb-6 font-medium">
                We're experiencing a technical issue with your smart irrigation system. Let's get you back to your farm dashboard.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={navigateHome}
                  className="w-full bg-gradient-to-r from-amber-600 via-green-600 to-emerald-600 hover:from-amber-700 hover:via-green-700 hover:to-emerald-700 text-white font-semibold py-3 shadow-lg"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Return to Farm Hub
                </Button>
                <p className="text-sm text-gray-600">
                  🌾 Your farm data is safe and secure
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}