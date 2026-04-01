import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sprout, LoaderCircle, XCircle, Droplet, Sun, Beaker, Leaf, Box } from 'lucide-react';
import React from 'react';

export default function SoilSeedSelection() {
  const [analysisType, setAnalysisType] = useState('soil');
  const [soilData, setSoilData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    temperature: '',
    humidity: '',
    sunlight: '',
    fertility: ''
  });

  const [cropName, setCropName] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setSoilData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
      moisture: '',
      temperature: '',
      humidity: '',
      sunlight: '',
      fertility: ''
    });
    setCropName('');
    setSeason('');
    setResult(null);
    setError('');
  };

  const handleSoilSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      crop_name: cropName,
      season: season,
      user_params: {
        'Nitrogen(Kg/hec)': Number(soilData.nitrogen),
        'p_(kgha)': Number(soilData.phosphorus),
        'k_(kgha)': Number(soilData.potassium),
        'ph': Number(soilData.ph),
        'moisture_%': Number(soilData.moisture),
        'temperature_c': Number(soilData.temperature),
        'humidity_%': Number(soilData.humidity),
        'sunlight_intensity_lux': Number(soilData.sunlight),
        'fertility_uscm': Number(soilData.fertility)
      }
    };

    try {
      const res = await fetch('http://localhost:5000/test-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Server not found or returned an error.');

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error fetching prediction:', err);
      setError('Failed to fetch analysis. Please check server connection or input.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisTypeChange = (type) => {
    setAnalysisType(type);
    resetForm(); // Clear previous results and inputs
  };

  // Group soil parameters by category for better organization
  const parameterGroups = [
    {
      title: "Nutrients",
      icon: <Beaker className="w-4 h-4" />,
      params: [
        { key: 'nitrogen', label: 'Nitrogen (kg/ha)' },
        { key: 'phosphorus', label: 'Phosphorus (kg/ha)' },
        { key: 'potassium', label: 'Potassium (kg/ha)' },
      ]
    },
    {
      title: "Properties",
      icon: <Box className="w-4 h-4" />,
      params: [
        { key: 'ph', label: 'pH Level' },
        { key: 'fertility', label: 'Soil Fertility (µS/cm)' },
      ]
    },
    {
      title: "Environmental",
      icon: <Sun className="w-4 h-4" />,
      params: [
        { key: 'moisture', label: 'Moisture (%)' },
        { key: 'temperature', label: 'Temperature (°C)' },
        { key: 'humidity', label: 'Humidity (%)' },
        { key: 'sunlight', label: 'Sunlight Intensity (lux)' },
      ]
    }
  ];

  return (
    <div className="relative min-h-screen mt-20 font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920"
          alt="Soil Analysis"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-8 backdrop-blur-sm bg-opacity-90 shadow-2xl border border-gray-800"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-500 p-3 rounded-full">
              <Sprout className="h-7 w-7 text-gray-900" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Soil & Seed Selection</h1>
          </div>

          <p className="text-gray-300 mb-8 max-w-2xl">
            Get personalized recommendations for soil management and seed selection based on your soil's characteristics.
          </p>

          <div className="flex gap-4 mb-8">
            {['soil', 'seed'].map((type) => (
              <button
                key={type}
                onClick={() => handleAnalysisTypeChange(type)}
                className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  analysisType === type
                    ? 'bg-green-500 text-gray-900 shadow-lg'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {type === 'soil' ? (
                  <>
                    <Box className="w-5 h-5" />
                    Soil Analysis
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    Seed Selection
                  </>
                )}
              </button>
            ))}
          </div>

          {analysisType === 'soil' && (
            <form onSubmit={handleSoilSubmit}>
              {parameterGroups.map((group) => (
                <div key={group.title} className="mb-8">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-800">
                    {group.icon}
                    <h3 className="text-lg font-medium text-green-400">{group.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {group.params.map(({ key, label }) => (
                      <div key={key} className="flex flex-col">
                        <label htmlFor={key} className="text-sm font-medium text-gray-300 mb-1">
                          {label}
                        </label>
                        <input
                          id={key}
                          type="number"
                          min="0"
                          value={soilData[key]}
                          onChange={(e) =>
                            setSoilData({ ...soilData, [key]: e.target.value })
                          }
                          className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                          placeholder={`Enter ${label}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 border-t border-gray-800 pt-6">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1">Crop Name</label>
                  <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    placeholder="e.g., Rice"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-1">Growing Season</label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    required
                  >
                    <option value="">Select Season</option>
                    <option value="Kharif">Kharif</option>
                    <option value="Rabi">Rabi</option>
                    <option value="Zaid">Zaid</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-green-500 text-gray-900 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg flex items-center gap-3 disabled:opacity-70"
                >
                  {loading ? <LoaderCircle className="animate-spin" /> : <Beaker className="w-5 h-5" />}
                  {loading ? 'Analyzing...' : 'Analyze Soil'}
                </button>
              </div>
            </form>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-red-900 bg-opacity-70 text-white p-4 rounded-lg shadow-md flex items-center gap-3 border border-red-700"
            >
              <XCircle className="text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {result && analysisType === 'soil' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 rounded-xl border border-green-800 shadow-xl overflow-hidden"
            >
              <div className="bg-green-800 p-5 flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                  <Sprout className="h-6 w-6 text-green-800" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Soil & Crop Analysis Report
                </h3>
              </div>

              <div className="bg-gray-800 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
                    <Droplet className="text-blue-400 w-5 h-5" />
                    <h4 className="text-lg font-medium text-blue-400">Nutrient Absorption / Release</h4>
                  </div>
                  <ul className="space-y-2 text-gray-200">
                    {Object.entries(result.absorption_release).map(([key, val]) => (
                      <li key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span> 
                        <span className={val.includes('Deficit') ? 'text-red-400' : val.includes('Excess') ? 'text-yellow-400' : 'text-green-400'}>
                          {val}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
                    <Beaker className="text-purple-400 w-5 h-5" />
                    <h4 className="text-lg font-medium text-purple-400">Chemical Solutions</h4>
                  </div>
                  <ul className="space-y-2 text-gray-200">
                    {Object.entries(result.solutions.chemical).map(([key, val]) => (
                      <li key={key} className="flex flex-col">
                        <span className="font-medium text-gray-300">{key}:</span>
                        <span className="text-sm mt-1">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
                    <Leaf className="text-green-400 w-5 h-5" />
                    <h4 className="text-lg font-medium text-green-400">Biological Solutions</h4>
                  </div>
                  <ul className="space-y-2 text-gray-200">
                    {Object.entries(result.solutions.biological).map(([key, val]) => (
                      <li key={key} className="flex flex-col">
                        <span className="font-medium text-gray-300">{key}:</span>
                        <span className="text-sm mt-1">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {result.alternatives?.length > 0 && (
                  <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
                      <Sprout className="text-yellow-400 w-5 h-5" />
                      <h4 className="text-lg font-medium text-yellow-400">Alternative Crops</h4>
                    </div>
                    <ul className="space-y-3 text-gray-200">
                      {result.alternatives.map((alt, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{alt.crop_name}</span>
                            <span className="text-xs text-gray-400 ml-2">({alt.season})</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-700 h-2 rounded-full overflow-hidden mr-2">
                              <div 
                                className="h-full bg-green-500" 
                                style={{ width: `${alt.match_percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{alt.match_percentage}%</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
