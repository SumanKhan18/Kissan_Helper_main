import React, { useState } from 'react';
import { Play, Clock, ThumbsUp, Video, Image, Upload, Filter, TrendingUp, Clock4 } from 'lucide-react';

function Tutorials() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tutorials = [
    {
      id: 1,
      title: "Organic Pest Control Methods",
      author: "Farming Expert Sharma",
      thumbnail: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b1d?w=800",
      duration: "15:24",
      views: "2.3K",
      likes: 156,
      category: "organic"
    },
    {
      id: 2,
      title: "Modern Irrigation Techniques",
      author: "AgriTech Solutions",
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      duration: "22:15",
      views: "1.8K",
      likes: 234,
      category: "technology"
    },
    {
      id: 3,
      title: "Soil Health Management",
      author: "Green Revolution",
      thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      duration: "18:45",
      views: "3.1K",
      likes: 289,
      category: "soil"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Videos', icon: Play },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock4 },
    { id: 'organic', label: 'Organic Farming', icon: Filter },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Bar with Upload Button and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Upload className="h-5 w-5" />
          <span>Upload Tutorial</span>
        </button>

        <div className="flex space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap
                ${selectedFilter === filter.id 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <filter.icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map(tutorial => (
          <div key={tutorial.id} className="bg-gray-800 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-200">
            <div className="relative">
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Play className="h-12 w-12 text-white" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {tutorial.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-green-400 transition-colors duration-200">
                {tutorial.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{tutorial.author}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{tutorial.views} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{tutorial.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Upload Tutorial</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter tutorial title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="Enter tutorial description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors duration-200">
                  <input type="file" accept="video/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Video className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">Upload Video</p>
                </div>

                <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors duration-200">
                  <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">Upload Thumbnail</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tutorials;