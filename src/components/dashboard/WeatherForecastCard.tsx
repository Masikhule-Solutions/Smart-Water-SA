import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Sun, TrendingUp } from 'lucide-react';
import { extendedWeatherData } from '../../constants/data';

interface WeatherForecastCardProps {
  formData: any;
  navigateToWeather: () => void;
}

export default function WeatherForecastCard({ formData, navigateToWeather }: WeatherForecastCardProps) {
  return (
    <Card className="shadow-lg border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Sun className="w-5 h-5 mr-2" />
            14-Day Weather & Irrigation Forecast
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={navigateToWeather}
            className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Full 14-Day View
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Advanced weather monitoring station with IoT sensors in South African agricultural setting"
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-xl font-bold">Hyper-Local Weather Intelligence</h3>
              <p className="text-blue-200">AI-powered precision forecasting for {formData.location}</p>
            </div>
          </div>
        </div>
        
        {/* 7-Day Quick View */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-3">Next 7 Days Overview</h4>
          <div className="grid grid-cols-7 gap-2">
            {extendedWeatherData.slice(0, 7).map((day, index) => (
              <div key={index} className={`text-center p-3 rounded-lg border ${
                day.irrigationRecommendation === 'Critical' ? 'bg-red-50 border-red-200' :
                day.irrigationRecommendation === 'High Priority' ? 'bg-orange-50 border-orange-200' :
                day.irrigationRecommendation === 'Medium Priority' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="text-sm font-medium text-gray-800">{day.day}</div>
                <div className="text-lg font-bold text-blue-600">{day.temp}°</div>
                <div className="text-xs text-blue-500">{day.precipitation}mm</div>
                <div className="text-xs mt-1">
                  <Badge size="sm" className={`text-xs ${
                    day.irrigationRecommendation === 'Critical' ? 'bg-red-500' :
                    day.irrigationRecommendation === 'High Priority' ? 'bg-orange-500' :
                    day.irrigationRecommendation === 'Medium Priority' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}>
                    {day.irrigationRecommendation === 'Critical' ? 'Critical' :
                     day.irrigationRecommendation === 'High Priority' ? 'High' :
                     day.irrigationRecommendation === 'Medium Priority' ? 'Med' :
                     day.irrigationRecommendation === 'Low Priority' ? 'Low' : 'None'}
                  </Badge>
                </div>
                {day.irrigationRecommendation !== 'Not Needed' && (
                  <div className="text-xs text-green-700 mt-1 font-medium">
                    {day.optimalTimes[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Extended 14-Day Forecast */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-3">Extended 14-Day Forecast</h4>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {extendedWeatherData.slice(7, 14).map((day, index) => (
              <div key={index + 7} className={`text-center p-2 rounded border ${
                day.irrigationRecommendation === 'Critical' ? 'bg-red-50 border-red-200' :
                day.irrigationRecommendation === 'High Priority' ? 'bg-orange-50 border-orange-200' :
                day.irrigationRecommendation === 'Medium Priority' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="font-medium text-gray-800">{day.day}</div>
                <div className="font-bold text-blue-600">{day.temp}°</div>
                <div className="text-blue-500">{day.precipitation}mm</div>
                <Badge size="sm" className={`text-xs mt-1 ${
                  day.irrigationRecommendation === 'Critical' ? 'bg-red-500' :
                  day.irrigationRecommendation === 'High Priority' ? 'bg-orange-500' :
                  day.irrigationRecommendation === 'Medium Priority' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}>
                  {day.irrigationRecommendation === 'Critical' ? 'Crit' :
                   day.irrigationRecommendation === 'High Priority' ? 'High' :
                   day.irrigationRecommendation === 'Medium Priority' ? 'Med' :
                   day.irrigationRecommendation === 'Low Priority' ? 'Low' : 'None'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        {/* 14-Day Temperature and Precipitation Chart */}
        <div className="h-64 mb-4">
          <h4 className="font-medium text-gray-700 mb-2">14-Day Weather Trends</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={extendedWeatherData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'temp' ? `${value}°C` : 
                  name === 'precipitation' ? `${value}mm` : 
                  `${value}mm`,
                  name === 'temp' ? 'Temperature' : 
                  name === 'precipitation' ? 'Rainfall' : 
                  'Evapotranspiration'
                ]}
              />
              <Line type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={3} name="temp" />
              <Line type="monotone" dataKey="precipitation" stroke="#10B981" strokeWidth={3} name="precipitation" />
              <Line type="monotone" dataKey="evapotranspiration" stroke="#F59E0B" strokeWidth={2} name="evapotranspiration" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Weather Insights */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {extendedWeatherData[0].humidity}%
            </div>
            <div className="text-sm text-blue-800">Current Humidity</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {extendedWeatherData[0].windSpeed} km/h
            </div>
            <div className="text-sm text-green-800">Wind Speed {extendedWeatherData[0].windDirection}</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              UV {extendedWeatherData[0].uvIndex}
            </div>
            <div className="text-sm text-orange-800">UV Index</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}