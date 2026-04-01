import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Clock, Beaker, ArrowRight, Plane as Plant, Thermometer, Droplets, Bug, FlaskRound as Flask, Leaf } from 'lucide-react';

export default function SeasonalMedicines() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    plantName: '',
    plantingDate: '',
    season: 'spring',
    soilType: '',
    soilCondition: '',
    temperature: '',
    humidity: '',
    disease: '',
    treatmentType: 'both'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      setRecommendations([
        {
          type: 'chemical',
          name: 'Copper Oxychloride',
          dosage: '2.5g per liter of water',
          applicationProcess: 'Foliar spray during early morning or late evening',
          frequency: 'Every 7-10 days',
          precautions: 'Wear protective gear, avoid spraying in windy conditions',
          effectiveness: 85,
          notes: 'Most effective when applied preventively. Stop application 15 days before harvest.'
        },
        {
          type: 'biological',
          name: 'Trichoderma viride',
          dosage: '5g per liter of water',
          applicationProcess: 'Soil drenching around root zone',
          frequency: 'Monthly application',
          precautions: 'Apply during evening hours, maintain soil moisture',
          effectiveness: 75,
          notes: 'Enhances plant immunity and promotes root growth. Safe for beneficial insects.'
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  const inputClasses = "w-full rounded-md bg-gray-800 border-gray-700 text-white text-base py-3 px-4 focus:border-green-500 focus:ring-green-500";

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=1920"
          alt="Seasonal Medicines"
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
            <Calendar className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Treatment Recommendations</h1>
          </div>

          <div className="prose prose-invert mb-8">
            <p className="text-gray-300">
              Get personalized treatment recommendations based on your plant's conditions. Our system
              analyzes various factors to suggest the most effective chemical and biological treatments
              for optimal plant health.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Plant className="w-4 h-4 text-green-500" />
                  Plant Name
                </label>
                <input
                  type="text"
                  value={formData.plantName}
                  onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
                  placeholder="Enter plant name"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  Planting Date
                </label>
                <input
                  type="date"
                  value={formData.plantingDate}
                  onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-500" />
                  Season
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className={inputClasses}
                >
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="autumn">Autumn</option>
                  <option value="winter">Winter</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Flask className="w-4 h-4 text-green-500" />
                  Soil Type
                </label>
                <input
                  type="text"
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                  placeholder="e.g., Clay, Sandy, Loam"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-green-500" />
                  Soil Condition
                </label>
                <input
                  type="text"
                  value={formData.soilCondition}
                  onChange={(e) => setFormData({ ...formData, soilCondition: e.target.value })}
                  placeholder="e.g., Moist, Dry, Waterlogged"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-green-500" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  placeholder="Enter average temperature"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-green-500" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                  placeholder="Enter humidity level"
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Bug className="w-4 h-4 text-green-500" />
                  Disease/Issue (if any)
                </label>
                <input
                  type="text"
                  value={formData.disease}
                  onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                  placeholder="Describe the issue"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Beaker className="w-4 h-4 text-green-500" />
                  Treatment Preference
                </label>
                <select
                  value={formData.treatmentType}
                  onChange={(e) => setFormData({ ...formData, treatmentType: e.target.value })}
                  className={inputClasses}
                >
                  <option value="both">Both Chemical & Biological</option>
                  <option value="chemical">Chemical Only</option>
                  <option value="biological">Biological Only</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-green-500 text-black rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get Recommendations
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 space-y-8"
            >
              <h2 className="text-2xl font-bold text-white">Recommended Treatments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {recommendation.type === 'chemical' ? (
                        <Beaker className="w-6 h-6 text-blue-500" />
                      ) : (
                        <Leaf className="w-6 h-6 text-green-500" />
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {recommendation.name}
                        </h3>
                        <span className={`text-sm ${
                          recommendation.type === 'chemical' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                          {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)} Treatment
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Dosage</h4>
                        <p className="text-white">{recommendation.dosage}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Application Process</h4>
                        <p className="text-white">{recommendation.applicationProcess}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Frequency</h4>
                        <p className="text-white">{recommendation.frequency}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Precautions</h4>
                        <p className="text-white">{recommendation.precautions}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Effectiveness</h4>
                        <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              recommendation.type === 'chemical' ? 'bg-blue-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${recommendation.effectiveness}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{recommendation.effectiveness}% effective</p>
                      </div>

                      <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-300">Important Notes</h4>
                        <p className="text-sm text-gray-300 mt-1">{recommendation.notes}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
 </div>
);
}
