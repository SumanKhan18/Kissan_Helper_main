'use client';

import { useState } from 'react';
import Link from 'next/link';
import WeatherCard from './WeatherCard';
import LocationPicker from './LocationPicker';
import FarmingTips from './FarmingTips';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDBSwYrSCxqaf1cK0Qy-wTT-qGl11UE3Cc';

export default function WeatherPage() {
  const [selectedLocation, setSelectedLocation] = useState('Delhi, India');
  const [weatherCondition] = useState('Sunny');

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-green-600"></i>
              </div>
              <span className="ml-2 text-xl font-bold text-green-800 font-pacifico">FarmAssist</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/chat" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">
                Ask Assistant
              </Link>
              <Link href="/weather" className="text-green-600 font-medium whitespace-nowrap cursor-pointer">
                Weather
              </Link>
              <Link href="/crops" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">
                Crop Guide
              </Link>
              <Link href="/livestock" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">
                Livestock
              </Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">
                Marketplace
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden" style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20sky%20with%20dramatic%20clouds%20over%20green%20agricultural%20fields%2C%20golden%20hour%20lighting%2C%20peaceful%20farming%20landscape%2C%20modern%20weather%20monitoring%20concept%2C%20professional%20photography%2C%20serene%20countryside%20atmosphere%2C%20sustainable%20agriculture%20setting%2C%20wide%20horizon%20view&width=1200&height=400&seq=weather-hero-1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Weather Updates for Farmers
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Get accurate weather forecasts and farming recommendations based on current conditions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Location and Weather */}
          <div className="lg:col-span-2 space-y-8">
            <LocationPicker 
              onLocationSelect={handleLocationSelect}
              apiKey={GOOGLE_MAPS_API_KEY}
            />
            
            <WeatherCard 
              location={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
            
            {/* 7-Day Forecast */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center p-3 rounded-lg hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                    <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                      <i className={`${index % 2 === 0 ? 'ri-sun-line text-yellow-500' : 'ri-cloud-line text-gray-500'} text-lg`}></i>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div>{25 + index}°</div>
                      <div className="text-gray-400">{18 + index}°</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Farming Tips */}
          <div className="space-y-6">
            <FarmingTips weatherCondition={weatherCondition} />
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/chat" className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mr-3">
                    <i className="ri-question-answer-line text-green-600"></i>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Ask Weather Question</div>
                    <div className="text-sm text-gray-500">Get farming advice based on weather</div>
                  </div>
                </Link>
                
                <Link href="/crops" className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                    <i className="ri-seedling-line text-blue-600"></i>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Crop Calendar</div>
                    <div className="text-sm text-gray-500">Plan planting based on season</div>
                  </div>
                </Link>
                
                <Link href="/livestock" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full mr-3">
                    <i className="ri-bear-smile-line text-orange-600"></i>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Livestock Care</div>
                    <div className="text-sm text-gray-500">Weather-based animal care tips</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-green-400"></i>
              </div>
              <span className="ml-2 text-xl font-bold font-pacifico">FarmAssist</span>
            </div>
            <p className="text-gray-400 mb-4">Your smart farming companion for better harvests and healthier livestock.</p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white cursor-pointer">Home</Link>
              <Link href="/chat" className="text-gray-400 hover:text-white cursor-pointer">Chat</Link>
              <Link href="/crops" className="text-gray-400 hover:text-white cursor-pointer">Crops</Link>
              <Link href="/livestock" className="text-gray-400 hover:text-white cursor-pointer">Livestock</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}