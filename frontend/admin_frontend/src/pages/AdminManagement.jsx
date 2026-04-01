import { useState, useEffect } from 'react';
import { Users, User, Mail, Phone, MapPin, Shield, Clock, Wifi, WifiOff, Timer, RefreshCw } from 'lucide-react';
import API, { RootAPI } from '../api.js';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import DateTimeDisplay from '../components/DateTimeDisplay';

export default function AdminManagement() {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [allAdmins, setAllAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchAdminData();
    fetchUpcomingDeadlines();
    // Refresh data every 15 seconds to update online status more frequently
    const interval = setInterval(() => {
      fetchAdminData(false);
      fetchUpcomingDeadlines();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchAdminData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);
      setError('');

      // Fetch current admin and all admins in parallel
      const [currentResponse, allResponse] = await Promise.all([
        API.get('/current'),
        API.get('/all')
      ]);

      if (currentResponse.data.success) {
        setCurrentAdmin(currentResponse.data.admin);
      }

      if (allResponse.data.success) {
        // Filter out current admin from all admins list
        const otherAdmins = allResponse.data.admins.filter(
          admin => admin._id !== currentResponse.data.admin._id
        );
        setAllAdmins(otherAdmins);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.message || 'Failed to fetch admin data');
    } finally {
      if (showLoading) setLoading(false);
      else setRefreshing(false);
    }
  };

  const fetchUpcomingDeadlines = async () => {
    try {
      const response = await RootAPI.get('/api/policies');
      if (response.data.success && response.data.policies) {
        const now = new Date();
        const upcoming = response.data.policies
          .filter(policy => {
            if (!policy.deadline) return false;
            const deadline = new Date(policy.deadline);
            return deadline > now && policy.status === 'active';
          })
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, 3); // Show top 3 upcoming deadlines
        setUpcomingDeadlines(upcoming);
      }
    } catch (err) {
      console.error('Error fetching deadlines:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;

    if (diff <= 0) return { expired: true, text: 'Expired' };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      return { expired: false, text: `${days}d ${hours}h ${minutes}m`, days, hours, minutes, seconds };
    } else if (hours > 0) {
      return { expired: false, text: `${hours}h ${minutes}m ${seconds}s`, days, hours, minutes, seconds };
    } else if (minutes > 0) {
      return { expired: false, text: `${minutes}m ${seconds}s`, days, hours, minutes, seconds };
    } else {
      return { expired: false, text: `${seconds}s`, days, hours, minutes, seconds };
    }
  };

  const AdminCard = ({ admin, isCurrent = false }) => {
    const imageUrl = admin.personalImage
      ? `${BASE_URL}/${admin.personalImage.startsWith('uploads/') ? admin.personalImage : `uploads/${admin.personalImage}`}`
      : null;

    return (
      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl border ${
          isCurrent
            ? 'border-green-500 shadow-2xl shadow-green-500/30 ring-2 ring-green-500/20'
            : 'border-gray-700 dark:border-gray-700 hover:border-gray-600'
        } p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-600 dark:border-gray-500 shadow-lg">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={admin.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div className={`w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner ${imageUrl ? 'hidden' : 'flex'}`}>
                  {(admin.name || 'A').charAt(0).toUpperCase()}
                </div>
              </div>
              {/* Online/Offline indicator with pulse animation */}
              <div
                className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-3 border-gray-900 dark:border-gray-800 ${
                  admin.isOnline === true
                    ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' 
                    : 'bg-gray-500'
                }`}
                title={admin.isOnline === true ? 'Online' : 'Offline'}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{admin.name}</h3>
                {isCurrent && (
                  <span className="px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-green-600 text-black rounded-full shadow-lg">
                    You
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                {admin.isOnline === true ? (
                  <>
                    <Wifi size={16} className="text-green-400 animate-pulse" />
                    <span className="text-sm text-green-400 font-semibold">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 font-medium">Offline</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
            admin.role === 'superadmin'
              ? 'bg-gradient-to-r from-purple-500/30 to-purple-600/30 text-purple-300 border border-purple-500/50'
              : 'bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-300 border border-blue-500/50'
          }`}>
            {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
            <Mail size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm truncate">{admin.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
            <Phone size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm">{admin.phone}</span>
          </div>
          {admin.address && (
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <MapPin size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm truncate">{admin.address}</span>
            </div>
          )}
          {/* Only show Aadhaar number for current admin */}
          {isCurrent && admin.aadhaarNumber && (
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
              <Shield size={16} className="text-gray-400 flex-shrink-0" />
              <span className="text-sm">Aadhaar: {admin.aadhaarNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-400 text-xs pt-3 border-t border-gray-700/50">
            <Clock size={14} />
            <span>Last Active: {formatDate(admin.lastActive)}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-white relative ml-[2.5vw] mr-[2.5vw]">
        <LoadingSpinner 
          message="Loading admin data..." 
          subMessage="Please wait while we fetch the information"
          icon={Users}
          size="lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white relative ml-[2.5vw] mr-[2.5vw]">
        <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border-2 border-red-500/30 text-red-300 rounded-xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="font-bold text-lg">Error Loading Data</p>
          </div>
          <p className="text-sm mb-4 text-red-200">{error}</p>
          <button
            onClick={() => fetchAdminData()}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const onlineCount = allAdmins.filter(admin => admin.isOnline === true).length;
  const totalCount = allAdmins.length;

  return (
    <div className="text-white relative ml-[2.5vw] mr-[2.5vw]">
      {/* Header with Refresh */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Management
            </h1>
          </div>
          <p className="text-gray-400 mt-1">View and manage all administrators in the system</p>
        </div>
        
        {/* Refresh Button */}
        <button
          onClick={() => fetchAdminData(false)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Upcoming Deadlines Section */}
      {upcomingDeadlines.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Timer className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-300">Upcoming Deadlines</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {upcomingDeadlines.map((policy, index) => {
              const timeRemaining = calculateTimeRemaining(policy.deadline);
              return (
                <div key={index} className="bg-gray-900/50 rounded-lg p-3 border border-orange-500/20">
                  <div className="text-sm font-semibold text-white mb-1 truncate">{policy.title}</div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${
                      timeRemaining.expired 
                        ? 'bg-red-500/30 text-red-300'
                        : timeRemaining.days < 1
                        ? 'bg-red-500/30 text-red-300 animate-pulse'
                        : timeRemaining.days < 3
                        ? 'bg-orange-500/30 text-orange-300'
                        : 'bg-green-500/30 text-green-300'
                    }`}>
                      {timeRemaining.expired ? 'Expired' : timeRemaining.text}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(policy.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-700 p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Admins</p>
              <p className="text-3xl font-bold text-white">{totalCount + 1}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-700 p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Online Now</p>
              <p className="text-3xl font-bold text-green-400">
                {onlineCount + (currentAdmin?.isOnline === true ? 1 : 0)}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Wifi className="h-8 w-8 text-green-400 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-700 p-5 shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Offline</p>
              <p className="text-3xl font-bold text-gray-400">
                {totalCount - onlineCount + (currentAdmin?.isOnline === true ? 0 : 1)}
              </p>
            </div>
            <div className="p-3 bg-gray-500/20 rounded-lg">
              <WifiOff className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Admin Section */}
      {currentAdmin && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-green-500/20 rounded-lg">
              <User className="h-5 w-5 text-green-400" />
            </div>
            <span>Your Profile</span>
          </h2>
          <AdminCard admin={currentAdmin} isCurrent={true} />
        </div>
      )}

      {/* Other Admins Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/20 rounded-lg">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <span>Other Administrators ({allAdmins.length})</span>
        </h2>
        {allAdmins.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-700 p-12 text-center shadow-lg">
            <Users className="h-16 w-16 text-gray-500 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">No other administrators found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAdmins.map((admin) => (
              <AdminCard key={admin._id} admin={admin} isCurrent={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
