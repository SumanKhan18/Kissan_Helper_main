'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface Animal {
  id: string;
  name: string;
  category: string;
  lifespan: string;
  feed: string;
  space: string;
  difficulty: string;
  image: string;
  tips: string[];
  commonIssues: string[];
}

export default function LivestockPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All Animals' },
    { id: 'dairy', name: 'Dairy Animals' },
    { id: 'poultry', name: 'Poultry' },
    { id: 'goats', name: 'Goats & Sheep' },
    { id: 'other', name: 'Other Livestock' }
  ];

  const animals: Animal[] = [
    {
      id: 'dairy-cow',
      name: 'Dairy Cow',
      category: 'dairy',
      lifespan: '15-20 years',
      feed: 'Grass, hay, silage, concentrates',
      space: '1.5-2 acres per cow',
      difficulty: 'Moderate',
      image: 'https://readdy.ai/api/search-image?query=Healthy%20dairy%20cows%20grazing%20in%20green%20pasture%20field%2C%20black%20and%20white%20Holstein%20cows%2C%20rural%20farm%20setting%2C%20peaceful%20livestock%20scene%2C%20agricultural%20photography&width=300&height=200&seq=dairy-cow-1&orientation=landscape',
      tips: [
        'Provide fresh water access 24/7',
        'Maintain consistent milking schedule',
        'Ensure proper ventilation in barns',
        'Regular hoof trimming and health checks'
      ],
      commonIssues: ['Mastitis', 'Lameness', 'Milk fever', 'Bloat']
    },
    {
      id: 'chicken',
      name: 'Chickens',
      category: 'poultry',
      lifespan: '5-10 years',
      feed: 'Layer feed, scratch grains, vegetables',
      space: '4 sq ft per bird in coop',
      difficulty: 'Easy',
      image: 'https://readdy.ai/api/search-image?query=Free-range%20chickens%20pecking%20and%20foraging%20in%20farmyard%2C%20colorful%20healthy%20hens%2C%20rural%20poultry%20farm%2C%20natural%20outdoor%20setting%2C%20sustainable%20farming&width=300&height=200&seq=chicken-1&orientation=landscape',
      tips: [
        'Provide 14-16 hours of light for laying',
        'Keep coop clean and dry',
        'Offer grit for digestion',
        'Protect from predators at night'
      ],
      commonIssues: ['Egg binding', 'Respiratory infections', 'Mites', 'Pecking order fights']
    },
    {
      id: 'goat',
      name: 'Goats',
      category: 'goats',
      lifespan: '12-18 years',
      feed: 'Browse, hay, pasture, grain',
      space: '200-500 sq ft per goat',
      difficulty: 'Easy',
      image: 'https://readdy.ai/api/search-image?query=Healthy%20goats%20grazing%20on%20hillside%20pasture%2C%20mixed%20breed%20goats%20feeding%20on%20grass%20and%20shrubs%2C%20rural%20farm%20landscape%2C%20sustainable%20livestock%20farming&width=300&height=200&seq=goat-1&orientation=landscape',
      tips: [
        'Provide shelter from rain and wind',
        'Trim hooves every 6-8 weeks',
        'Keep in groups - goats are social',
        'Offer mineral supplements'
      ],
      commonIssues: ['Parasites', 'Hoof rot', 'Pregnancy toxemia', 'Bloat']
    },
    {
      id: 'buffalo',
      name: 'Water Buffalo',
      category: 'dairy',
      lifespan: '18-25 years',
      feed: 'Grass, paddy straw, concentrates',
      space: '2-3 acres per animal',
      difficulty: 'Hard',
      image: 'https://readdy.ai/api/search-image?query=Water%20buffalo%20grazing%20in%20muddy%20field%20near%20water%20source%2C%20large%20dark%20buffalo%20in%20agricultural%20setting%2C%20traditional%20livestock%20farming%2C%20rural%20landscape&width=300&height=200&seq=buffalo-1&orientation=landscape',
      tips: [
        'Provide access to water for wallowing',
        'Feed high-quality roughage',
        'Regular deworming schedule',
        'Artificial insemination for breeding'
      ],
      commonIssues: ['Heat stress', 'Foot and mouth disease', 'Parasites', 'Reproductive disorders']
    },
    {
      id: 'pig',
      name: 'Pigs',
      category: 'other',
      lifespan: '12-20 years',
      feed: 'Pig feed, kitchen scraps, grains',
      space: '8-10 sq ft per pig',
      difficulty: 'Moderate',
      image: 'https://readdy.ai/api/search-image?query=Pink%20pigs%20in%20clean%20farm%20pen%20with%20mud%20wallow%2C%20healthy%20pigs%20feeding%20in%20rural%20farm%20setting%2C%20sustainable%20pig%20farming%2C%20agricultural%20livestock&width=300&height=200&seq=pig-1&orientation=landscape',
      tips: [
        'Provide mud wallow for cooling',
        'Keep feeding areas clean',
        'Separate sick animals immediately',
        'Maintain proper vaccination schedule'
      ],
      commonIssues: ['Swine flu', 'Diarrhea', 'Respiratory infections', 'Skin conditions']
    },
    {
      id: 'sheep',
      name: 'Sheep',
      category: 'goats',
      lifespan: '10-12 years',
      feed: 'Grass, hay, grain supplements',
      space: '15-20 sheep per acre',
      difficulty: 'Easy',
      image: 'https://readdy.ai/api/search-image?query=Flock%20of%20white%20sheep%20grazing%20in%20green%20meadow%2C%20woolly%20sheep%20in%20pasture%20field%2C%20pastoral%20farming%20scene%2C%20rural%20agricultural%20landscape&width=300&height=200&seq=sheep-1&orientation=landscape',
      tips: [
        'Shear wool annually for health',
        'Rotate pastures to prevent overgrazing',
        'Provide shelter during lambing',
        'Check for fly strike in warm weather'
      ],
      commonIssues: ['Parasites', 'Pneumonia', 'Pregnancy toxemia', 'Fly strike']
    }
  ];

  const filteredAnimals = animals.filter(animal => {
    const matchesCategory = selectedCategory === 'all' || animal.category === selectedCategory;
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase());
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
              <Link href="/crops" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Crop Guide</Link>
              <Link href="/livestock" className="text-green-600 font-medium whitespace-nowrap cursor-pointer">Livestock</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Marketplace</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Livestock Care Guide
          </h1>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Learn proper care, feeding, and health management for different livestock. 
            From dairy cows to poultry, get expert advice for healthy animals.
          </p>
          <Link href="/chat" className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer">
            Ask Livestock Questions
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
                placeholder="Search livestock..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white'
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

      {/* Animals Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimals.map(animal => (
              <div key={animal.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <Image
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-48 object-cover object-top"
                  width={500}
                  height={200}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{animal.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(animal.difficulty)}`}>
                      {animal.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-time-line"></i>
                      </div>
                      <span className="font-medium">Lifespan:</span>
                      <span className="ml-1">{animal.lifespan}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-restaurant-line"></i>
                      </div>
                      <span className="font-medium">Feed:</span>
                      <span className="ml-1">{animal.feed}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center mr-2">
                        <i className="ri-home-line"></i>
                      </div>
                      <span className="font-medium">Space:</span>
                      <span className="ml-1">{animal.space}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Care Tips:</h4>
                    <ul className="space-y-1">
                      {animal.tips.slice(0, 2).map((tip, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-3 h-3 flex items-center justify-center mt-1 mr-2">
                            <i className="ri-check-line text-orange-600 text-xs"></i>
                          </div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Common Issues:</h4>
                    <div className="flex flex-wrap gap-1">
                      {animal.commonIssues.slice(0, 3).map((issue, index) => (
                        <span key={index} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href={`/chat?question=How to care for ${animal.name}?`}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-center block whitespace-nowrap cursor-pointer"
                  >
                    Ask About This Animal
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-search-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No livestock found</h3>
              <p className="text-gray-600">Try adjusting your search or filter options</p>
            </div>
          )}
        </div>
      </section>

      {/* Emergency Care Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Emergency Care Guidelines
            </h2>
            <p className="text-xl text-gray-600">
              Quick reference for common livestock emergencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-heart-pulse-line text-2xl text-red-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Signs of Illness</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Loss of appetite</li>
                <li>• Unusual behavior</li>
                <li>• Discharge from eyes/nose</li>
                <li>• Difficulty breathing</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-phone-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">When to Call Vet</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High fever (103°F)</li>
                <li>• Severe bleeding</li>
                <li>• Difficulty giving birth</li>
                <li>• Severe lameness</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-medicine-bottle-line text-2xl text-green-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">First Aid Kit</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Digital thermometer</li>
                <li>• Antiseptic solution</li>
                <li>• Bandages & gauze</li>
                <li>• Pain relief medication</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shield-cross-line text-2xl text-yellow-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Prevention</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Regular vaccinations</li>
                <li>• Clean water & feed</li>
                <li>• Proper ventilation</li>
                <li>• Quarantine new animals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Livestock Health Advice?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ask our AI assistant about animal care, feeding schedules, or health concerns. Get expert guidance 24/7.
          </p>
          <Link href="/chat" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
            Ask Livestock Questions
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