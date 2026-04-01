import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane as Plant, Sun, Cloud, Droplets, LineChart, AlertTriangle, Leaf, Gauge } from 'lucide-react';

export default function CropYieldDetection() {
  const [parameters, setParameters] = useState({
    lightIntensity: '',
    photoperiod: '',
    season: '',
    seedVariety: '',
    plantingDensity: '',
    fertilizerUsage: '',
    pestDiseaseData: '',
    previousYield: '',
    irrigationLevels: '',
    rainfall: '',
    relativeHumidity: '',
    phLevel: ''
  });

  const [prediction, setPrediction] = useState(null);
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
      
      // Mock prediction
      const mockYield = (Math.random() * (8 - 4) + 4).toFixed(2);
      setPrediction({
        estimatedYield: mockYield,
        confidence: 85,
        recommendations: [
          "Consider increasing irrigation frequency during flowering stage",
          "Monitor nitrogen levels in the next 2 weeks",
          "Optimal planting density detected"
        ]
      });
    } catch (error) {
      console.error('Error predicting yield:', error);
    } finally {
      setLoading(false);
    }
  };

  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const seedVarieties = ['IR-8', 'IR-36', 'IR-64', 'Swarna', 'MTU-1010'];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920"
          alt="Crop Field"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 mt-15">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl p-8 backdrop-blur-sm bg-opacity-90"
        >
          <div className="flex items-center gap-3 mb-6">
            <LineChart className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Crop Yield Prediction</h1>
          </div>

          <div className="prose prose-invert mb-8">
            <p className="text-gray-300">
              Enter your crop parameters to get an accurate yield prediction using our advanced
              machine learning model. The system analyzes multiple factors to provide yield estimates
              and recommendations for optimization.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Light Intensity (lux)
                </label>
                <div className="relative">
                  <Sun className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="lightIntensity"
                    value={parameters.lightIntensity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter light intensity"
                    required
                  />
                </div>
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
                  placeholder="Enter photoperiod"
                  min="0"
                  max="24"
                  required
                />
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seed Variety
                </label>
                <select
                  name="seedVariety"
                  value={parameters.seedVariety}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="">Select Variety</option>
                  {seedVarieties.map(variety => (
                    <option key={variety} value={variety}>
                      {variety}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Planting Density (plants/m²)
                </label>
                <div className="relative">
                  <Plant className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="plantingDensity"
                    value={parameters.plantingDensity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter density"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fertilizer Usage (kg/ha)
                </label>
                <input
                  type="number"
                  name="fertilizerUsage"
                  value={parameters.fertilizerUsage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter fertilizer amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pest & Disease Impact (0-10)
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="pestDiseaseData"
                    value={parameters.pestDiseaseData}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter impact level"
                    min="0"
                    max="10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Previous Yield (tons/ha)
                </label>
                <input
                  type="number"
                  name="previousYield"
                  value={parameters.previousYield}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter previous yield"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Irrigation Levels (mm/day)
                </label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="irrigationLevels"
                    value={parameters.irrigationLevels}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter irrigation level"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rainfall (mm)
                </label>
                <div className="relative">
                  <Cloud className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="rainfall"
                    value={parameters.rainfall}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter rainfall"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Relative Humidity (%)
                </label>
                <div className="relative">
                  <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="relativeHumidity"
                    value={parameters.relativeHumidity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter humidity"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  pH Level
                </label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="phLevel"
                    value={parameters.phLevel}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter pH level"
                    step="0.1"
                    min="0"
                    max="14"
                    required
                  />
                </div>
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
                    <LineChart className="w-5 h-5" />
                    Predict Yield
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
                  <LineChart className="w-6 h-6 text-green-500" />
                  Yield Prediction Results
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Estimated Yield</h3>
                    <p className="text-3xl font-bold text-green-500">{prediction.estimatedYield} tons/ha</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Confidence: {prediction.confidence}%
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Recommendations</h3>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-white">
                          <Leaf className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
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