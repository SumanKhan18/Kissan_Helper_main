import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import React from "react";


export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setResult("Healthy Plant - No disease detected");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
    

      <main className="flex-grow pt-16">
        <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80"
              alt="Crops background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex-grow container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center mb-12 "
            >
              <h1 className="text-4xl font-bold text-white mb-6 ">
                Plant Disease Detection
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Early detection of plant diseases is crucial for maintaining healthy crops and maximizing yield.
                Our AI-powered system can identify common plant diseases with high accuracy. Simply upload a
                clear image of the affected plant part, and we will analyze it for you.
              </p>
              <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg bg-transparent">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="text-yellow-500 w-6 h-6 mr-2" />
                  <p className="text-gray-300 text-sm">
                    For best results, ensure the image is well-lit and focused on the affected area
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto "
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 bg-transparent">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center "
                    >
                      <Upload className="w-12 h-12 text-green-500 mb-4" />
                      <span className="text-white font-medium mb-2 ">
                        Click to upload an image
                      </span>
                      <span className="text-gray-400 text-sm">
                        JPG, PNG up to 10MB
                      </span>
                    </label>
                  </div>

                  {preview && (
                    <div className="mt-6">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!selectedImage}
                  className={`w-full py-4 rounded-lg font-medium transition-all ${
                    selectedImage
                      ? "bg-green-500 text-black hover:bg-green-600"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Analyze Image
                </button>
              </form>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-gray-900/80 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle2 className="text-green-500 w-6 h-6 mr-2" />
                    <h3 className="text-xl font-medium text-white">Analysis Result</h3>
                  </div>
                  <p className="text-gray-300">{result}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

   
    </div>
  );
}