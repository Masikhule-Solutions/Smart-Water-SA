import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Droplets, 
  Zap, 
  LogOut, 
  Target, 
  DollarSign, 
  Leaf, 
  ArrowRight,
  User,
  Shield,
  Smartphone,
  BarChart3,
  CheckCircle,
  Users,
  UserPlus
} from 'lucide-react';

interface WelcomeScreenProps {
  isLoggedIn: boolean;
  currentUser?: any;
  isLoading: boolean;
  handleQuickDemo: () => void;
  handleLogout: () => void;
  navigateToAuth: () => void;
  navigateToForm: () => void;
  navigateToDashboard: () => void;
}

export default function WelcomeScreen({
  isLoggedIn,
  currentUser,
  isLoading,
  handleQuickDemo,
  handleLogout,
  navigateToAuth,
  navigateToForm,
  navigateToDashboard
}: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50 texture-soil">
      {/* Navigation Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-green-300 p-4 shadow-farm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-farm-gradient rounded-full flex items-center justify-center shadow-farm">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-farm-green">
                SmartWater SA
              </h1>
              <p className="text-sm text-field-sage">Smart Irrigation for South African Farmers</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <div className="text-right mr-3">
                  <p className="text-sm font-medium text-gray-800">Welcome back, {currentUser?.fullName?.split(' ')[0]}!</p>
                  <p className="text-xs text-gray-600">{currentUser?.email}</p>
                </div>
                {currentUser?.farmData ? (
                  <Button onClick={navigateToDashboard} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    My Dashboard
                  </Button>
                ) : (
                  <Button onClick={navigateToForm} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    <Leaf className="w-4 h-4 mr-2" />
                    Setup Farm
                  </Button>
                )}
                <Button variant="outline" onClick={handleLogout} className="border-red-300 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={navigateToAuth}
                  className="border-blue-300 hover:bg-blue-50"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button onClick={navigateToAuth} className="bg-farm-gradient hover:from-green-700 hover:to-emerald-700 shadow-farm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-b-2xl shadow-2xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Breathtaking South African agricultural landscape with vibrant green fields, tractors working the land, and smart irrigation systems under golden African sunrise"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-green-800/75 to-amber-900/85 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Combat Water Scarcity with Smart Irrigation</h1>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of South African farmers saving up to 40% on water costs while increasing yields by 15%
            </p>
            
            {isLoggedIn ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentUser?.farmData ? (
                  <>
                    <Button 
                      size="lg" 
                      onClick={navigateToDashboard}
                      className="bg-white text-orange-700 hover:bg-gray-100 font-semibold py-3 px-8"
                    >
                      <BarChart3 className="w-5 h-5 mr-2" />
                      View My Dashboard
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={handleQuickDemo}
                      disabled={isLoading}
                      className="border-white text-white hover:bg-white/20 font-semibold py-3 px-8"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Loading Demo...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Try Quick Demo
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={navigateToForm}
                    className="bg-white text-orange-700 hover:bg-gray-100 font-semibold py-3 px-8"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    Setup Your Smart Farm
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={navigateToAuth}
                  className="bg-white text-orange-700 hover:bg-gray-100 font-semibold py-3 px-8"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Get Started - Create Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={navigateToAuth}
                  className="border-white text-white hover:bg-white/20 font-semibold py-3 px-8"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Sign In to Existing Account
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-12">
        {/* Crisis Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-16 relative z-10">
          <Card className="bg-barn-red text-white border-0 shadow-2xl shadow-farm animate-grow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold">Level 6</div>
              <div className="text-red-100">Water Restrictions</div>
              <div className="text-sm text-red-200 mt-2">Cape Town Region</div>
            </CardContent>
          </Card>
          <Card className="bg-harvest-gold text-white border-0 shadow-2xl shadow-harvest animate-grow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-amber-100">Water Waste</div>
              <div className="text-sm text-amber-200 mt-2">Traditional Methods</div>
            </CardContent>
          </Card>
          <Card className="bg-soil-brown text-white border-0 shadow-2xl shadow-farm animate-grow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold">R3,450</div>
              <div className="text-amber-100">Monthly Savings</div>
              <div className="text-sm text-amber-200 mt-2">Average Smart Farm</div>
            </CardContent>
          </Card>
          <Card className="bg-crop-green text-white border-0 shadow-2xl shadow-farm animate-grow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold">15%</div>
              <div className="text-green-100">Yield Increase</div>
              <div className="text-sm text-green-200 mt-2">With Smart Irrigation</div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid with More Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg border-blue-200 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Smartphone className="w-6 h-6 mr-3" />
                SMS & WhatsApp Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="South African farmer using mobile phone in golden maize field with agricultural technology and farming notifications"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">Get irrigation reminders, weather alerts, and emergency notifications via SMS and WhatsApp - perfect for rural areas with limited internet.</p>
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">✓ Works Offline</Badge>
                <Badge className="bg-blue-100 text-blue-800">✓ Emergency Alerts</Badge>
                <Badge className="bg-orange-100 text-orange-800">✓ Weather Warnings</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-green-200 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Precision Irrigation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="South African farmer operating precision drip irrigation system in healthy crop rows with vibrant agricultural setting"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">AI-powered scheduling based on soil moisture, weather forecasts, and crop growth stages. Reduce water usage by up to 40% while maximizing yields.</p>
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">✓ 40% Water Savings</Badge>
                <Badge className="bg-blue-100 text-blue-800">✓ Weather Integration</Badge>
                <Badge className="bg-purple-100 text-purple-800">✓ IoT Sensors</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-200 hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <DollarSign className="w-6 h-6 mr-3" />
                Cost Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Agricultural financial calculator with irrigation cost savings displayed on tablet in farm setting with growing crops"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">Track water costs in real-time, optimize irrigation timing for peak efficiency, and receive detailed financial reports on savings achieved.</p>
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800">✓ Real-time Costs</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">✓ ROI Tracking</Badge>
                <Badge className="bg-blue-100 text-blue-800">✓ Province Rates</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Showcase - ADVANCED IoT TECHNOLOGY */}
        <div className="bg-gradient-to-r from-emerald-100 via-green-100 to-teal-100 rounded-2xl p-8 shadow-xl border border-green-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Advanced IoT sensors monitoring crop fields with smart irrigation technology"
                className="w-full h-80 object-cover rounded-xl shadow-lg border-4 border-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581092918484-8313de7ca3d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="IoT moisture sensors in soil"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Smart irrigation control panel"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-green-800 mb-6 leading-tight">Advanced IoT Technology</h2>
              <div className="space-y-5 text-green-700">
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Real-time soil moisture monitoring with wireless sensors across multiple field zones</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Weather station integration for hyper-local forecasts and drought predictions</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Automated valve control for precision irrigation timing and water flow management</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Mobile connectivity for remote farm management and instant alerts</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-800 text-white rounded-lg">
                <p className="text-lg font-semibold">💡 Smart Technology Result:</p>
                <p className="text-green-100">Farmers report 35-40% water savings and 15-20% yield increases with our IoT-powered irrigation systems.</p>
              </div>
            </div>
          </div>
        </div>

        {/* South African Focus - BUILT FOR SOUTH AFRICAN CONDITIONS */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 rounded-2xl p-8 shadow-xl border border-orange-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-orange-800 mb-6 leading-tight">Built for South African Conditions</h2>
              <div className="space-y-5 text-orange-700">
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">50+ South African crop varieties including maize, wheat, citrus, table grapes, and vegetables</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">All 9 provinces with local water costs, restriction levels, and municipal rates</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Weather data optimized for Southern Hemisphere growing seasons and drought cycles</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Multi-language support (English, Afrikaans, Zulu) for diverse farming communities</span>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-white/70 rounded-lg shadow-sm">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Rural connectivity with SMS/WhatsApp integration for areas with poor internet</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-800 text-white rounded-lg">
                <p className="text-lg font-semibold">🇿🇦 South African Advantage:</p>
                <p className="text-orange-100">Designed by local agricultural experts who understand the unique challenges of farming in South Africa's diverse climate zones.</p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="South African farmer using modern irrigation technology in vibrant agricultural setting"
                className="w-full h-80 object-cover rounded-xl shadow-lg border-4 border-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="South African maize field with irrigation"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1571552480162-146d90bd99f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Vibrant South African vineyard with irrigation systems"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Combat South Africa's Water Crisis - Enhanced with Powerful Agricultural Imagery */}
        <div className="bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 rounded-2xl p-8 shadow-2xl border-2 border-red-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-red-800 mb-6 leading-tight">Combat South Africa's Water Crisis</h2>
              <div className="space-y-5 text-red-700">
                <div className="flex items-start space-x-4 p-4 bg-white/80 rounded-lg shadow-md border border-red-200">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Address Day Zero scenarios with intelligent water management and conservation strategies</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/80 rounded-lg shadow-md border border-orange-200">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Reduce agricultural water consumption by up to 40% while maintaining crop quality and yield</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/80 rounded-lg shadow-md border border-yellow-200">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Early drought warning systems and automated mitigation strategies for climate resilience</span>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/80 rounded-lg shadow-md border border-green-200">
                  <CheckCircle className="w-7 h-7 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-lg font-medium">Rainwater harvesting integration and optimization for maximum water capture and storage</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-800 text-white rounded-lg shadow-lg">
                <p className="text-lg font-semibold">🚨 Critical Water Crisis Solution:</p>
                <p className="text-red-100">Help preserve South Africa's precious water resources while ensuring food security for future generations. Every drop counts in the fight against drought.</p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="South African farmer implementing advanced drought-resistant irrigation systems to combat severe water scarcity crisis"
                className="w-full h-80 object-cover rounded-xl shadow-lg border-4 border-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Vibrant South African agricultural landscape with modern irrigation combating drought"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Advanced water conservation technology protecting crops during water crisis"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              </div>
              
              {/* Crisis Statistics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-red-600 text-white rounded-lg shadow-md">
                  <div className="text-2xl font-bold">Level 6</div>
                  <div className="text-xs">Water Restrictions</div>
                </div>
                <div className="text-center p-3 bg-orange-600 text-white rounded-lg shadow-md">
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-xs">Water Waste Reduced</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Testimonials */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Trusted by South African Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  alt="South African farmer testimonial"
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-green-200"
                />
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-center w-full">
                    <p className="font-semibold text-gray-800">Pieter van der Merwe</p>
                    <p className="text-sm text-gray-600">Wine Farm, Western Cape</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-center">"Reduced our water usage by 35% while improving grape quality. The SMS alerts work perfectly in our remote location."</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1494790108755-2616b332c0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  alt="South African farmer testimonial"
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-blue-200"
                />
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-center w-full">
                    <p className="font-semibold text-gray-800">Nomsa Mthembu</p>
                    <p className="text-sm text-gray-600">Vegetable Farm, KwaZulu-Natal</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-center">"The WhatsApp notifications keep me informed even when I'm at the market. Water costs dropped by R4,000 per month!"</p>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  alt="South African farmer testimonial"
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-orange-200"
                />
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-center w-full">
                    <p className="font-semibold text-gray-800">Johan Botha</p>
                    <p className="text-sm text-gray-600">Maize Farm, Free State</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-center">"Smart irrigation helped us survive the drought. Yields increased 18% while using 30% less water."</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join the water-smart farming revolution and start saving money while protecting our precious water resources.
          </p>
          
          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentUser?.farmData ? (
                <Button 
                  size="lg" 
                  onClick={navigateToDashboard}
                  className="bg-white text-orange-700 hover:bg-gray-100 font-semibold py-4 px-8"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Go to My Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  onClick={navigateToForm}
                  className="bg-white text-orange-700 hover:bg-gray-100 font-semibold py-4 px-8"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Complete Farm Setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={navigateToAuth}
                className="bg-white text-orange-700 hover:bg-gray-100 font-semibold py-4 px-8"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Create Your Account Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={navigateToAuth}
                className="border-white text-white hover:bg-white/20 font-semibold py-4 px-8"
              >
                <Shield className="w-5 h-5 mr-2" />
                Sign In to Existing Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}