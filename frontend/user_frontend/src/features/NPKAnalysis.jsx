import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sprout } from 'lucide-react';

export default function SoilNPKAnalysis() {
  const [soilData, setSoilData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleSoilSubmit = async (e) => {
    e.preventDefault();
    setPrediction("ML prediction for NPK values will be implemented here");
  };

  return (
    <div className="relative min-h-screen mt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920"
          alt="Soil Analysis"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl p-8 backdrop-blur-sm bg-opacity-90 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sprout className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Soil NPK Analysis</h1>
          </div>

          <p className="text-gray-300 mb-6">
            Enter soil nutrient values to analyze the soil quality and get recommendations for optimal crop yield.
          </p>

          <form onSubmit={handleSoilSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[{ key: 'nitrogen', label: 'Nitrogen (N)' },
                { key: 'phosphorus', label: 'Phosphorus (P)' },
                { key: 'potassium', label: 'Potassium (K)' }
              ].map(({ key, label }) => (
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
                      setSoilData({ ...soilData, [key]: Math.max(0, Number(e.target.value)) })
                    }
                    className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white p-3 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    placeholder={`Enter ${label}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-black rounded-full font-semibold hover:bg-green-600 transition-all shadow-md"
              >
                Analyze Soil
              </button>
            </div>
          </form>

          {prediction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-md"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Analysis Result</h3>
              <p className="text-gray-300">{prediction}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
