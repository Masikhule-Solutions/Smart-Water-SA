import { detailedSchedule } from '../constants/data';

// Download schedule functionality
export const downloadSchedule = (formData: any) => {
  const scheduleData = detailedSchedule.map(item => 
    `${item.date} ${item.time}:00 - ${item.zone} - ${item.duration}min - ${item.volume}L - ${item.priority} Priority\n`
  ).join('');
  
  const content = `SMARTWATER SA - IRRIGATION SCHEDULE\n` +
                 `Farm: ${formData.farmName}\n` +
                 `Crop: ${formData.cropType} (${formData.growthStage})\n` +
                 `Location: ${formData.location}, ${formData.province}\n\n` +
                 `DETAILED SCHEDULE:\n${scheduleData}\n` +
                 `Generated: ${new Date().toLocaleDateString()}`;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `irrigation-schedule-${formData.farmName || 'farm'}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Quick Demo functionality
export const getQuickDemoData = () => ({
  farmerName: 'Johan van der Merwe',
  farmName: 'Sunrise Valley Farm',
  location: 'Stellenbosch',
  province: 'Western Cape',
  cropType: 'Table Grapes',
  growthStage: 'Fruit Set',
  fieldSize: '25',
  soilMoisture: '72',
  soilType: 'Loamy',
  irrigationSystem: 'Drip Irrigation',
  waterSource: 'Borehole'
});

// Reset form data
export const getEmptyFormData = () => ({
  farmerName: '',
  farmName: '',
  location: '',
  province: '',
  cropType: '',
  growthStage: '',
  fieldSize: '',
  soilMoisture: '',
  soilType: '',
  irrigationSystem: '',
  waterSource: ''
});