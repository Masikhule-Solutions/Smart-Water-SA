import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { 
  Calculator, 
  Droplets, 
  DollarSign, 
  Leaf, 
  TrendingUp, 
  TrendingDown,
  Target,
  Award,
  RotateCcw,
  Save,
  Share2,
  Download,
  Lightbulb,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface WaterConservationCalculatorProps {
  farmData: any;
  currentUser: any;
  onSaveScenario?: (scenario: any) => void;
}

export default function WaterConservationCalculator({ farmData, currentUser, onSaveScenario }: WaterConservationCalculatorProps) {
  // Calculator state
  const [fieldSize, setFieldSize] = useState(parseFloat(farmData?.fieldSize) || 10);
  const [cropType, setCropType] = useState(farmData?.cropType || 'Maize');
  const [irrigationSystem, setIrrigationSystem] = useState(farmData?.irrigationSystem || 'drip');
  const [wateringFrequency, setWateringFrequency] = useState([3]); // times per week
  const [sessionDuration, setSessionDuration] = useState([45]); // minutes
  const [waterPressure, setWaterPressure] = useState([2.2]); // bar
  const [useSmartScheduling, setUseSmartScheduling] = useState(true);
  const [useRainwaterHarvesting, setUseRainwaterHarvesting] = useState(false);
  const [useMulching, setUseMulching] = useState(false);
  const [useDripIrrigation, setUseDripIrrigation] = useState(true);
  const [waterCostPerLiter, setWaterCostPerLiter] = useState(0.025); // R per liter
  
  // Results state
  const [calculations, setCalculations] = useState({
    weeklyWaterUsage: 0,
    monthlyWaterUsage: 0,
    yearlyWaterUsage: 0,
    weeklyCost: 0,
    monthlyCost: 0,
    yearlyCost: 0,
    conservationSavings: 0,
    carbonFootprintReduction: 0,
    efficiency: 0
  });
  
  const [comparisonData, setComparisonData] = useState([]);
  const [savingsBreakdown, setSavingsBreakdown] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Irrigation system efficiency rates
  const systemEfficiency = {
    'drip': 0.90,
    'sprinkler': 0.75,
    'center-pivot': 0.85,
    'furrow': 0.60,
    'micro-spray': 0.80
  };

  // Updated crop water requirements to include Onions
  const cropWaterNeeds = {
    'Maize': 25,
    'Wheat': 20,
    'Sunflower': 30,
    'Soybeans': 22,
    'Tomatoes': 35,
    'Potatoes': 28,
    'Citrus': 40,
    'Table Grapes': 32,
    'Onions': 18, // Added Onions instead of Watermelons
    'Carrots': 22,
    'Cabbage': 24
  };

  // Calculate water usage and costs
  const calculateWaterUsage = () => {
    const baseWaterNeed = cropWaterNeeds[cropType] || 25; // L/m²/week
    const fieldSizeM2 = fieldSize * 10000; // Convert hectares to m²
    const efficiency = systemEfficiency[irrigationSystem] || 0.75;
    
    // Base weekly usage
    let weeklyUsage = (baseWaterNeed * fieldSizeM2) / efficiency;
    
    // Apply conservation methods
    let conservationMultiplier = 1.0;
    
    if (useSmartScheduling) conservationMultiplier -= 0.20; // 20% reduction
    if (useRainwaterHarvesting) conservationMultiplier -= 0.15; // 15% reduction
    if (useMulching) conservationMultiplier -= 0.10; // 10% reduction
    if (useDripIrrigation && irrigationSystem !== 'drip') conservationMultiplier -= 0.25; // 25% reduction
    
    // Adjust for frequency and duration
    const frequencyMultiplier = wateringFrequency[0] / 3; // Baseline is 3 times per week
    const durationMultiplier = sessionDuration[0] / 45; // Baseline is 45 minutes
    
    weeklyUsage = weeklyUsage * conservationMultiplier * frequencyMultiplier * durationMultiplier;
    
    const monthlyUsage = weeklyUsage * 4.33;
    const yearlyUsage = weeklyUsage * 52;
    
    const weeklyCost = weeklyUsage * waterCostPerLiter;
    const monthlyCost = monthlyUsage * waterCostPerLiter;
    const yearlyCost = yearlyUsage * waterCostPerLiter;
    
    // Calculate baseline (traditional) usage for comparison
    const baselineWeeklyUsage = (baseWaterNeed * fieldSizeM2) / 0.60; // 60% efficiency for traditional
    const baselineYearlyCost = baselineWeeklyUsage * 52 * waterCostPerLiter;
    const conservationSavings = baselineYearlyCost - yearlyCost;
    
    // Calculate efficiency
    const efficiency_percent = (1 - (weeklyUsage / baselineWeeklyUsage)) * 100;
    
    // Carbon footprint reduction (approximate)
    const carbonReduction = (conservationSavings / waterCostPerLiter) * 0.0002; // kg CO2 per liter
    
    return {
      weeklyWaterUsage: weeklyUsage,
      monthlyWaterUsage: monthlyUsage,
      yearlyWaterUsage: yearlyUsage,
      weeklyCost,
      monthlyCost,
      yearlyCost,
      conservationSavings,
      carbonFootprintReduction: carbonReduction,
      efficiency: Math.max(0, efficiency_percent)
    };
  };

  // Generate recommendations based on current settings
  const generateRecommendations = (calculations) => {
    const recs = [];
    
    if (calculations.efficiency < 30) {
      recs.push({
        type: 'critical',
        title: 'Low Efficiency Alert',
        description: 'Your current setup has low water efficiency. Consider upgrading to drip irrigation.',
        potentialSaving: calculations.yearlyCost * 0.4,
        icon: AlertTriangle
      });
    }
    
    if (!useSmartScheduling) {
      recs.push({
        type: 'high',
        title: 'Enable Smart Scheduling',
        description: 'Smart scheduling can reduce water usage by up to 20% by optimizing irrigation timing.',
        potentialSaving: calculations.yearlyCost * 0.2,
        icon: Target
      });
    }
    
    if (!useRainwaterHarvesting) {
      recs.push({
        type: 'medium',
        title: 'Rainwater Harvesting',
        description: 'Capture and use rainwater to reduce dependency on municipal water supply.',
        potentialSaving: calculations.yearlyCost * 0.15,
        icon: Droplets
      });
    }
    
    if (wateringFrequency[0] > 4) {
      recs.push({
        type: 'medium',
        title: 'Reduce Irrigation Frequency',
        description: 'Consider reducing watering frequency and increasing duration for deeper root penetration.',
        potentialSaving: calculations.yearlyCost * 0.1,
        icon: TrendingDown
      });
    }
    
    if (calculations.efficiency > 50) {
      recs.push({
        type: 'success',
        title: 'Excellent Water Management',
        description: 'Your water conservation efforts are paying off! You\'re saving significant costs.',
        potentialSaving: calculations.conservationSavings,
        icon: Award
      });
    }
    
    return recs;
  };

  // Run calculations when inputs change
  useEffect(() => {
    setIsCalculating(true);
    
    const timer = setTimeout(() => {
      const newCalculations = calculateWaterUsage();
      setCalculations(newCalculations);
      
      // Generate comparison data with proper formatting
      const baseline = calculateWaterUsage();
      const traditional = {
        name: 'Traditional',
        usage: Math.round(baseline.yearlyWaterUsage * 1.67), // 67% more water
        cost: Math.round(baseline.yearlyCost * 1.67),
        efficiency: 35,
        label: 'Traditional Irrigation'
      };
      
      const current = {
        name: 'Current',
        usage: Math.round(baseline.yearlyWaterUsage),
        cost: Math.round(baseline.yearlyCost),
        efficiency: Math.round(baseline.efficiency),
        label: 'Your Current Setup'
      };
      
      const optimal = {
        name: 'Optimal',
        usage: Math.round(baseline.yearlyWaterUsage * 0.7), // 30% less water
        cost: Math.round(baseline.yearlyCost * 0.7),
        efficiency: 85,
        label: 'Optimal Configuration'
      };
      
      setComparisonData([traditional, current, optimal]);
      
      // Generate savings breakdown
      const breakdown = [
        { method: 'Smart Scheduling', saving: newCalculations.yearlyCost * 0.2, color: '#3B82F6' },
        { method: 'Drip Irrigation', saving: newCalculations.yearlyCost * 0.25, color: '#10B981' },
        { method: 'Rainwater Harvesting', saving: newCalculations.yearlyCost * 0.15, color: '#F59E0B' },
        { method: 'Mulching', saving: newCalculations.yearlyCost * 0.1, color: '#8B5CF6' }
      ].filter(item => item.saving > 0);
      
      setSavingsBreakdown(breakdown);
      
      // Generate recommendations
      setRecommendations(generateRecommendations(newCalculations));
      
      setIsCalculating(false);
      setShowResults(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [fieldSize, cropType, irrigationSystem, wateringFrequency, sessionDuration, waterPressure, 
      useSmartScheduling, useRainwaterHarvesting, useMulching, useDripIrrigation, waterCostPerLiter]);

  const handleReset = () => {
    setFieldSize(10);
    setCropType('Maize');
    setIrrigationSystem('drip');
    setWateringFrequency([3]);
    setSessionDuration([45]);
    setWaterPressure([2.2]);
    setUseSmartScheduling(true);
    setUseRainwaterHarvesting(false);
    setUseMulching(false);
    setUseDripIrrigation(true);
    setWaterCostPerLiter(0.025);
  };

  const handleSave = () => {
    const scenario = {
      id: Date.now(),
      name: `${cropType} - ${fieldSize}ha`,
      settings: {
        fieldSize, cropType, irrigationSystem, wateringFrequency: wateringFrequency[0],
        sessionDuration: sessionDuration[0], useSmartScheduling, useRainwaterHarvesting,
        useMulching, useDripIrrigation, waterCostPerLiter
      },
      results: calculations,
      createdAt: new Date().toISOString()
    };
    
    if (onSaveScenario) {
      onSaveScenario(scenario);
    }
    
    alert('Scenario saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header with Enhanced Reset/Save Buttons */}
      <Card className="shadow-lg border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Calculator className="w-6 h-6 mr-3" />
              Interactive Water Conservation Calculator
            </CardTitle>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleReset} 
                className="border-white/40 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm font-medium px-6 py-2 shadow-lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset Values
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleSave} 
                className="border-white/40 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm font-medium px-6 py-2 shadow-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Scenario
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Interactive water conservation calculator with smart agricultural technology"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/80 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-xl font-bold">Calculate Your Water Savings</h3>
                <p className="text-green-200">Interactive tool to optimize irrigation efficiency and reduce costs</p>
              </div>
            </div>
          </div>
          
          <Alert className="bg-blue-50 border-blue-300">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Adjust the settings below to see real-time calculations of water usage, costs, and potential savings.
              All calculations update automatically as you make changes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <Card className="shadow-lg border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Farm Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Field Size (hectares)</Label>
                  <Input
                    type="number"
                    value={fieldSize}
                    onChange={(e) => setFieldSize(parseFloat(e.target.value) || 0)}
                    min="0.1"
                    max="1000"
                    step="0.1"
                    className="border-orange-300 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Water Cost (R/Liter)</Label>
                  <Input
                    type="number"
                    value={waterCostPerLiter}
                    onChange={(e) => setWaterCostPerLiter(parseFloat(e.target.value) || 0.025)}
                    min="0.001"
                    max="1"
                    step="0.001"
                    className="border-orange-300 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Crop Type</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger className="border-orange-300 focus:border-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(cropWaterNeeds).map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Irrigation System</Label>
                  <Select value={irrigationSystem} onValueChange={setIrrigationSystem}>
                    <SelectTrigger className="border-orange-300 focus:border-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation (90% eff.)</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler (75% eff.)</SelectItem>
                      <SelectItem value="center-pivot">Center Pivot (85% eff.)</SelectItem>
                      <SelectItem value="furrow">Furrow (60% eff.)</SelectItem>
                      <SelectItem value="micro-spray">Micro Spray (80% eff.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Irrigation Frequency */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Watering Frequency</Label>
                <Badge className="bg-blue-100 text-blue-800">{wateringFrequency[0]} times/week</Badge>
              </div>
              <Slider
                value={wateringFrequency}
                onValueChange={setWateringFrequency}
                max={7}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Once/week</span>
                <span>Daily</span>
              </div>
            </div>

            {/* Session Duration */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Session Duration</Label>
                <Badge className="bg-green-100 text-green-800">{sessionDuration[0]} minutes</Badge>
              </div>
              <Slider
                value={sessionDuration}
                onValueChange={setSessionDuration}
                max={120}
                min={15}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>15 min</span>
                <span>2 hours</span>
              </div>
            </div>

            {/* Conservation Methods */}
            <div className="space-y-4">
              <Label className="text-lg font-medium">Conservation Methods</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Smart Scheduling</p>
                    <p className="text-sm text-blue-600">AI-optimized irrigation timing</p>
                  </div>
                  <Switch
                    checked={useSmartScheduling}
                    onCheckedChange={setUseSmartScheduling}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Rainwater Harvesting</p>
                    <p className="text-sm text-green-600">Capture and reuse rainfall</p>
                  </div>
                  <Switch
                    checked={useRainwaterHarvesting}
                    onCheckedChange={setUseRainwaterHarvesting}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800">Mulching</p>
                    <p className="text-sm text-yellow-600">Reduce evaporation with mulch</p>
                  </div>
                  <Switch
                    checked={useMulching}
                    onCheckedChange={setUseMulching}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="space-y-6">
          {/* Real-time Results */}
          <Card className={`shadow-lg transition-all duration-500 ${
            isCalculating ? 'border-yellow-300 bg-yellow-50' : 
            calculations.efficiency > 60 ? 'border-green-300 bg-green-50' : 
            'border-blue-300 bg-blue-50'
          }`}>
            <CardHeader className={`${
              isCalculating ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              calculations.efficiency > 60 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              'bg-gradient-to-r from-blue-500 to-indigo-500'
            } text-white rounded-t-lg`}>
              <CardTitle className="flex items-center">
                {isCalculating ? (
                  <>
                    <Calculator className="w-5 h-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Live Results
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {showResults && !isCalculating ? (
                <div className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-700">
                        {calculations.yearlyWaterUsage.toLocaleString()} L
                      </div>
                      <div className="text-sm text-blue-600">Annual Water Usage</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700">
                        R{calculations.yearlyCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Annual Water Cost</div>
                    </div>
                  </div>

                  {/* Efficiency Meter */}
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="flex items-center justify-center mb-2">
                      <Leaf className="w-6 h-6 text-green-600 mr-2" />
                      <span className="text-lg font-medium">Water Efficiency</span>
                    </div>
                    <div className={`text-4xl font-bold ${
                      calculations.efficiency > 60 ? 'text-green-600' :
                      calculations.efficiency > 30 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {calculations.efficiency.toFixed(1)}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          calculations.efficiency > 60 ? 'bg-green-500' :
                          calculations.efficiency > 30 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, calculations.efficiency)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  {calculations.conservationSavings > 0 && (
                    <div className="p-4 bg-green-100 rounded-lg border border-green-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Award className="w-6 h-6 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">Annual Savings</span>
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          R{calculations.conservationSavings.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        vs. traditional irrigation methods
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-500">Adjust settings to see calculations...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <Card className="shadow-lg border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      rec.type === 'critical' ? 'bg-red-50 border-red-300' :
                      rec.type === 'high' ? 'bg-orange-50 border-orange-300' :
                      rec.type === 'success' ? 'bg-green-50 border-green-300' :
                      'bg-blue-50 border-blue-300'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <rec.icon className={`w-5 h-5 mt-0.5 ${
                          rec.type === 'critical' ? 'text-red-600' :
                          rec.type === 'high' ? 'text-orange-600' :
                          rec.type === 'success' ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
                        <div className="flex-1">
                          <p className={`font-medium ${
                            rec.type === 'critical' ? 'text-red-800' :
                            rec.type === 'high' ? 'text-orange-800' :
                            rec.type === 'success' ? 'text-green-800' :
                            'text-blue-800'
                          }`}>
                            {rec.title}
                          </p>
                          <p className={`text-sm ${
                            rec.type === 'critical' ? 'text-red-600' :
                            rec.type === 'high' ? 'text-orange-600' :
                            rec.type === 'success' ? 'text-green-600' :
                            'text-blue-600'
                          }`}>
                            {rec.description}
                          </p>
                          {rec.potentialSaving > 0 && (
                            <p className={`text-sm font-medium mt-1 ${
                              rec.type === 'critical' ? 'text-red-700' :
                              rec.type === 'high' ? 'text-orange-700' :
                              rec.type === 'success' ? 'text-green-700' :
                              'text-blue-700'
                            }`}>
                              Potential savings: R{rec.potentialSaving.toLocaleString()}/year
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced Comparison Charts with Improved Alignment */}
      {showResults && comparisonData.length > 0 && (
        <Card className="shadow-lg border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Usage Comparison & Savings Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Usage Comparison Chart - Fixed Alignment */}
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Annual Water Usage Comparison</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fontSize: 11 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'usage' ? `${value.toLocaleString()} L` : `R${value.toLocaleString()}`,
                        name === 'usage' ? 'Water Usage (Liters)' : 'Annual Cost (Rands)'
                      ]}
                      labelFormatter={(label) => comparisonData.find(item => item.name === label)?.label || label}
                    />
                    <Bar 
                      dataKey="usage" 
                      fill="#3B82F6" 
                      name="usage"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                
                {/* Chart Legend */}
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span>Annual Water Usage (Liters)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Breakdown */}
              {savingsBreakdown.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-4">Conservation Savings Breakdown</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={savingsBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="saving"
                      >
                        {savingsBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`R${value.toLocaleString()}`, 'Annual Savings']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {savingsBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.method}</span>
                        <span className="text-sm font-medium text-gray-800">
                          R{item.saving.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}