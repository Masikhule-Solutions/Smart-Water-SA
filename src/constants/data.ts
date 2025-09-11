import { Droplets, Gauge, CloudRain, Leaf } from 'lucide-react';

// Enhanced South African locations with water scarcity data
export const southAfricanLocations = [
  { 
    province: 'Western Cape', 
    cities: ['Cape Town', 'Stellenbosch', 'Paarl', 'Wellington', 'Worcester', 'George'],
    waterStatus: 'High Risk',
    waterCost: '0.025'
  },
  { 
    province: 'Gauteng', 
    cities: ['Johannesburg', 'Pretoria', 'Boksburg', 'Germiston', 'Benoni'],
    waterStatus: 'Medium Risk',
    waterCost: '0.022'
  },
  { 
    province: 'KwaZulu-Natal', 
    cities: ['Durban', 'Pietermaritzburg', 'Newcastle', 'Ladysmith', 'Estcourt'],
    waterStatus: 'Medium Risk',
    waterCost: '0.020'
  },
  { 
    province: 'Eastern Cape', 
    cities: ['Port Elizabeth', 'East London', 'Grahamstown', 'Uitenhage', 'King Williams Town'],
    waterStatus: 'High Risk',
    waterCost: '0.028'
  },
  { 
    province: 'Free State', 
    cities: ['Bloemfontein', 'Welkom', 'Kroonstad', 'Bethlehem', 'Sasolburg'],
    waterStatus: 'Low Risk',
    waterCost: '0.018'
  },
  { 
    province: 'Limpopo', 
    cities: ['Polokwane', 'Tzaneen', 'Thohoyandou', 'Giyani', 'Musina'],
    waterStatus: 'Medium Risk',
    waterCost: '0.024'
  },
  { 
    province: 'Mpumalanga', 
    cities: ['Nelspruit', 'Witbank', 'Secunda', 'Standerton', 'Ermelo'],
    waterStatus: 'Low Risk',
    waterCost: '0.019'
  },
  { 
    province: 'North West', 
    cities: ['Mahikeng', 'Rustenburg', 'Klerksdorp', 'Potchefstroom', 'Brits'],
    waterStatus: 'Medium Risk',
    waterCost: '0.021'
  },
  { 
    province: 'Northern Cape', 
    cities: ['Kimberley', 'Upington', 'Springbok', 'De Aar', 'Kuruman'],
    waterStatus: 'High Risk',
    waterCost: '0.030'
  }
];

// Comprehensive crop data for South Africa with optimal irrigation times and disease susceptibility
export const crops = [
  // Grains
  { 
    name: 'Maize', 
    category: 'Grains', 
    waterReq: 450, 
    growthStages: ['Germination', 'Vegetative', 'Tasseling', 'Grain Fill', 'Maturity'], 
    soilMoisture: '60-80%',
    optimalIrrigationTimes: ['6:00 AM', '6:30 PM'],
    criticalStages: ['Tasseling', 'Grain Fill'],
    diseaseRisk: ['Leaf Blight', 'Rust', 'Stalk Rot']
  },
  { 
    name: 'Wheat', 
    category: 'Grains', 
    waterReq: 380, 
    growthStages: ['Germination', 'Tillering', 'Stem Extension', 'Flowering', 'Grain Fill'], 
    soilMoisture: '55-75%',
    optimalIrrigationTimes: ['5:30 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Grain Fill'],
    diseaseRisk: ['Rust', 'Powdery Mildew', 'Fusarium Head Blight']
  },
  { 
    name: 'Barley', 
    category: 'Grains', 
    waterReq: 350, 
    growthStages: ['Germination', 'Tillering', 'Stem Extension', 'Flowering', 'Grain Fill'], 
    soilMoisture: '50-70%',
    optimalIrrigationTimes: ['6:00 AM', '7:30 PM'],
    criticalStages: ['Stem Extension', 'Grain Fill'],
    diseaseRisk: ['Rust', 'Scald', 'Net Blotch']
  },
  { 
    name: 'Sorghum', 
    category: 'Grains', 
    waterReq: 300, 
    growthStages: ['Germination', 'Vegetative', 'Panicle Development', 'Flowering', 'Grain Fill'], 
    soilMoisture: '45-65%',
    optimalIrrigationTimes: ['5:45 AM', '6:45 PM'],
    criticalStages: ['Panicle Development', 'Flowering'],
    diseaseRisk: ['Anthracnose', 'Downy Mildew', 'Rust']
  },
  { 
    name: 'Rice', 
    category: 'Grains', 
    waterReq: 650, 
    growthStages: ['Germination', 'Tillering', 'Panicle Initiation', 'Flowering', 'Grain Fill'], 
    soilMoisture: '85-95%',
    optimalIrrigationTimes: ['5:00 AM', '8:00 PM'],
    criticalStages: ['Panicle Initiation', 'Flowering'],
    diseaseRisk: ['Blast', 'Bacterial Leaf Blight', 'Sheath Blight']
  },
  { 
    name: 'Oats', 
    category: 'Grains', 
    waterReq: 320, 
    growthStages: ['Germination', 'Tillering', 'Stem Extension', 'Flowering', 'Grain Fill'], 
    soilMoisture: '55-70%',
    optimalIrrigationTimes: ['6:15 AM', '7:15 PM'],
    criticalStages: ['Flowering', 'Grain Fill'],
    diseaseRisk: ['Crown Rust', 'Stem Rust', 'Powdery Mildew']
  },
  
  // Oilseeds
  { 
    name: 'Sunflower', 
    category: 'Oilseeds', 
    waterReq: 400, 
    growthStages: ['Germination', 'Vegetative', 'Bud Formation', 'Flowering', 'Seed Fill'], 
    soilMoisture: '55-75%',
    optimalIrrigationTimes: ['6:15 AM', '6:15 PM'],
    criticalStages: ['Bud Formation', 'Flowering'],
    diseaseRisk: ['Downy Mildew', 'Rust', 'Sclerotinia']
  },
  { 
    name: 'Soybeans', 
    category: 'Oilseeds', 
    waterReq: 425, 
    growthStages: ['Germination', 'Vegetative', 'Flowering', 'Pod Fill', 'Maturity'], 
    soilMoisture: '60-80%',
    optimalIrrigationTimes: ['6:00 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Pod Fill'],
    diseaseRisk: ['Rust', 'Frogeye Leaf Spot', 'Bacterial Blight']
  },
  { 
    name: 'Groundnuts', 
    category: 'Oilseeds', 
    waterReq: 375, 
    growthStages: ['Germination', 'Vegetative', 'Flowering', 'Pegging', 'Pod Fill'], 
    soilMoisture: '55-75%',
    optimalIrrigationTimes: ['5:30 AM', '7:30 PM'],
    criticalStages: ['Pegging', 'Pod Fill'],
    diseaseRisk: ['Leaf Spot', 'Rust', 'Rosette Virus']
  },
  { 
    name: 'Canola', 
    category: 'Oilseeds', 
    waterReq: 380, 
    growthStages: ['Germination', 'Rosette', 'Stem Extension', 'Flowering', 'Pod Fill'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['6:00 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Pod Fill'],
    diseaseRisk: ['Blackleg', 'Sclerotinia', 'Downy Mildew']
  },
  
  // Fruits
  { 
    name: 'Citrus', 
    category: 'Fruits', 
    waterReq: 800, 
    growthStages: ['Dormant', 'Bud Break', 'Flowering', 'Fruit Set', 'Fruit Development'], 
    soilMoisture: '70-90%',
    optimalIrrigationTimes: ['5:00 AM', '8:00 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Citrus Canker', 'Greening Disease', 'Black Spot']
  },
  { 
    name: 'Table Grapes', 
    category: 'Fruits', 
    waterReq: 600, 
    growthStages: ['Dormant', 'Bud Break', 'Flowering', 'Fruit Set', 'Veraison'], 
    soilMoisture: '65-85%',
    optimalIrrigationTimes: ['5:30 AM', '7:45 PM'],
    criticalStages: ['Fruit Set', 'Veraison'],
    diseaseRisk: ['Downy Mildew', 'Powdery Mildew', 'Botrytis']
  },
  { 
    name: 'Apples', 
    category: 'Fruits', 
    waterReq: 650, 
    growthStages: ['Dormant', 'Bud Break', 'Flowering', 'Fruit Set', 'Fruit Development'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['5:30 AM', '7:30 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Fire Blight', 'Apple Scab', 'Powdery Mildew']
  },
  { 
    name: 'Pears', 
    category: 'Fruits', 
    waterReq: 620, 
    growthStages: ['Dormant', 'Bud Break', 'Flowering', 'Fruit Set', 'Fruit Development'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['5:45 AM', '7:15 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Fire Blight', 'Pear Scab', 'Rust']
  },
  { 
    name: 'Stone Fruits', 
    category: 'Fruits', 
    waterReq: 580, 
    growthStages: ['Dormant', 'Bud Break', 'Flowering', 'Fruit Set', 'Fruit Development'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['5:30 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Brown Rot', 'Bacterial Spot', 'Leaf Curl']
  },
  { 
    name: 'Avocados', 
    category: 'Fruits', 
    waterReq: 750, 
    growthStages: ['Dormant', 'Flowering', 'Fruit Set', 'Fruit Development', 'Harvest'], 
    soilMoisture: '75-90%',
    optimalIrrigationTimes: ['5:00 AM', '8:00 PM'],
    criticalStages: ['Fruit Set', 'Fruit Development'],
    diseaseRisk: ['Root Rot', 'Anthracnose', 'Scab']
  },
  { 
    name: 'Bananas', 
    category: 'Fruits', 
    waterReq: 900, 
    growthStages: ['Planting', 'Vegetative', 'Flowering', 'Fruit Development', 'Harvest'], 
    soilMoisture: '80-95%',
    optimalIrrigationTimes: ['5:00 AM', '8:30 PM'],
    criticalStages: ['Flowering', 'Fruit Development'],
    diseaseRisk: ['Black Sigatoka', 'Panama Disease', 'Crown Rot']
  },
  { 
    name: 'Mangoes', 
    category: 'Fruits', 
    waterReq: 700, 
    growthStages: ['Dormant', 'Flowering', 'Fruit Set', 'Fruit Development', 'Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['5:30 AM', '7:30 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Anthracnose', 'Powdery Mildew', 'Bacterial Black Spot']
  },
  { 
    name: 'Litchis', 
    category: 'Fruits', 
    waterReq: 720, 
    growthStages: ['Dormant', 'Flowering', 'Fruit Set', 'Fruit Development', 'Harvest'], 
    soilMoisture: '75-90%',
    optimalIrrigationTimes: ['5:00 AM', '8:00 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Anthracnose', 'Downy Mildew', 'Fruit Rot']
  },
  { 
    name: 'Macadamias', 
    category: 'Fruits', 
    waterReq: 680, 
    growthStages: ['Dormant', 'Flowering', 'Nut Set', 'Nut Development', 'Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['5:30 AM', '7:45 PM'],
    criticalStages: ['Flowering', 'Nut Set'],
    diseaseRisk: ['Husk Spot', 'Anthracnose', 'Phytophthora']
  },
  
  // Vegetables
  { 
    name: 'Potatoes', 
    category: 'Vegetables', 
    waterReq: 350, 
    growthStages: ['Planting', 'Emergence', 'Tuber Initiation', 'Tuber Bulking', 'Maturity'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['6:00 AM', '6:30 PM'],
    criticalStages: ['Tuber Initiation', 'Tuber Bulking'],
    diseaseRisk: ['Late Blight', 'Early Blight', 'Common Scab']
  },
  { 
    name: 'Sweet Potato', 
    category: 'Vegetables', 
    waterReq: 320, 
    growthStages: ['Planting', 'Root Development', 'Vine Growth', 'Tuber Formation', 'Maturity'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['6:15 AM', '6:45 PM'],
    criticalStages: ['Root Development', 'Tuber Formation'],
    diseaseRisk: ['Black Rot', 'Fusarium Wilt', 'Sweet Potato Weevil']
  },
  { 
    name: 'Tomatoes', 
    category: 'Vegetables', 
    waterReq: 450, 
    growthStages: ['Seedling', 'Vegetative', 'Flowering', 'Fruit Set', 'Ripening'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Early Blight', 'Late Blight', 'Bacterial Wilt']
  },
  { 
    name: 'Onions', 
    category: 'Vegetables', 
    waterReq: 300, 
    growthStages: ['Germination', 'Vegetative', 'Bulb Initiation', 'Bulb Development', 'Maturity'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['5:30 AM', '7:30 PM'],
    criticalStages: ['Bulb Initiation', 'Bulb Development'],
    diseaseRisk: ['Downy Mildew', 'Purple Blotch', 'White Rot']
  },
  { 
    name: 'Carrots', 
    category: 'Vegetables', 
    waterReq: 280, 
    growthStages: ['Germination', 'Leaf Development', 'Root Development', 'Root Expansion', 'Maturity'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['6:00 AM', '6:00 PM'],
    criticalStages: ['Root Development', 'Root Expansion'],
    diseaseRisk: ['Leaf Blight', 'Black Rot', 'Cavity Spot']
  },
  { 
    name: 'Cabbage', 
    category: 'Vegetables', 
    waterReq: 320, 
    growthStages: ['Seedling', 'Vegetative', 'Head Formation', 'Head Development', 'Maturity'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['5:45 AM', '6:45 PM'],
    criticalStages: ['Head Formation', 'Head Development'],
    diseaseRisk: ['Black Rot', 'Clubroot', 'Downy Mildew']
  },
  { 
    name: 'Lettuce', 
    category: 'Vegetables', 
    waterReq: 200, 
    growthStages: ['Germination', 'Rosette', 'Head Formation', 'Head Development', 'Harvest'], 
    soilMoisture: '75-90%',
    optimalIrrigationTimes: ['6:30 AM', '6:00 PM'],
    criticalStages: ['Head Formation', 'Head Development'],
    diseaseRisk: ['Downy Mildew', 'Lettuce Drop', 'Tip Burn']
  },
  { 
    name: 'Spinach', 
    category: 'Vegetables', 
    waterReq: 180, 
    growthStages: ['Germination', 'Rosette', 'Leaf Development', 'Bolting', 'Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '5:30 PM'],
    criticalStages: ['Leaf Development', 'Pre-Bolting'],
    diseaseRisk: ['Downy Mildew', 'White Rust', 'Leaf Spot']
  },
  { 
    name: 'Green Beans', 
    category: 'Vegetables', 
    waterReq: 250, 
    growthStages: ['Germination', 'Vegetative', 'Flowering', 'Pod Development', 'Harvest'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['6:15 AM', '6:30 PM'],
    criticalStages: ['Flowering', 'Pod Development'],
    diseaseRisk: ['Rust', 'Bacterial Blight', 'Anthracnose']
  },
  { 
    name: 'Peas', 
    category: 'Vegetables', 
    waterReq: 220, 
    growthStages: ['Germination', 'Vegetative', 'Flowering', 'Pod Fill', 'Harvest'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['6:00 AM', '6:15 PM'],
    criticalStages: ['Flowering', 'Pod Fill'],
    diseaseRisk: ['Powdery Mildew', 'Ascochyta Blight', 'Root Rot']
  },
  { 
    name: 'Butternut Squash', 
    category: 'Vegetables', 
    waterReq: 400, 
    growthStages: ['Germination', 'Vine Development', 'Flowering', 'Fruit Set', 'Maturity'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['5:45 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Powdery Mildew', 'Downy Mildew', 'Bacterial Wilt']
  },
  { 
    name: 'Peppers', 
    category: 'Vegetables', 
    waterReq: 380, 
    growthStages: ['Seedling', 'Vegetative', 'Flowering', 'Fruit Set', 'Fruit Development'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '7:00 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Bacterial Spot', 'Phytophthora', 'Virus Diseases']
  },
  { 
    name: 'Eggplant', 
    category: 'Vegetables', 
    waterReq: 420, 
    growthStages: ['Seedling', 'Vegetative', 'Flowering', 'Fruit Set', 'Fruit Development'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '7:30 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Verticillium Wilt', 'Bacterial Wilt', 'Phomopsis Blight']
  },
  { 
    name: 'Cucumbers', 
    category: 'Vegetables', 
    waterReq: 350, 
    growthStages: ['Germination', 'Vine Development', 'Flowering', 'Fruit Set', 'Harvest'], 
    soilMoisture: '75-90%',
    optimalIrrigationTimes: ['6:00 AM', '6:30 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Downy Mildew', 'Powdery Mildew', 'Bacterial Wilt']
  },
  { 
    name: 'Zucchini', 
    category: 'Vegetables', 
    waterReq: 320, 
    growthStages: ['Germination', 'Vine Development', 'Flowering', 'Fruit Set', 'Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:15 AM', '6:45 PM'],
    criticalStages: ['Flowering', 'Fruit Set'],
    diseaseRisk: ['Powdery Mildew', 'Bacterial Wilt', 'Virus Diseases']
  },
  { 
    name: 'Broccoli', 
    category: 'Vegetables', 
    waterReq: 300, 
    growthStages: ['Seedling', 'Vegetative', 'Head Initiation', 'Head Development', 'Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '6:00 PM'],
    criticalStages: ['Head Initiation', 'Head Development'],
    diseaseRisk: ['Black Rot', 'Clubroot', 'Downy Mildew']
  },
  { 
    name: 'Cauliflower', 
    category: 'Vegetables', 
    waterReq: 310, 
    growthStages: ['Seedling', 'Vegetative', 'Curd Initiation', 'Curd Development', 'Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '6:15 PM'],
    criticalStages: ['Curd Initiation', 'Curd Development'],
    diseaseRisk: ['Black Rot', 'Clubroot', 'Downy Mildew']
  },
  { 
    name: 'Beetroot', 
    category: 'Vegetables', 
    waterReq: 260, 
    growthStages: ['Germination', 'Leaf Development', 'Root Development', 'Root Expansion', 'Maturity'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['6:00 AM', '6:30 PM'],
    criticalStages: ['Root Development', 'Root Expansion'],
    diseaseRisk: ['Leaf Spot', 'Root Rot', 'Downy Mildew']
  },
  { 
    name: 'Turnips', 
    category: 'Vegetables', 
    waterReq: 240, 
    growthStages: ['Germination', 'Leaf Development', 'Root Development', 'Root Expansion', 'Maturity'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['6:15 AM', '6:00 PM'],
    criticalStages: ['Root Development', 'Root Expansion'],
    diseaseRisk: ['Clubroot', 'Black Rot', 'Turnip Mosaic Virus']
  },
  { 
    name: 'Radishes', 
    category: 'Vegetables', 
    waterReq: 150, 
    growthStages: ['Germination', 'Leaf Development', 'Root Development', 'Root Expansion', 'Maturity'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['6:30 AM', '5:30 PM'],
    criticalStages: ['Root Development', 'Root Expansion'],
    diseaseRisk: ['Black Root', 'Clubroot', 'Flea Beetle Damage']
  },
  { 
    name: 'Swiss Chard', 
    category: 'Vegetables', 
    waterReq: 200, 
    growthStages: ['Germination', 'Leaf Development', 'Continuous Harvest', 'Regrowth', 'Final Harvest'], 
    soilMoisture: '70-85%',
    optimalIrrigationTimes: ['6:00 AM', '6:00 PM'],
    criticalStages: ['Leaf Development', 'Continuous Harvest'],
    diseaseRisk: ['Leaf Spot', 'Downy Mildew', 'Powdery Mildew']
  },
  
  // Forage
  { 
    name: 'Lucerne', 
    category: 'Forage', 
    waterReq: 500, 
    growthStages: ['Establishment', 'Vegetative', 'Budding', 'Flowering', 'Recovery'], 
    soilMoisture: '60-80%',
    optimalIrrigationTimes: ['5:30 AM', '7:30 PM'],
    criticalStages: ['Establishment', 'Pre-Flowering'],
    diseaseRisk: ['Bacterial Wilt', 'Anthracnose', 'Leaf Spot']
  },
  { 
    name: 'Pasture Grass', 
    category: 'Forage', 
    waterReq: 400, 
    growthStages: ['Establishment', 'Tillering', 'Stem Extension', 'Flowering', 'Recovery'], 
    soilMoisture: '55-75%',
    optimalIrrigationTimes: ['6:00 AM', '7:00 PM'],
    criticalStages: ['Establishment', 'Tillering'],
    diseaseRisk: ['Rust', 'Leaf Spot', 'Crown Rot']
  },
  { 
    name: 'Ryegrass', 
    category: 'Forage', 
    waterReq: 380, 
    growthStages: ['Establishment', 'Tillering', 'Stem Extension', 'Seed Head', 'Recovery'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['6:00 AM', '6:30 PM'],
    criticalStages: ['Establishment', 'Tillering'],
    diseaseRisk: ['Crown Rust', 'Bacterial Wilt', 'Fungal Leaf Spot']
  },
  { 
    name: 'Kikuyu Grass', 
    category: 'Forage', 
    waterReq: 350, 
    growthStages: ['Establishment', 'Vegetative Growth', 'Spreading', 'Maturity', 'Dormancy'], 
    soilMoisture: '55-70%',
    optimalIrrigationTimes: ['6:15 AM', '6:45 PM'],
    criticalStages: ['Establishment', 'Vegetative Growth'],
    diseaseRisk: ['Spring Dead Spot', 'Leaf Rust', 'Nematodes']
  },
  { 
    name: 'Clover', 
    category: 'Forage', 
    waterReq: 420, 
    growthStages: ['Establishment', 'Vegetative', 'Flowering', 'Seed Set', 'Recovery'], 
    soilMoisture: '65-80%',
    optimalIrrigationTimes: ['6:00 AM', '7:00 PM'],
    criticalStages: ['Establishment', 'Pre-Flowering'],
    diseaseRisk: ['Clover Rot', 'Virus Diseases', 'Fungal Leaf Spot']
  },
  { 
    name: 'Vetch', 
    category: 'Forage', 
    waterReq: 300, 
    growthStages: ['Establishment', 'Vegetative', 'Flowering', 'Pod Fill', 'Maturity'], 
    soilMoisture: '55-70%',
    optimalIrrigationTimes: ['6:30 AM', '6:30 PM'],
    criticalStages: ['Establishment', 'Flowering'],
    diseaseRisk: ['Root Rot', 'Rust', 'Virus Diseases']
  },
  { 
    name: 'Oat Hay', 
    category: 'Forage', 
    waterReq: 310, 
    growthStages: ['Establishment', 'Tillering', 'Stem Extension', 'Heading', 'Harvest'], 
    soilMoisture: '60-75%',
    optimalIrrigationTimes: ['6:00 AM', '6:45 PM'],
    criticalStages: ['Establishment', 'Stem Extension'],
    diseaseRisk: ['Crown Rust', 'Leaf Blight', 'Barley Yellow Dwarf']
  },
  { 
    name: 'Teff Grass', 
    category: 'Forage', 
    waterReq: 280, 
    growthStages: ['Establishment', 'Tillering', 'Stem Extension', 'Seed Head', 'Harvest'], 
    soilMoisture: '50-65%',
    optimalIrrigationTimes: ['6:15 AM', '6:15 PM'],
    criticalStages: ['Establishment', 'Tillering'],
    diseaseRisk: ['Rust', 'Leaf Spot', 'Head Smut']
  }
];

// Enhanced weather data with 14-day detailed forecast
export const extendedWeatherData = [
  { 
    day: 'Mon', 
    date: '5 Aug',
    temp: 24, 
    tempMin: 16,
    tempMax: 28,
    humidity: 65, 
    precipitation: 0,
    windSpeed: 12,
    windDirection: 'SE',
    uvIndex: 7,
    soilTemp: 19,
    evapotranspiration: 4.2,
    irrigationRecommendation: 'High Priority',
    optimalTimes: ['6:00 AM', '6:30 PM'],
    diseaseRisk: 'Low'
  },
  { 
    day: 'Tue', 
    date: '6 Aug',
    temp: 26, 
    tempMin: 18,
    tempMax: 30,
    humidity: 70, 
    precipitation: 2,
    windSpeed: 8,
    windDirection: 'SW',
    uvIndex: 6,
    soilTemp: 21,
    evapotranspiration: 3.8,
    irrigationRecommendation: 'Medium Priority',
    optimalTimes: ['6:15 AM', '7:00 PM'],
    diseaseRisk: 'Medium'
  },
  { 
    day: 'Wed', 
    date: '7 Aug',
    temp: 22, 
    tempMin: 15,
    tempMax: 25,
    humidity: 80, 
    precipitation: 8,
    windSpeed: 15,
    windDirection: 'NW',
    uvIndex: 4,
    soilTemp: 18,
    evapotranspiration: 2.1,
    irrigationRecommendation: 'Low Priority',
    optimalTimes: ['7:00 AM', '6:00 PM'],
    diseaseRisk: 'High'
  },
  { 
    day: 'Thu', 
    date: '8 Aug',
    temp: 25, 
    tempMin: 17,
    tempMax: 29,
    humidity: 60, 
    precipitation: 0,
    windSpeed: 10,
    windDirection: 'E',
    uvIndex: 8,
    soilTemp: 20,
    evapotranspiration: 4.5,
    irrigationRecommendation: 'High Priority',
    optimalTimes: ['5:45 AM', '6:45 PM'],
    diseaseRisk: 'Low'
  },
  { 
    day: 'Fri', 
    date: '9 Aug',
    temp: 27, 
    tempMin: 19,
    tempMax: 32,
    humidity: 55, 
    precipitation: 0,
    windSpeed: 6,
    windDirection: 'SE',
    uvIndex: 9,
    soilTemp: 23,
    evapotranspiration: 5.1,
    irrigationRecommendation: 'Critical',
    optimalTimes: ['5:30 AM', '7:15 PM'],
    diseaseRisk: 'Low'
  },
  { 
    day: 'Sat', 
    date: '10 Aug',
    temp: 23, 
    tempMin: 16,
    tempMax: 27,
    humidity: 75, 
    precipitation: 5,
    windSpeed: 12,
    windDirection: 'SW',
    uvIndex: 5,
    soilTemp: 19,
    evapotranspiration: 3.2,
    irrigationRecommendation: 'Low Priority',
    optimalTimes: ['6:30 AM', '6:30 PM'],
    diseaseRisk: 'Medium'
  },
  { 
    day: 'Sun', 
    date: '11 Aug',
    temp: 25, 
    tempMin: 18,
    tempMax: 29,
    humidity: 65, 
    precipitation: 1,
    windSpeed: 9,
    windDirection: 'NE',
    uvIndex: 7,
    soilTemp: 21,
    evapotranspiration: 3.9,
    irrigationRecommendation: 'Medium Priority',
    optimalTimes: ['6:00 AM', '7:00 PM'],
    diseaseRisk: 'Low'
  },
  // Extended 7 more days
  { 
    day: 'Mon', 
    date: '12 Aug',
    temp: 26, 
    tempMin: 19,
    tempMax: 31,
    humidity: 58, 
    precipitation: 0,
    windSpeed: 11,
    windDirection: 'SE',
    uvIndex: 8,
    soilTemp: 22,
    evapotranspiration: 4.7,
    irrigationRecommendation: 'High Priority',
    optimalTimes: ['5:45 AM', '6:45 PM'],
    diseaseRisk: 'Low'
  },
  { 
    day: 'Tue', 
    date: '13 Aug',
    temp: 24, 
    tempMin: 17,
    tempMax: 28,
    humidity: 72, 
    precipitation: 3,
    windSpeed: 7,
    windDirection: 'W',
    uvIndex: 6,
    soilTemp: 20,
    evapotranspiration: 3.4,
    irrigationRecommendation: 'Medium Priority',
    optimalTimes: ['6:15 AM', '6:15 PM'],
    diseaseRisk: 'Medium'
  },
  { 
    day: 'Wed', 
    date: '14 Aug',
    temp: 28, 
    tempMin: 20,
    tempMax: 33,
    humidity: 52, 
    precipitation: 0,
    windSpeed: 5,
    windDirection: 'NE',
    uvIndex: 9,
    soilTemp: 24,
    evapotranspiration: 5.3,
    irrigationRecommendation: 'Critical',
    optimalTimes: ['5:30 AM', '7:30 PM'],
    diseaseRisk: 'Low'
  },
  { 
    day: 'Thu', 
    date: '15 Aug',
    temp: 21, 
    tempMin: 14,
    tempMax: 24,
    humidity: 85, 
    precipitation: 12,
    windSpeed: 18,
    windDirection: 'SW',
    uvIndex: 3,
    soilTemp: 17,
    evapotranspiration: 1.8,
    irrigationRecommendation: 'Not Needed',
    optimalTimes: ['7:30 AM', '5:30 PM'],
    diseaseRisk: 'High'
  },
  { 
    day: 'Fri', 
    date: '16 Aug',
    temp: 23, 
    tempMin: 16,
    tempMax: 26,
    humidity: 78, 
    precipitation: 4,
    windSpeed: 13,
    windDirection: 'NW',
    uvIndex: 5,
    soilTemp: 18,
    evapotranspiration: 2.9,
    irrigationRecommendation: 'Low Priority',
    optimalTimes: ['6:45 AM', '6:00 PM'],
    diseaseRisk: 'Medium'
  },
  { 
    day: 'Sat', 
    date: '17 Aug',
    temp: 25, 
    tempMin: 18,
    tempMax: 29,
    humidity: 63, 
    precipitation: 0,
    windSpeed: 9,
    windDirection: 'E',
    uvIndex: 7,
    soilTemp: 21,
    evapotranspiration: 4.1,
    irrigationRecommendation: 'High Priority',
    optimalTimes: ['6:00 AM', '6:30 PM'],
    diseaseRisk: 'Low'
  },
  { 
    day: 'Sun', 
    date: '18 Aug',
    temp: 27, 
    tempMin: 19,
    tempMax: 31,
    humidity: 59, 
    precipitation: 0,
    windSpeed: 8,
    windDirection: 'SE',
    uvIndex: 8,
    soilTemp: 22,
    evapotranspiration: 4.6,
    irrigationRecommendation: 'High Priority',
    optimalTimes: ['5:45 AM', '7:00 PM'],
    diseaseRisk: 'Low'
  }
];

// Impact metrics data with water scarcity focus
export const impactData = [
  { metric: 'Water Savings', current: 18, target: 20, unit: '%', color: '#10B981' },
  { metric: 'Yield Increase', current: 12, target: 15, unit: '%', color: '#F59E0B' },
  { metric: 'Cost Reduction', current: 13, target: 15, unit: '%', color: '#EF4444' },
  { metric: 'Conservation Score', current: 87, target: 95, unit: '/100', color: '#8B5CF6' }
];

// Water scarcity conservation tips
export const conservationTips = [
  {
    title: 'Drip Irrigation Optimization',
    description: 'Switch to precision drip systems to reduce water usage by up to 30%',
    savings: 'R3,500/month',
    icon: Droplets
  },
  {
    title: 'Soil Moisture Monitoring',
    description: 'Use smart sensors to prevent over-watering and reduce waste',
    savings: 'R1,200/month',
    icon: Gauge
  },
  {
    title: 'Rainwater Harvesting',
    description: 'Collect and store rainwater during wet seasons for drought periods',
    savings: 'R2,800/season',
    icon: CloudRain
  },
  {
    title: 'Mulching & Cover Crops',
    description: 'Reduce evaporation and maintain soil moisture naturally',
    savings: 'R800/month',
    icon: Leaf
  }
];

// Detailed irrigation schedule with times
export const detailedSchedule = [
  {
    date: '2025-08-06',
    time: '06:00',
    duration: 45,
    volume: 1250,
    zone: 'Section A (North)',
    priority: 'High',
    reason: 'Fruit Set stage - critical watering period',
    weather: 'Clear, high evapotranspiration expected',
    soilMoisture: 68,
    type: 'irrigation'
  },
  {
    date: '2025-08-06',
    time: '19:00',
    duration: 30,
    volume: 850,
    zone: 'Section B (South)',
    priority: 'Medium',
    reason: 'Evening supplemental irrigation',
    weather: 'Cool evening, reduced evaporation',
    soilMoisture: 72,
    type: 'irrigation'
  },
  {
    date: '2025-08-07',
    time: '08:00',
    duration: 15,
    volume: 0,
    zone: 'All Sections',
    priority: 'Medium',
    reason: 'Soil moisture and system check',
    weather: 'Overcast conditions',
    soilMoisture: 75,
    type: 'maintenance'
  },
  {
    date: '2025-08-08',
    time: '05:45',
    duration: 50,
    volume: 1400,
    zone: 'Section A (North)',
    priority: 'Critical',
    reason: 'High evapotranspiration forecast',
    weather: 'Hot and dry conditions expected',
    soilMoisture: 64,
    type: 'irrigation'
  },
  {
    date: '2025-08-09',
    time: '06:15',
    duration: 55,
    volume: 1550,
    zone: 'Section C (East)',
    priority: 'Critical',
    reason: 'Peak water demand period',
    weather: 'Very hot, low humidity',
    soilMoisture: 61,
    type: 'irrigation'
  }
];

// IoT Sensor Integration Data
export const iotSensorData = [
  {
    sensorId: 'SMS001',
    location: 'Section A - North Field',
    type: 'Soil Moisture',
    currentValue: 68,
    batteryLevel: 87,
    lastUpdate: '2 minutes ago',
    status: 'Active',
    trend: 'Decreasing'
  },
  {
    sensorId: 'SMS002',
    location: 'Section B - South Field',
    type: 'Soil Moisture',
    currentValue: 72,
    batteryLevel: 94,
    lastUpdate: '1 minute ago',
    status: 'Active',
    trend: 'Stable'
  },
  {
    sensorId: 'TS001',
    location: 'Weather Station',
    type: 'Temperature',
    currentValue: 24,
    batteryLevel: 76,
    lastUpdate: '30 seconds ago',
    status: 'Active',
    trend: 'Increasing'
  },
  {
    sensorId: 'WS001',
    location: 'Central Station',
    type: 'Wind Speed',
    currentValue: 12,
    batteryLevel: 82,
    lastUpdate: '45 seconds ago',
    status: 'Active',
    trend: 'Stable'
  }
];

// Disease Risk Factors based on weather patterns
export const diseaseRiskFactors = {
  'High': {
    conditions: 'High humidity (>75%) + Moderate temperatures (18-25°C) + Low wind',
    riskLevel: 'Critical',
    recommendations: [
      'Increase air circulation around plants',
      'Reduce irrigation frequency but maintain soil moisture',
      'Apply preventive fungicide treatments',
      'Monitor for early disease symptoms'
    ],
    color: 'red'
  },
  'Medium': {
    conditions: 'Moderate humidity (60-75%) + Variable temperatures',
    riskLevel: 'Moderate',
    recommendations: [
      'Continue regular monitoring',
      'Maintain optimal irrigation schedule',
      'Ensure good drainage',
      'Scout for disease symptoms weekly'
    ],
    color: 'yellow'
  },
  'Low': {
    conditions: 'Low humidity (<60%) + Hot/Dry or Cold conditions',
    riskLevel: 'Low',
    recommendations: [
      'Continue normal farming practices',
      'Focus on irrigation management',
      'Monitor for drought stress',
      'Routine disease monitoring'
    ],
    color: 'green'
  }
};

// SMS/WhatsApp Alert Templates
export const alertTemplates = {
  irrigation: {
    urgent: "🚨 URGENT: Irrigation needed NOW for {cropType} in {location}. Soil moisture: {moisture}%. Expected yield loss if delayed.",
    reminder: "⏰ REMINDER: Irrigation scheduled for {time} today. Zone: {zone}. Duration: {duration}min. Weather: {weather}",
    completed: "✅ Irrigation completed for {zone}. Volume: {volume}L. Cost: R{cost}. Next: {nextDate}"
  },
  weather: {
    storm: "⛈️ STORM WARNING: Heavy rain expected {date}. Consider postponing irrigation. Secure equipment.",
    drought: "☀️ DROUGHT ALERT: No rain forecast for {days} days. Increase irrigation frequency for {cropType}.",
    frost: "❄️ FROST WARNING: Temperature dropping to {temp}°C tonight. Protect sensitive crops."
  },
  disease: {
    high_risk: "🦠 DISEASE ALERT: High risk for {disease} in {cropType}. Humidity: {humidity}%. Take preventive action.",
    outbreak: "🚨 DISEASE OUTBREAK: {disease} detected in nearby farms. Monitor your {cropType} closely.",
    prevention: "💊 PREVENTION: Weather conditions favor {disease}. Apply treatments as recommended."
  },
  system: {
    sensor_offline: "⚠️ SENSOR OFFLINE: {sensorId} in {location} not responding. Check connection and battery.",
    low_battery: "🔋 LOW BATTERY: Sensor {sensorId} at {batteryLevel}%. Replace soon to avoid data loss.",
    maintenance: "🔧 MAINTENANCE: System check scheduled for {date}. Brief service interruption expected."
  }
};