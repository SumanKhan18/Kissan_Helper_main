'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherCardProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export default function WeatherCard({ location}: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const fetchWeatherData = async (loc: string) => {
    setLoading(true);
    try {
      // Mock weather data for demonstration
      const mockWeather: WeatherData = {
        location: loc,
        temperature: Math.floor(Math.random() * 15) + 20,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 10) + 5,
        icon: 'ri-sun-line'
      };
      
      setTimeout(() => {
        setWeather(mockWeather);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500">Weather data unavailable</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{weather.location}</h3>
        <div className="w-8 h-8 flex items-center justify-center">
          <i className={`${weather.icon} text-2xl text-yellow-500`}></i>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">{weather.temperature}°C</div>
        <div className="text-gray-600">{weather.condition}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 flex items-center justify-center mr-2">
            <i className="ri-drop-line text-blue-500"></i>
          </div>
          <span className="text-gray-600">Humidity: {weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 flex items-center justify-center mr-2">
            <i className="ri-windy-line text-gray-500"></i>
          </div>
          <span className="text-gray-600">Wind: {weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}