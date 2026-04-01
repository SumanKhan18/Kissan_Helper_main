import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api.js";
import { Mail, Phone, MapPin, User, Shield, CheckCircle, Clock, Camera, Save, X } from "lucide-react";

// Helper function to resize image
const resizeImage = (file, maxWidth = 400, maxHeight = 400, quality = 0.9) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          file.type,
          quality
        );
      };
    };
      });
    };

export default function ProfileCard() {
  const { user, fetchProfile } = useAuth();
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  // Update image URL when user data changes
  useEffect(() => {
    if (user?.personalImage) {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const imagePath = user.personalImage.startsWith('uploads/') 
        ? user.personalImage 
        : `uploads/${user.personalImage}`;
      setCurrentImageUrl(`${baseUrl}/${imagePath}`);
      setImageError(false);
    } else {
      setCurrentImageUrl(null);
      setImageError(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-white text-center">
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Get profile image URL - prioritize preview, then current URL
  const personalImageUrl = imagePreview || currentImageUrl;
  const hasImage = personalImageUrl && !imageError;

  const statusColor = user?.status === 'success' 
    ? 'bg-green-500' 
    : user?.status === 'pending' 
    ? 'bg-yellow-500' 
    : 'bg-red-500';

  const statusText = user?.status === 'success' 
    ? 'Active' 
    : user?.status === 'pending' 
    ? 'Pending Approval' 
    : 'Denied';

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 10MB before resizing)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }

      setError("");
      
      try {
        // Resize image to 400x400 max (optimal for profile photos)
        const resizedFile = await resizeImage(file, 400, 400, 0.9);
        setImageFile(resizedFile);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(resizedFile);
        setIsEditingPhoto(true);
      } catch (err) {
        setError('Failed to process image. Please try again.');
        console.error('Image resize error:', err);
      }
      }
    };

  const handleUploadPhoto = async () => {
    if (!imageFile) {
      setError('Please select an image to upload');
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append('personalImage', imageFile);

      const { data } = await API.put('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        setSuccess('Profile photo updated successfully!');
        setIsEditingPhoto(false);
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Refresh profile to get updated image URL
        await fetchProfile();
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile photo');
    } finally {
      setUploading(false);
    }
  };

  const handleCancelPhoto = () => {
    setIsEditingPhoto(false);
    setImageFile(null);
    setImagePreview(null);
    setError("");
    setSuccess("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-400">View your account information</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 text-green-300 text-sm rounded-lg p-3">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  {hasImage ? (
                    <img
                      src={personalImageUrl}
                      alt={user.name || "Profile"}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 transition-opacity"
                      style={{
                        width: '128px',
                        height: '128px',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                      onError={(e) => {
                        setImageError(true);
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-32 h-32 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center text-4xl font-bold text-white ${!hasImage ? 'flex' : 'hidden'}`}
                    style={{ width: '128px', height: '128px' }}
                  >
                    {(user.name || 'A').charAt(0).toUpperCase()}
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`absolute bottom-0 right-0 w-6 h-6 ${statusColor} rounded-full border-4 border-gray-900 z-10`}></div>
                  
                  {/* Upload Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
                    <label className="cursor-pointer p-2">
                      <Camera size={24} className="text-white" />
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mt-4">{user.name || 'Admin'}</h2>
                <p className="text-gray-400 mt-1 capitalize">
                  {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                </p>
                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColor} text-white`}>
                  {statusText}
                </div>

                {/* Photo Upload Controls */}
                {isEditingPhoto && (
                  <div className="mt-4 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleUploadPhoto}
                        disabled={uploading}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
                      >
                        <Save size={16} />
                        {uploading ? 'Uploading...' : 'Save Photo'}
                      </button>
                <button
                        onClick={handleCancelPhoto}
                        disabled={uploading}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-60"
                      >
                        <X size={16} />
                </button>
                    </div>
                    <p className="text-xs text-gray-400 text-center">
                      Image will be automatically resized
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="space-y-3 border-t border-gray-800 pt-4">
                {user.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-300 truncate">{user.email}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-300">{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                    <span className="text-gray-300">{user.address}</span>
              </div>
            )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <p className="text-white mt-1 font-medium">{user.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email Address</label>
                  <p className="text-white mt-1 font-medium">{user.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone Number</label>
                  <p className="text-white mt-1 font-medium">{user.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Role</label>
                  <p className="text-white mt-1 font-medium capitalize">
                    {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-400">Address</label>
                  <p className="text-white mt-1 font-medium">{user.address || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Aadhaar Number</label>
                  <p className="text-white mt-1 font-medium">{user.aadhaarNumber || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Account Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {user.status === 'success' ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : user.status === 'pending' ? (
                      <Clock size={16} className="text-yellow-500" />
                    ) : (
                      <Shield size={16} className="text-red-500" />
                    )}
                    <p className="text-white font-medium capitalize">{statusText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield size={20} />
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Payment Status</label>
                  <p className="text-white mt-1 font-medium capitalize">
                    {user.paymentStatus === 'done' ? (
                      <span className="text-green-400">Completed</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Member Since</label>
                  <p className="text-white mt-1 font-medium">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
