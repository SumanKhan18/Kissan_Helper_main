'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChatInterface from '../chat/ChatInterface';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  disease: string[];
  dosage: string;
  price: number;
  description: string;
  sideEffects: string[];
  availability: {
    platform: string;
    price: number;
    inStock: boolean;
    rating: number;
    seller: string;
  }[];
}

interface Disease {
  id: string;
  name: string;
  symptoms: string[];
  medicines: string[];
  prevention: string[];
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const diseases: Disease[] = [
    {
      id: '1',
      name: 'Leaf Curl Disease',
      symptoms: ['Curled leaves', 'Yellow spots', 'Stunted growth'],
      medicines: ['Copper Fungicide', 'Neem Oil', 'Carbendazim'],
      prevention: ['Proper spacing', 'Good drainage', 'Regular pruning']
    },
    {
      id: '2',
      name: 'Aphid Infestation',
      symptoms: ['Small green insects', 'Sticky honeydew', 'Yellowing leaves'],
      medicines: ['Imidacloprid', 'Neem Oil', 'Malathion'],
      prevention: ['Natural predators', 'Companion planting', 'Regular inspection']
    },
    {
      id: '3',
      name: 'Root Rot',
      symptoms: ['Wilting plants', 'Brown roots', 'Soil fungus smell'],
      medicines: ['Copper Sulfate', 'Trichoderma', 'Metalaxyl'],
      prevention: ['Well-drained soil', 'Avoid overwatering', 'Crop rotation']
    },
    {
      id: '4',
      name: 'Powdery Mildew',
      symptoms: ['White powdery coating', 'Distorted leaves', 'Poor fruit quality'],
      medicines: ['Sulfur Spray', 'Potassium Bicarbonate', 'Myclobutanil'],
      prevention: ['Good air circulation', 'Avoid overhead watering', 'Resistant varieties']
    }
  ];

  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Copper Fungicide',
      genericName: 'Copper Oxychloride',
      category: 'Fungicide',
      disease: ['Leaf Curl Disease', 'Root Rot', 'Blight'],
      dosage: '2-3g per liter water',
      price: 450,
      description: 'Broad spectrum fungicide for controlling fungal diseases in crops',
      sideEffects: ['May cause leaf burn if overused', 'Toxic to fish'],
      availability: [
        { platform: 'BigHaat', price: 420, inStock: true, rating: 4.5, seller: 'Rallis India' },
        { platform: 'AgroStar', price: 450, inStock: true, rating: 4.3, seller: 'UPL Limited' },
        { platform: 'KisanKraft', price: 480, inStock: false, rating: 4.2, seller: 'Dhanuka Agritech' },
        { platform: 'Amazon', price: 525, inStock: true, rating: 4.1, seller: 'Farm Solutions' }
      ]
    },
    {
      id: '2',
      name: 'Neem Oil',
      genericName: 'Azadirachtin',
      category: 'Bio-pesticide',
      disease: ['Aphid Infestation', 'Leaf Curl Disease', 'Thrips'],
      dosage: '5ml per liter water',
      price: 320,
      description: 'Natural organic pesticide derived from neem tree',
      sideEffects: ['Generally safe', 'May affect beneficial insects'],
      availability: [
        { platform: 'BigHaat', price: 300, inStock: true, rating: 4.7, seller: 'Neem India' },
        { platform: 'AgroStar', price: 320, inStock: true, rating: 4.6, seller: 'Organica Biotech' },
        { platform: 'KisanKraft', price: 340, inStock: true, rating: 4.4, seller: 'Bio-Cure' },
        { platform: 'LocalStore', price: 280, inStock: true, rating: 4.3, seller: 'Village Pharmacy' }
      ]
    },
    {
      id: '3',
      name: 'Imidacloprid',
      genericName: 'Imidacloprid 17.8% SL',
      category: 'Insecticide',
      disease: ['Aphid Infestation', 'Whitefly', 'Jassids'],
      dosage: '0.5ml per liter water',
      price: 380,
      description: 'Systemic insecticide for sucking pests control',
      sideEffects: ['Toxic to bees', 'Handle with protective gear'],
      availability: [
        { platform: 'BigHaat', price: 360, inStock: true, rating: 4.4, seller: 'Bayer CropScience' },
        { platform: 'AgroStar', price: 380, inStock: true, rating: 4.5, seller: 'Syngenta' },
        { platform: 'Amazon', price: 420, inStock: true, rating: 4.2, seller: 'Agro Chemicals' },
        { platform: 'KisanKraft', price: 395, inStock: false, rating: 4.3, seller: 'Crystal Crop' }
      ]
    },
    {
      id: '4',
      name: 'Carbendazim',
      genericName: 'Carbendazim 50% WP',
      category: 'Fungicide',
      disease: ['Leaf Curl Disease', 'Anthracnose', 'Leaf Spot'],
      dosage: '1g per liter water',
      price: 290,
      description: 'Systemic fungicide for controlling various fungal diseases',
      sideEffects: ['May cause skin irritation', 'Avoid inhaling dust'],
      availability: [
        { platform: 'BigHaat', price: 270, inStock: true, rating: 4.6, seller: 'BASF India' },
        { platform: 'AgroStar', price: 290, inStock: true, rating: 4.4, seller: 'Indofil Industries' },
        { platform: 'LocalStore', price: 250, inStock: true, rating: 4.5, seller: 'Village Pharmacy' },
        { platform: 'Amazon', price: 320, inStock: true, rating: 4.1, seller: 'Farm Direct' }
      ]
    },
    {
      id: '5',
      name: 'Sulfur Spray',
      genericName: 'Wettable Sulfur 80% WP',
      category: 'Fungicide',
      disease: ['Powdery Mildew', 'Rust', 'Scab'],
      dosage: '2g per liter water',
      price: 180,
      description: 'Contact fungicide effective against powdery mildew',
      sideEffects: ['May cause leaf burn in hot weather', 'Avoid use above 32°C'],
      availability: [
        { platform: 'BigHaat', price: 160, inStock: true, rating: 4.3, seller: 'Sulfur Mills' },
        { platform: 'AgroStar', price: 180, inStock: true, rating: 4.2, seller: 'Chemtex Speciality' },
        { platform: 'KisanKraft', price: 190, inStock: true, rating: 4.1, seller: 'Agro Chemicals' },
        { platform: 'LocalStore', price: 140, inStock: true, rating: 4.4, seller: 'Village Pharmacy' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'ri-apps-line' },
    { id: 'fungicide', name: 'Fungicides', icon: 'ri-shield-check-line' },
    { id: 'insecticide', name: 'Insecticides', icon: 'ri-bug-line' },
    { id: 'bio-pesticide', name: 'Bio-pesticides', icon: 'ri-leaf-line' },
    { id: 'herbicide', name: 'Herbicides', icon: 'ri-plant-line' }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.disease.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           medicine.category.toLowerCase().replace('-', '') === selectedCategory.replace('-', '');
    
    return matchesSearch && matchesCategory;
  });

  const handleMedicineSelect = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowComparison(true);
  };

  const getBestPrice = (availability: Medicine['availability']) => {
    const inStockItems = availability.filter(item => item.inStock);
    if (inStockItems.length === 0) return availability[0];
    return inStockItems.reduce((min, item) => item.price < min.price ? item : min);
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
              <Link href="/weather" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Weather</Link>
              <Link href="/crops" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Crop Guide</Link>
              <Link href="/livestock" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Livestock</Link>
              <Link href="/marketplace" className="text-green-600 font-medium whitespace-nowrap cursor-pointer">Marketplace</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Marketplace</h1>
              <p className="text-gray-600">Find medicines and treatments for crop diseases with price comparison</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search medicines or diseases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm pr-8"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className="w-4 h-4 inline-flex items-center justify-center mr-2">
                      <i className={category.icon}></i>
                    </div>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Diseases Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Crop Diseases</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {diseases.map(disease => (
                  <div key={disease.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{disease.name}</h3>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">Symptoms:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {disease.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></div>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">Recommended Medicines:</p>
                      <div className="flex flex-wrap gap-1">
                        {disease.medicines.map((medicine, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchTerm(medicine)}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded cursor-pointer hover:bg-green-200 whitespace-nowrap"
                          >
                            {medicine}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medicine Results */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Available Medicines ({filteredMedicines.length})</h2>
              
              {filteredMedicines.map(medicine => {
                const bestPrice = getBestPrice(medicine.availability);
                return (
                  <div key={medicine.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-green-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                        <p className="text-sm text-gray-600">{medicine.genericName}</p>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                          {medicine.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{bestPrice.price}</p>
                        <p className="text-sm text-gray-500">Best Price</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700 mb-2">{medicine.description}</p>
                      <p className="text-sm text-gray-600"><strong>Dosage:</strong> {medicine.dosage}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Effective against:</p>
                      <div className="flex flex-wrap gap-1">
                        {medicine.disease.map((disease, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            {disease}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{bestPrice.platform}</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-star-fill text-yellow-400 text-sm"></i>
                          </div>
                          <span className="text-sm text-gray-600">{bestPrice.rating}</span>
                        </div>
                        {bestPrice.inStock ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">In Stock</span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Out of Stock</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleMedicineSelect(medicine)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap cursor-pointer transition-colors"
                      >
                        Compare Prices
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredMedicines.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="ri-search-line text-2xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No medicines found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or category filter</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - FarmMitra Assistant */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                    <i className="ri-robot-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">FarmMitra</h2>
                    <p className="text-sm text-gray-600">Your AI Farming Assistant</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Ask me about diseases, medicines, dosages, or any farming questions. I can help you choose the right treatment!
                </p>
              </div>
              <ChatInterface maxHeight="h-96" />
            </div>

            {/* Quick Medicine Tips */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Medicine Safety Tips</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    <i className="ri-shield-check-line text-green-600"></i>
                  </div>
                  <p>Always read labels and follow dosage instructions carefully</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    <i className="ri-time-line text-blue-600"></i>
                  </div>
                  <p>Check expiry dates before application</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    <i className="ri-hand-sanitizer-line text-orange-600"></i>
                  </div>
                  <p>Wear protective gear during application</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    <i className="ri-plant-line text-green-600"></i>
                  </div>
                  <p>Follow pre-harvest interval guidelines</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Comparison Modal */}
        {showComparison && selectedMedicine && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Price Comparison - {selectedMedicine.name}</h2>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {selectedMedicine.availability.map((item, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${item.inStock ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.platform}</h3>
                          <p className="text-sm text-gray-600">Seller: {item.seller}</p>
                          <div className="flex items-center mt-1">
                            <div className="w-4 h-4 flex items-center justify-center mr-1">
                              <i className="ri-star-fill text-yellow-400 text-sm"></i>
                            </div>
                            <span className="text-sm text-gray-600">{item.rating} rating</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
                          {item.inStock ? (
                            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                          ) : (
                            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Important Information</h4>
                  <div className="text-sm text-gray-700">
                    <p className="mb-2"><strong>Dosage:</strong> {selectedMedicine.dosage}</p>
                    <p className="mb-2"><strong>Side Effects:</strong> {selectedMedicine.sideEffects.join(', ')}</p>
                    <p className="text-red-600"><strong>Note:</strong> Always consult with agricultural experts before using any medicine.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}