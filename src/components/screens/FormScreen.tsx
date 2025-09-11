import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft, Leaf, Zap, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { southAfricanLocations, crops } from '../../constants/data';

interface FormScreenProps {
  formData: any;
  setFormData: (data: any) => void;
  isLoading: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
  navigateHome: () => void;
  currentUser?: any;
}

// Comprehensive South African cities by province - same as AuthScreen
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

// Real South African crop images mapping with Onions added
const cropImageMap = {
  'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Wheat': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Sunflower': 'https://images.unsplash.com/photo-1597848212624-e19eb25a56ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Table Grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Citrus': 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Apples': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Pears': 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Avocados': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Tomatoes': 'https://images.unsplash.com/photo-1546470427-e5f7edf55a72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Onions': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Carrots': 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Cabbage': 'https://images.unsplash.com/photo-1594282486314-49ba7cbcd2b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Green Beans': 'https://images.unsplash.com/photo-1553404847-5b1a8aff8b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Lucerne': 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Pasture Grass': 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Soybeans': 'https://images.unsplash.com/photo-1569100516939-7a4c0ba8bd29?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Groundnuts': 'https://images.unsplash.com/photo-1608797178974-15b35ad08d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Sweet Potato': 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'Butternut Squash': 'https://images.unsplash.com/photo-1580910051150-8750469aa1de?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
};

export default function FormScreen({
  formData,
  setFormData,
  isLoading,
  handleFormSubmit,
  navigateHome,
  currentUser
}: FormScreenProps) {
  const [selectedCropCategory, setSelectedCropCategory] = useState('All');
  const [validationErrors, setValidationErrors] = useState({});

  // Auto-populate farmer's name from logged-in user
  React.useEffect(() => {
    if (currentUser && !formData.farmerName) {
      setFormData({
        ...formData,
        farmerName: currentUser.fullName || ''
      });
    }
  }, [currentUser, formData, setFormData]);

  // Filter crops based on selected category
  const filteredCrops = selectedCropCategory === 'All' 
    ? crops 
    : crops.filter(crop => crop.category === selectedCropCategory);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.farmerName?.trim()) errors.farmerName = 'Farmer name is required';
    if (!formData.farmName?.trim()) errors.farmName = 'Farm name is required';
    if (!formData.province) errors.province = 'Province is required';
    if (!formData.location) errors.location = 'Location is required';
    if (!formData.cropType) errors.cropType = 'Crop type is required';
    if (!formData.growthStage) errors.growthStage = 'Growth stage is required';
    
    // Field size validation
    if (!formData.fieldSize) {
      errors.fieldSize = 'Field size is required';
    } else {
      const fieldSizeNum = parseFloat(formData.fieldSize);
      if (isNaN(fieldSizeNum)) {
        errors.fieldSize = 'Field size must be a number';
      } else if (fieldSizeNum <= 0) {
        errors.fieldSize = 'Field size must be greater than 0';
      } else if (fieldSizeNum > 10000) {
        errors.fieldSize = 'Field size cannot exceed 10,000 hectares';
      }
    }
    
    // Soil moisture validation
    if (formData.soilMoisture) {
      const moistureNum = parseFloat(formData.soilMoisture);
      if (isNaN(moistureNum)) {
        errors.soilMoisture = 'Soil moisture must be a number';
      } else if (moistureNum < 0 || moistureNum > 100) {
        errors.soilMoisture = 'Soil moisture must be between 0% and 100%';
      }
    }

    return errors;
  };

  // Enhanced form submission with validation
  const handleValidatedSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      handleFormSubmit(e);
    }
  };

  // Soil moisture analysis function with enhanced feedback
  const getSoilMoistureAnalysis = (moisture: number, cropType: string) => {
    if (!moisture || !cropType) return null;
    
    const crop = crops.find(c => c.name === cropType);
    if (!crop) return null;

    // Parse the soil moisture range
    const [min, max] = crop.soilMoisture.replace('%', '').split('-').map(num => parseInt(num.trim()));
    
    if (moisture < min - 10) {
      return {
        status: 'critical',
        message: 'Critical: Soil moisture is dangerously low',
        recommendation: 'Immediate irrigation required to prevent crop stress and yield loss',
        color: 'red',
        action: 'Irrigate immediately'
      };
    } else if (moisture < min) {
      return {
        status: 'low',
        message: 'Low: Soil moisture is below optimal range',
        recommendation: 'Schedule irrigation within 24 hours to maintain crop health',
        color: 'orange',
        action: 'Schedule irrigation soon'
      };
    } else if (moisture >= min && moisture <= max) {
      return {
        status: 'optimal',
        message: 'Optimal: Soil moisture is in ideal range',
        recommendation: 'Continue monitoring, maintain current irrigation schedule',
        color: 'green',
        action: 'Continue monitoring'
      };
    } else if (moisture <= max + 10) {
      return {
        status: 'high',
        message: 'High: Soil moisture is above optimal range',
        recommendation: 'Reduce irrigation frequency to prevent waterlogging',
        color: 'yellow',
        action: 'Reduce irrigation'
      };
    } else {
      return {
        status: 'excessive',
        message: 'Excessive: Risk of waterlogging and root damage',
        recommendation: 'Stop irrigation immediately and improve drainage',
        color: 'red',
        action: 'Stop irrigation now'
      };
    }
  };

  const soilMoistureAnalysis = getSoilMoistureAnalysis(parseInt(formData.soilMoisture), formData.cropType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Navigation Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-orange-200 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={navigateHome} className="hover:bg-orange-50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent">
                SmartWater SA
              </h1>
              {currentUser && (
                <p className="text-sm text-gray-600">Welcome, {currentUser.fullName}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Advanced smart irrigation setup on South African farm with vibrant agricultural landscape"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Setup Your Water-Smart Farm</h1>
              <p className="text-lg text-orange-100">Configure your irrigation system to combat water scarcity</p>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <Leaf className="w-6 h-6 mr-3" />
              Farm Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleValidatedSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="farmerName" className="text-orange-700 font-medium">Farmer Name *</Label>
                  <Input
                    id="farmerName"
                    value={formData.farmerName}
                    onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
                    placeholder="Enter your full name"
                    required
                    className={`border-orange-300 focus:border-orange-500 ${validationErrors.farmerName ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.farmerName && <p className="text-red-600 text-sm">{validationErrors.farmerName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmName" className="text-orange-700 font-medium">Farm Name *</Label>
                  <Input
                    id="farmName"
                    value={formData.farmName}
                    onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                    placeholder="Enter your farm name"
                    required
                    className={`border-orange-300 focus:border-orange-500 ${validationErrors.farmName ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.farmName && <p className="text-red-600 text-sm">{validationErrors.farmName}</p>}
                </div>
              </div>

              {/* Location Selection with Water Status */}
              <div className="space-y-4">
                <Label className="text-orange-700 font-medium">Location & Water Risk Assessment *</Label>
                
                {/* Province Selector */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">Select Province</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {southAfricanLocations.map((item) => (
                      <Button
                        key={item.province}
                        type="button"
                        variant={formData.province === item.province ? "default" : "outline"}
                        onClick={() => setFormData({...formData, province: item.province, location: ''})}
                        className={`text-sm ${formData.province === item.province ? 'bg-orange-600' : 'border-orange-300 hover:bg-orange-50'}`}
                      >
                        {item.province}
                        <div className={`ml-2 w-2 h-2 rounded-full ${
                          item.waterStatus === 'High Risk' ? 'bg-red-500' :
                          item.waterStatus === 'Medium Risk' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                      </Button>
                    ))}
                  </div>
                  {validationErrors.province && <p className="text-red-600 text-sm">{validationErrors.province}</p>}
                </div>

                {/* Water Risk Display */}
                {formData.province && (
                  <Alert className={`${
                    southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' 
                      ? 'bg-red-50 border-red-300' 
                      : southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'Medium Risk'
                      ? 'bg-yellow-50 border-yellow-300'
                      : 'bg-green-50 border-green-300'
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' 
                        ? 'text-red-600' 
                        : southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'Medium Risk'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`} />
                    <AlertDescription className={`${
                      southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'High Risk' 
                        ? 'text-red-800' 
                        : southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus === 'Medium Risk'
                        ? 'text-yellow-800'
                        : 'text-green-800'
                    }`}>
                      <strong>Water Status:</strong> {southAfricanLocations.find(loc => loc.province === formData.province)?.waterStatus} • 
                      Water Cost: R{southAfricanLocations.find(loc => loc.province === formData.province)?.waterCost}/L • 
                      Smart irrigation recommended for this region.
                    </AlertDescription>
                  </Alert>
                )}

                {/* City Selector - Enhanced with comprehensive city list */}
                {formData.province && (
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Select City/Town</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData({...formData, location: value})}
                    >
                      <SelectTrigger className={`border-orange-300 focus:border-orange-500 ${validationErrors.location ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Choose your city or town" />
                      </SelectTrigger>
                      <SelectContent>
                        {southAfricanCities[formData.province]?.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.location && <p className="text-red-600 text-sm">{validationErrors.location}</p>}
                    <p className="text-xs text-gray-500">
                      Showing {southAfricanCities[formData.province]?.length} cities/towns in {formData.province}
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Crop Selection with Real Images */}
              <div className="space-y-4">
                <Label className="text-orange-700 font-medium">South African Crop Selection *</Label>
                
                {/* Crop Categories - Functional */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
                  {['All', 'Grains', 'Fruits', 'Vegetables', 'Oilseeds', 'Forage'].map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant={selectedCropCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCropCategory(category)}
                      className={`${
                        selectedCropCategory === category 
                          ? 'bg-orange-600 text-white' 
                          : 'border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Enhanced Crop Grid with Real South African Images */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredCrops.map((crop) => (
                    <Card 
                      key={crop.name}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg overflow-hidden ${
                        formData.cropType === crop.name 
                          ? 'border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-200' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setFormData({...formData, cropType: crop.name})}
                    >
                      <div className="relative h-24">
                        <ImageWithFallback
                          src={cropImageMap[crop.name] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                          alt={`${crop.name} - South African crop with vibrant agricultural theme`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <CardContent className="p-3 relative">
                        <div className="text-sm font-medium text-gray-800">{crop.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{crop.category}</div>
                        <div className="text-xs text-orange-600 mt-1">{crop.waterReq}mm/season</div>
                        <div className="text-xs text-blue-600 mt-1">Optimal: {crop.optimalIrrigationTimes?.join(', ')}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {validationErrors.cropType && <p className="text-red-600 text-sm">{validationErrors.cropType}</p>}

                {/* Display selected category info */}
                {selectedCropCategory !== 'All' && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        Showing {filteredCrops.length} {selectedCropCategory.toLowerCase()} crops
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Growth Stage Selection */}
              {formData.cropType && (
                <div className="space-y-2">
                  <Label className="text-orange-700 font-medium">Growth Stage *</Label>
                  <Select
                    value={formData.growthStage}
                    onValueChange={(value) => setFormData({...formData, growthStage: value})}
                  >
                    <SelectTrigger className={`border-orange-300 focus:border-orange-500 ${validationErrors.growthStage ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select current growth stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.find(crop => crop.name === formData.cropType)?.growthStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.growthStage && <p className="text-red-600 text-sm">{validationErrors.growthStage}</p>}
                  
                  {/* Critical Stage Warning */}
                  {crops.find(crop => crop.name === formData.cropType)?.criticalStages.includes(formData.growthStage) && (
                    <Alert className="bg-orange-50 border-orange-300">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <strong>Critical Growth Stage:</strong> This stage requires precise water management. 
                        Smart irrigation is highly recommended.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Enhanced Farm Details with Validation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fieldSize" className="text-orange-700 font-medium">Field Size (hectares) *</Label>
                  <Input
                    id="fieldSize"
                    type="number"
                    min="0.1"
                    max="10000"
                    step="0.1"
                    value={formData.fieldSize}
                    onChange={(e) => setFormData({...formData, fieldSize: e.target.value})}
                    placeholder="e.g., 25.5"
                    required
                    className={`border-orange-300 focus:border-orange-500 ${validationErrors.fieldSize ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.fieldSize && <p className="text-red-600 text-sm">{validationErrors.fieldSize}</p>}
                  <p className="text-xs text-gray-500">Enter field size in hectares (must be positive)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilMoisture" className="text-orange-700 font-medium">Current Soil Moisture (%)</Label>
                  <Input
                    id="soilMoisture"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.soilMoisture}
                    onChange={(e) => setFormData({...formData, soilMoisture: e.target.value})}
                    placeholder="e.g., 65"
                    className={`border-orange-300 focus:border-orange-500 ${validationErrors.soilMoisture ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.soilMoisture && <p className="text-red-600 text-sm">{validationErrors.soilMoisture}</p>}
                  
                  {/* Enhanced Soil Moisture Analysis */}
                  {soilMoistureAnalysis && (
                    <Alert className={`mt-2 ${
                      soilMoistureAnalysis.color === 'red' ? 'bg-red-50 border-red-300' :
                      soilMoistureAnalysis.color === 'orange' ? 'bg-orange-50 border-orange-300' :
                      soilMoistureAnalysis.color === 'yellow' ? 'bg-yellow-50 border-yellow-300' :
                      'bg-green-50 border-green-300'
                    }`}>
                      {soilMoistureAnalysis.color === 'green' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className={`h-4 w-4 ${
                          soilMoistureAnalysis.color === 'red' ? 'text-red-600' :
                          soilMoistureAnalysis.color === 'orange' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                      )}
                      <AlertDescription className={`${
                        soilMoistureAnalysis.color === 'red' ? 'text-red-800' :
                        soilMoistureAnalysis.color === 'orange' ? 'text-orange-800' :
                        soilMoistureAnalysis.color === 'yellow' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        <div className="space-y-1">
                          <div><strong>{soilMoistureAnalysis.message}</strong></div>
                          <div className="text-sm">{soilMoistureAnalysis.recommendation}</div>
                          <div className="text-sm font-medium">Action: {soilMoistureAnalysis.action}</div>
                          {formData.cropType && (
                            <div className="text-xs">
                              Optimal range for {formData.cropType}: {crops.find(c => c.name === formData.cropType)?.soilMoisture}
                            </div>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-orange-700 font-medium">Soil Type</Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => setFormData({...formData, soilType: value})}
                  >
                    <SelectTrigger className="border-orange-300 focus:border-orange-500">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay - High water retention</SelectItem>
                      <SelectItem value="loamy">Loamy - Ideal drainage</SelectItem>
                      <SelectItem value="sandy">Sandy - Fast drainage</SelectItem>
                      <SelectItem value="silty">Silty - Moderate retention</SelectItem>
                      <SelectItem value="mixed">Mixed composition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-orange-700 font-medium">Irrigation System</Label>
                  <Select
                    value={formData.irrigationSystem}
                    onValueChange={(value) => setFormData({...formData, irrigationSystem: value})}
                  >
                    <SelectTrigger className="border-orange-300 focus:border-orange-500">
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation - 90% efficiency</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler System - 75% efficiency</SelectItem>
                      <SelectItem value="furrow">Furrow Irrigation - 60% efficiency</SelectItem>
                      <SelectItem value="center-pivot">Center Pivot - 85% efficiency</SelectItem>
                      <SelectItem value="micro-spray">Micro Spray - 80% efficiency</SelectItem>
                      <SelectItem value="flood">Flood Irrigation - 50% efficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-orange-700 font-medium">Water Source</Label>
                <Select
                  value={formData.waterSource}
                  onValueChange={(value) => setFormData({...formData, waterSource: value})}
                >
                  <SelectTrigger className="border-orange-300 focus:border-orange-500">
                    <SelectValue placeholder="Select primary water source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="municipal">Municipal Water Supply</SelectItem>
                    <SelectItem value="borehole">Borehole/Ground Water</SelectItem>
                    <SelectItem value="river">River/Stream</SelectItem>
                    <SelectItem value="dam">Farm Dam/Reservoir</SelectItem>
                    <SelectItem value="rainwater">Rainwater Harvesting</SelectItem>
                    <SelectItem value="mixed">Mixed Sources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-12 py-3 text-lg font-medium shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Setting up your smart irrigation system...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-3" />
                      Create My Smart Farm Dashboard
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}