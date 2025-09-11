import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Droplets, User, Mail, Lock, Phone, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userData: any) => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Comprehensive South African cities by province
const southAfricanCities = {
  'Western Cape': [
    'Cape Town', 'Stellenbosch', 'Paarl', 'Wellington', 'Worcester', 'George', 'Mossel Bay',
    'Knysna', 'Oudtshoorn', 'Hermanus', 'Swellendam', 'Caledon', 'Bredasdorp', 'Riversdale',
    'Ladismith', 'Montagu', 'Robertson', 'Ashton', 'Bonnievale', 'McGregor'
  ],
  'Gauteng': [
    'Johannesburg', 'Pretoria', 'Boksburg', 'Germiston', 'Benoni', 'Kempton Park', 'Edenvale',
    'Randburg', 'Roodepoort', 'Soweto', 'Sandton', 'Midrand', 'Centurion', 'Krugersdorp',
    'Springs', 'Alberton', 'Vanderbijlpark', 'Vereeniging', 'Carletonville', 'Westonaria'
  ],
  'KwaZulu-Natal': [
    'Durban', 'Pietermaritzburg', 'Newcastle', 'Ladysmith', 'Estcourt', 'Richards Bay',
    'Empangeni', 'Pinetown', 'Chatsworth', 'Westville', 'Amanzimtoti', 'Kloof', 'Hillcrest',
    'Stanger', 'Eshowe', 'Vryheid', 'Dundee', 'Glencoe', 'Kokstad', 'Port Shepstone'
  ],
  'Eastern Cape': [
    'Port Elizabeth', 'East London', 'Grahamstown', 'Uitenhage', 'King Williams Town',
    'Queenstown', 'Bhisho', 'Mdantsane', 'Butterworth', 'Mthatha', 'Graaff-Reinet',
    'Cradock', 'Somerset East', 'Kirkwood', 'Jeffreys Bay', 'Humansdorp', 'Plettenberg Bay',
    'Knysna', 'Stutterheim', 'Fort Beaufort'
  ],
  'Free State': [
    'Bloemfontein', 'Welkom', 'Kroonstad', 'Bethlehem', 'Sasolburg', 'Parys', 'Ficksburg',
    'Harrismith', 'Heilbron', 'Hoopstad', 'Bothaville', 'Virginia', 'Odendaalsrus',
    'Theunissen', 'Winburg', 'Senekal', 'Reitz', 'Vrede', 'Fouriesburg', 'Clarens'
  ],
  'Limpopo': [
    'Polokwane', 'Tzaneen', 'Thohoyandou', 'Giyani', 'Musina', 'Bela-Bela', 'Mokopane',
    'Thabazimbi', 'Louis Trichardt', 'Phalaborwa', 'Hoedspruit', 'Lephalale', 'Modimolle',
    'Dendron', 'Marble Hall', 'Naboomspruit', 'Vaalwater', 'Ellisras', 'Messina', 'Duiwelskloof'
  ],
  'Mpumalanga': [
    'Nelspruit', 'Witbank', 'Secunda', 'Standerton', 'Ermelo', 'Middelburg', 'Volksrust',
    'Piet Retief', 'White River', 'Barberton', 'Sabie', 'Graskop', 'Lydenburg', 'Belfast',
    'Delmas', 'Bethal', 'Kriel', 'Trichardt', 'Hendrina', 'Carolina'
  ],
  'North West': [
    'Mahikeng', 'Rustenburg', 'Klerksdorp', 'Potchefstroom', 'Brits', 'Lichtenburg',
    'Vryburg', 'Zeerust', 'Schweizer-Reneke', 'Wolmaransstad', 'Ottoshoop', 'Koster',
    'Swartruggens', 'Hartbeespoort', 'Madikwe', 'Groot-Marico', 'Sannieshof', 'Delareyville',
    'Coligny', 'Ventersdorp'
  ],
  'Northern Cape': [
    'Kimberley', 'Upington', 'Springbok', 'De Aar', 'Kuruman', 'Postmasburg', 'Kathu',
    'Sishen', 'Calvinia', 'Colesberg', 'Prieska', 'Carnarvon', 'Britstown', 'Hanover',
    'Richmond', 'Victoria West', 'Beaufort West', 'Fraserburg', 'Williston', 'Sutherland'
  ]
};

export default function AuthScreen({ onLogin, onBack, isLoading, setIsLoading }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Simulate user database (in real app, this would be backend)
  const getUserData = (email: string) => {
    const users = JSON.parse(localStorage.getItem('smartwater_users') || '{}');
    return users[email] || null;
  };

  const saveUserData = (email: string, userData: any) => {
    const users = JSON.parse(localStorage.getItem('smartwater_users') || '{}');
    users[email] = userData;
    localStorage.setItem('smartwater_users', JSON.stringify(users));
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    if (loginData.email && !loginData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.fullName) newErrors.fullName = 'Full name is required';
    if (!signupData.email) newErrors.email = 'Email is required';
    if (!signupData.phone) newErrors.phone = 'Phone number is required';
    if (!signupData.province) newErrors.province = 'Province is required';
    if (!signupData.location) newErrors.location = 'City is required';
    if (!signupData.password) newErrors.password = 'Password is required';
    if (!signupData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    
    if (signupData.email && !signupData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (signupData.password && signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (signupData.phone && !/^(\+27|0)[6-8][0-9]{8}$/.test(signupData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid South African phone number';
    }

    // Check if email already exists
    if (signupData.email && getUserData(signupData.email)) {
      newErrors.email = 'An account with this email already exists';
    }

    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userData = getUserData(loginData.email);
      
      if (userData && userData.password === loginData.password) {
        // Update last login time
        const updatedUser = {
          ...userData,
          lastLogin: new Date().toISOString()
        };
        saveUserData(loginData.email, updatedUser);
        onLogin(updatedUser);
      } else {
        setErrors({ 
          general: 'Invalid email or password. Please check your credentials and try again.' 
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        fullName: signupData.fullName,
        email: signupData.email,
        phone: signupData.phone,
        province: signupData.province,
        location: signupData.location,
        password: signupData.password,
        createdAt: new Date().toISOString(),
        farmData: null, // Will be set when user completes farm setup
        preferences: {
          smsAlerts: true,
          whatsappAlerts: true,
          emailAlerts: true,
          weatherAlerts: true,
          irrigationReminders: true,
          systemAlerts: true
        },
        isNewUser: true
      };

      saveUserData(signupData.email, newUser);
      onLogin(newUser);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="relative overflow-hidden min-h-screen">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="South African Agriculture - Smart Irrigation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-red-900/70 to-yellow-900/80"></div>
        
        <div className="relative flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md shadow-2xl border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg text-center">
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <div className="w-8"></div>
              </div>
              <CardTitle className="text-2xl">SmartWater SA</CardTitle>
              <p className="text-orange-100">Join the water-smart farming revolution</p>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>

                {/* General Error Display */}
                {errors.general && (
                  <Alert className="bg-red-50 border-red-300">
                    <AlertDescription className="text-red-800">
                      {errors.general}
                    </AlertDescription>
                  </Alert>
                )}

                <TabsContent value="login" className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-orange-700 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-orange-700 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        placeholder="Enter your password"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4 mr-2" />
                          Sign In to Your Farm
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => setActiveTab('signup')}
                          className="text-orange-600 hover:text-orange-800 p-0 h-auto font-medium"
                        >
                          Create one here
                        </Button>
                      </p>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-orange-700 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                        placeholder="John Smith"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.fullName ? 'border-red-500' : ''}`}
                      />
                      {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail" className="text-orange-700 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-orange-700 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        placeholder="+27 82 123 4567"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Province Selection */}
                    <div className="space-y-2">
                      <Label className="text-orange-700 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Province
                      </Label>
                      <Select
                        value={signupData.province}
                        onValueChange={(value) => setSignupData({...signupData, province: value, location: ''})}
                      >
                        <SelectTrigger className={`border-orange-300 focus:border-orange-500 ${errors.province ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your province" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(southAfricanCities).map((province) => (
                            <SelectItem key={province} value={province}>{province}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.province && <p className="text-red-600 text-sm">{errors.province}</p>}
                    </div>

                    {/* City Selection */}
                    {signupData.province && (
                      <div className="space-y-2">
                        <Label className="text-orange-700">City/Town</Label>
                        <Select
                          value={signupData.location}
                          onValueChange={(value) => setSignupData({...signupData, location: value})}
                        >
                          <SelectTrigger className={`border-orange-300 focus:border-orange-500 ${errors.location ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            {southAfricanCities[signupData.province]?.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="signupPassword" className="text-orange-700 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Password
                      </Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        placeholder="Choose a strong password"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-orange-700 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        placeholder="Confirm your password"
                        required
                        className={`border-orange-300 focus:border-orange-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-3"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Create My Farm Account
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => setActiveTab('login')}
                          className="text-orange-600 hover:text-orange-800 p-0 h-auto font-medium"
                        >
                          Sign in here
                        </Button>
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>
                  By {activeTab === 'login' ? 'signing in' : 'creating an account'}, you agree to our{' '}
                  <span className="text-orange-600 hover:underline cursor-pointer">Terms of Service</span> and{' '}
                  <span className="text-orange-600 hover:underline cursor-pointer">Privacy Policy</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}