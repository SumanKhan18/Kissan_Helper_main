'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface Crop {
  id: string;
  name: string;
  category: string;
  plantingSeason: string;
  harvestTime: string;
  waterNeeds: string;
  soilType: string;
  difficulty: string;
  image: string;
  tips: string[];
}

export default function CropsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Crops' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains & Cereals' },
    { id: 'legumes', name: 'Legumes' }
  ];

  const crops: Crop[] = [
    {
      id: 'tomato',
      name: 'Tomato',
      category: 'vegetables',
      plantingSeason: 'Spring to Early Summer',
      harvestTime: '75-85 days',
      waterNeeds: 'Moderate (1-2 inches/week)',
      soilType: 'Well-drained, pH 6.0-6.8',
      difficulty: 'Easy',
      image: 'https://readdy.ai/api/search-image?query=Fresh%20red%20ripe%20tomatoes%20growing%20on%20healthy%20green%20tomato%20plants%20in%20a%20well-maintained%20vegetable%20garden%2C%20bright%20sunlight%2C%20clear%20background%2C%20agricultural%20photography%2C%20vibrant%20colors%2C%20healthy%20crops&width=300&height=200&seq=tomato-1&orientation=landscape',
      tips: [
        'Plant after last frost when soil is warm',
        'Provide support with stakes or cages',
        'Water at soil level to prevent leaf diseases',
        'Mulch around plants to retain moisture'
      ]
    },
    {
      id: 'wheat',
      name: 'Wheat',
      category: 'grains',
      plantingSeason: 'Fall (Winter Wheat) or Spring',
      harvestTime: '120-150 days',
      waterNeeds: 'Low to Moderate',
      soilType: 'Well-drained loam, pH 6.0-7.0',
      difficulty: 'Moderate',
      image: 'https://readdy.ai/api/search-image?query=Golden%20wheat%20field%20ready%20for%20harvest%20with%20tall%20wheat%20stalks%20swaying%20in%20the%20breeze%2C%20blue%20sky%20background%2C%20rural%20farming%20landscape%2C%20agricultural%20photography%2C%20abundant%20grain%20crop&width=300&height=200&seq=wheat-1&orientation=landscape',
      tips: [
        'Choose variety based on your climate zone',
        'Plant at proper depth (1-2 inches)',
        'Monitor for pests like aphids and rust',
        'Harvest when grain moisture is 13-14%'
      ]
    },
    {
      id: 'mango',
      name: 'Mango',
      category: 'fruits',
      plantingSeason: 'Monsoon Season',
      harvestTime: '3-5 years (from planting)',
      waterNeeds: 'High during fruit development',
      soilType: 'Deep, well-drained, pH 5.5-7.5',
      difficulty: 'Hard',
      image: 'https://readdy.ai/api/search-image?query=Ripe%20yellow%20mangoes%20hanging%20from%20mango%20tree%20branches%20with%20green%20leaves%2C%20tropical%20fruit%20orchard%2C%20bright%20natural%20lighting%2C%20healthy%20fruit%20trees%2C%20agricultural%20setting&width=300&height=200&seq=mango-1&orientation=landscape',
      tips: [
        'Plant in sunny, sheltered location',
        'Prune regularly for better air circulation',
        'Apply organic fertilizer during growing season',
        'Protect from strong winds and frost'
      ]
    },
    {
      id: 'rice',
      name: 'Rice',
      category: 'grains',
      plantingSeason: 'Kharif Season (June-July)',
      harvestTime: '90-120 days',
      waterNeeds: 'Very High (flooded fields)',
      soilType: 'Clay loam, pH 5.5-6.5',
      difficulty: 'Moderate',
      image: 'https://readdy.ai/api/search-image?query=Green%20rice%20paddies%20with%20young%20rice%20plants%20growing%20in%20flooded%20fields%2C%20traditional%20agricultural%20landscape%2C%20rural%20farming%2C%20water%20irrigation%20system%2C%20lush%20green%20crops&width=300&height=200&seq=rice-1&orientation=landscape',
      tips: [
        'Prepare seedbeds 3-4 weeks before transplanting',
        'Maintain water level 2-5 cm in fields',
        'Apply nitrogen fertilizer in split doses',
        'Control weeds early in the season'
      ]
    },
    {
      id: 'potato',
      name: 'Potato',
      category: 'vegetables',
      plantingSeason: 'Late Winter to Early Spring',
      harvestTime: '70-120 days',
      waterNeeds: 'Moderate, consistent moisture',
      soilType: 'Loose, well-drained, pH 5.8-6.2',
      difficulty: 'Easy',
      image: 'https://readdy.ai/api/search-image?query=Fresh%20potatoes%20being%20harvested%20from%20rich%20brown%20soil%2C%20healthy%20potato%20plants%20with%20green%20foliage%2C%20agricultural%20field%2C%20farming%20tools%2C%20natural%20daylight&width=300&height=200&seq=potato-1&orientation=landscape',
      tips: [
        'Plant seed potatoes 2-4 inches deep',
        'Hill soil around plants as they grow',
        'Stop watering 2 weeks before harvest',
        'Store in cool, dark, ventilated place'
      ]
    },
    {
      id: 'soybeans',
      name: 'Soybeans',
      category: 'legumes',
      plantingSeason: 'Late Spring to Early Summer',
      harvestTime: '100-120 days',
      waterNeeds: 'Moderate, more during pod filling',
      soilType: 'Well-drained, pH 6.0-6.8',
      difficulty: 'Easy',
      image: 'https://readdy.ai/api/search-image?query=Healthy%20soybean%20plants%20with%20green%20pods%20in%20agricultural%20field%2C%20legume%20crop%20growing%20in%20rows%2C%20farming%20landscape%2C%20sustainable%20agriculture%2C%20protein-rich%20crops&width=300&height=200&seq=soybean-1&orientation=landscape',
      tips: [
        'Inoculate seeds with rhizobia bacteria',
        'Plant when soil temperature reaches 60°F',
        'Avoid cultivation after flowering begins',
        'Harvest when pods rattle and leaves turn yellow'
      ]
    }
  ];

  const filteredCrops = crops.filter(crop => {
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <Link href="/chat" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Ask Assistant</Link>
              <Link href="/weather" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Weather</Link>
              <Link href="/crops" className="text-green-600 font-medium whitespace-nowrap cursor-pointer">Crop Guide</Link>
              <Link href="/livestock" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Livestock</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Marketplace</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Crop Growing Guide
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Learn everything about planting, caring for, and harvesting different crops. 
            From vegetables to grains, get expert guidance for successful farming.
          </p>
          <Link href="/chat" className="bg-white hover:bg-gray-100 text-green-600 px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer">
            Ask Crop Questions
          </Link>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Crops Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCrops.map(crop => (
              <div key={crop.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Image
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-48 object-cover object-top"
                  width={500}
                  height={200}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(crop.difficulty)}`}>
                      {crop.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-calendar-line"></i>
                      </div>
                      <span className="font-medium">Planting:</span>
                      <span className="ml-1">{crop.plantingSeason}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-time-line"></i>
                      </div>
                      <span className="font-medium">Harvest:</span>
                      <span className="ml-1">{crop.harvestTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-drop-line"></i>
                      </div>
                      <span className="font-medium">Water:</span>
                      <span className="ml-1">{crop.waterNeeds}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-landscape-line"></i>
                      </div>
                      <span className="font-medium">Soil:</span>
                      <span className="ml-1">{crop.soilType}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Growing Tips:</h4>
                    <ul className="space-y-1">
                      {crop.tips.slice(0, 2).map((tip, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-3 h-3 flex items-center justify-center mt-1 mr-2">
                            <i className="ri-check-line text-green-600 text-xs"></i>
                          </div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={`/chat?question=How to grow ${crop.name}?`}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block whitespace-nowrap cursor-pointer"
                  >
                    Ask About This Crop
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCrops.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-search-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No crops found</h3>
              <p className="text-gray-600">Try adjusting your search or filter options</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Specific Crop Advice?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ask our AI assistant about any crop-related questions. Get personalized advice for your farming conditions.
          </p>
          <Link href="/chat" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
            Talk to Farming Assistant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-plant-line text-2xl text-green-400"></i>
                </div>
                <span className="ml-2 text-xl font-bold font-pacifico">FarmAssist</span>
              </div>
              <p className="text-gray-400">Your smart farming companion for better harvests and healthier livestock.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/chat" className="hover:text-white cursor-pointer">Ask Assistant</Link></li>
                <li><Link href="/weather" className="hover:text-white cursor-pointer">Weather Updates</Link></li>
                <li><Link href="/crops" className="hover:text-white cursor-pointer">Crop Guide</Link></li>
                <li><Link href="/livestock" className="hover:text-white cursor-pointer">Livestock Care</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white cursor-pointer">Marketplace</Link></li>
                <li><a className="hover:text-white cursor-pointer">Government Schemes</a></li>
                <li><a className="hover:text-white cursor-pointer">Training Videos</a></li>
                <li><a className="hover:text-white cursor-pointer">Expert Connect</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a className="hover:text-white cursor-pointer">Help Center</a></li>
                <li><a className="hover:text-white cursor-pointer">Contact Us</a></li>
                <li><a className="hover:text-white cursor-pointer">Community Forum</a></li>
                <li><a className="hover:text-white cursor-pointer">Language Settings</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FarmAssist. Helping farmers grow better.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}