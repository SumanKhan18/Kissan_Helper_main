import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane as Plant, Thermometer, Droplets, Sun, Gauge, Calendar, AlertTriangle } from 'lucide-react';

export default function DetectSoil() {
  const [parameters, setParameters] = useState({
    fertility: 0,
    photoperiod: 0,
    temperature: 0,
    rainfall: 0,
    pH: 0,
    lightHours: 0,
    lightIntensity: 0,
    rh: 0,
    yield: 0,
    categoryPH: '',
    soilType: '',
    season: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [predictedDisease, setPredictedDisease] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Integrate with ML model API
      // For demo, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPrediction("Black Soil - Ideal for cotton cultivation");
      setPredictedDisease("Low risk of soil-borne diseases");
    } catch (error) {
      console.error('Error analyzing soil:', error);
    } finally {
      setLoading(false);
    }
  };

  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const soilTypes = ['Sandy', 'Clay', 'Loamy', 'Silt', 'Peat', 'Chalk', 'Black'];
  const phCategories = ['Acidic', 'Neutral', 'Alkaline'];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920"
          alt="Soil Analysis"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 mt-15">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl p-8 backdrop-blur-sm bg-opacity-90"
        >
          <div className="flex items-center gap-3 mb-6 ">
            <Plant className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Detect The Best Soil For Your Crop</h1>
          </div>

          <div className="prose prose-invert mb-8">
            <p className="text-gray-300">
              Enter the environmental parameters to analyze and determine the most suitable soil type for your crop.
              Our advanced system will also predict potential soil-borne diseases based on the conditions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fertility Index (0-100)
                </label>
                <input
                  type="number"
                  name="fertility"
                  value={parameters.fertility}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photoperiod (hours)
                </label>
                <input
                  type="number"
                  name="photoperiod"
                  value={parameters.photoperiod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={parameters.temperature}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  value={parameters.rainfall}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Light Hours
                </label>
                <input
                  type="number"
                  name="lightHours"
                  value={parameters.lightHours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Light Intensity (lux)
                </label>
                <input
                  type="number"
                  name="lightIntensity"
                  value={parameters.lightIntensity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Relative Humidity (%)
                </label>
                <input
                  type="number"
                  name="rh"
                  value={parameters.rh}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected Yield (tons/hectare)
                </label>
                <input
                  type="number"
                  name="yield"
                  value={parameters.yield}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  pH Category
                </label>
                <select
                  name="categoryPH"
                  value={parameters.categoryPH}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="">Select pH Category</option>
                  {phCategories.map(category => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Soil Type
                </label>
                <select
                  name="soilType"
                  value={parameters.soilType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="">Select Soil Type</option>
                  {soilTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Season
                </label>
                <select
                  name="season"
                  value={parameters.season}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="">Select Season</option>
                  {seasons.map(season => (
                    <option key={season} value={season.toLowerCase()}>
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Plant className="w-5 h-5" />
                    Analyze Soil Conditions
                  </>
                )}
              </button>
            </div>
          </form>

          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Plant className="w-6 h-6 text-green-500" />
                  Soil Analysis Results
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-300">Recommended Soil Type</h3>
                    <p className="text-white">{prediction}</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-300">Disease Risk Assessment</h3>
                      <p className="text-white">{predictedDisease}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}