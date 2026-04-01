import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Play, Image as ImageIcon, FileText, Download, Home, Video,
  Users, MessageCircle, Bell, FolderOpen, Upload, X, Menu
} from 'lucide-react';
import Feed from './Feed';
import Tutorials from './Tutorials';
import Community from './Community';
import Notifications from './Notifications';

function Media() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const mediaFiles = [
    {
      id: 1,
      type: 'video',
      title: 'Organic Farming Techniques',
      thumbnail: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b1d?w=800',
      size: '24.5 MB',
      date: '2024-03-15'
    },
    {
      id: 2,
      type: 'image',
      title: 'Crop Disease Analysis',
      thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
      size: '3.2 MB',
      date: '2024-03-14'
    },
    {
      id: 3,
      type: 'document',
      title: 'Soil Analysis Report.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
      size: '1.8 MB',
      date: '2024-03-13'
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'video':
        return <Play className="h-6 w-6 text-blue-400" />;
      case 'image':
        return <ImageIcon className="h-6 w-6 text-green-400" />;
      case 'document':
        return <FileText className="h-6 w-6 text-yellow-400" />;
      default:
        return <FileText className="h-6 w-6 text-gray-400" />;
    }
  };

  const navLinks = [
    { path: '/media', icon: Home, label: 'Home' },
    { path: '/media/feed', icon: FolderOpen, label: 'Feed' },
    { path: '/media/tutorials', icon: Video, label: 'Tutorials' },
    { path: '/media/community', icon: Users, label: 'Community' },
    { path: '/media/notifications', icon: Bell, label: 'Notifications' }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    console.log('Uploading file:', selectedFile);
    setIsUploadModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-hidden flex">

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Clickable header */}
        <Link
          to="/media"
          className="flex items-center space-x-2 mb-8 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FolderOpen className="h-8 w-8 text-green-400" />
          <span className="text-xl font-bold text-white">Media Dashboard</span>
        </Link>

        <nav className="space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => {
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto md:ml-30">
        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center justify-between p-4 bg-gray-800">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-xl text-white font-bold">Media</h2>
        </div>

        <Routes>
          <Route
            index
            element={
              <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Media Library</h2>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload New</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaFiles.map((file) => (
                    <div key={file.id} className="bg-gray-800 rounded-lg overflow-hidden group">
                      <div className="relative aspect-video">
                        <img
                          src={file.thumbnail}
                          alt={file.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Download className="h-8 w-8 text-white cursor-pointer" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {getIcon(file.type)}
                          <h3 className="text-white font-medium truncate">{file.title}</h3>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{file.size}</span>
                          <span>{file.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/community" element={<Community />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/messages"
            element={
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">Messages</h2>
              </div>
            }
          />
        </Routes>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Upload Media</h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors duration-200">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 mb-2">
                  {selectedFile ? selectedFile.name : 'Drag and drop your files here'}
                </p>
                <p className="text-sm text-gray-400">or click to browse (max 100MB)</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                    selectedFile ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Media;
