import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api.js';
import ProfileCard from './ProfileCard';
import { User, Mail, Phone, MapPin, Lock, Save, Edit2, X, Camera } from 'lucide-react';

export default function AdminProfile() {
  const { user, fetchProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [imagePreview, setImagePreview] = useState({
    personalImage: null,
    aadhaarImage: null
  });

  const [imageFiles, setImageFiles] = useState({
    personalImage: null,
    aadhaarImage: null
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles(prev => ({
        ...prev,
        [type]: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => ({
          ...prev,
          [type]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate password if changing
      if (isChangingPassword) {
        if (!formData.currentPassword || !formData.newPassword) {
          setError('Please fill all password fields');
          setLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setError('New password must be at least 6 characters');
          setLoading(false);
          return;
        }
      }

      const formDataToSend = new FormData();
      
      // Add text fields
      if (formData.name) formDataToSend.append('name', formData.name);
      if (formData.email) formDataToSend.append('email', formData.email);
      if (formData.phone) formDataToSend.append('phone', formData.phone);
      if (formData.address) formDataToSend.append('address', formData.address);
      
      // Add password fields if changing password
      if (isChangingPassword) {
        formDataToSend.append('currentPassword', formData.currentPassword);
        formDataToSend.append('newPassword', formData.newPassword);
      }

      // Add image files
      if (imageFiles.personalImage) {
        formDataToSend.append('personalImage', imageFiles.personalImage);
      }
      if (imageFiles.aadhaarImage) {
        formDataToSend.append('aadhaarImage', imageFiles.aadhaarImage);
      }

      const { data } = await API.put('/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setIsChangingPassword(false);
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setImageFiles({
          personalImage: null,
          aadhaarImage: null
        });
        setImagePreview({
          personalImage: null,
          aadhaarImage: null
        });
        await fetchProfile();
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    setImageFiles({
      personalImage: null,
      aadhaarImage: null
    });
    setImagePreview({
      personalImage: null,
      aadhaarImage: null
    });
    setError('');
    setSuccess('');
  };

  if (!user) {
    return (
      <div className="text-white ml-[2.5vw] mr-[2.5vw] flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  const personalImageUrl = imagePreview.personalImage || 
    (user.personalImage ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${user.personalImage}` : null);

  return (
    <div className="text-white ml-[2.5vw] mr-[2.5vw] py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          )}
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
            <ProfileCard
              avatarUrl={personalImageUrl || user.personalImage || ''}
              name={user.name || 'Admin'}
              title={user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              handle={user.email?.split('@')[0] || 'admin'}
              status={user.status === 'success' ? 'Active' : user.status}
              showUserInfo={true}
              contactText="View Details"
              onContactClick={() => {}}
            />
          </div>

          {/* Profile Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Image */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={personalImageUrl || '/default-avatar.png'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer hover:bg-green-600 transition">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, 'personalImage')}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Profile Picture</p>
                    {isEditing && imagePreview.personalImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(prev => ({ ...prev, personalImage: null }));
                          setImageFiles(prev => ({ ...prev, personalImage: null }));
                        }}
                        className="text-xs text-red-400 mt-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <MapPin size={16} />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Aadhaar Number (Read-only) */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={user.aadhaarNumber || 'N/A'}
                    disabled
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 opacity-60 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Aadhaar number cannot be changed</p>
                </div>

                {/* Aadhaar Image */}
                {user.aadhaarImage && (
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      Aadhaar Image
                    </label>
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${user.aadhaarImage}`}
                        alt="Aadhaar"
                        className="w-full max-w-md rounded-lg border border-gray-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {isEditing && (
                        <label className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                          <Camera size={16} />
                          Update Aadhaar Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, 'aadhaarImage')}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Password Change Section */}
                {isEditing && (
                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-2 text-sm text-gray-300">
                        <Lock size={16} />
                        Change Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(!isChangingPassword);
                          setFormData(prev => ({
                            ...prev,
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          }));
                        }}
                        className="text-sm text-green-400 hover:text-green-300"
                      >
                        {isChangingPassword ? 'Cancel' : 'Change Password'}
                      </button>
                    </div>

                    {isChangingPassword && (
                      <div className="space-y-4">
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="Current Password"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                        />
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="New Password"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                        />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
                    >
                      <Save size={18} />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-60"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
