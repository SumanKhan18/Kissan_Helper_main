import { useState, useEffect, useRef } from 'react';
import { Save, Globe, Bell, Palette, Mail, Smartphone, Volume2 } from 'lucide-react';
import API from '../api.js';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Notification sound function
const playNotificationSound = () => {
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUREPUqzn77FdGAg+ltryy3kpBSuBzvLYiTYIGWm98OSdTQ8OUKjk8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVERD1Ks5++xXRgIPpba8st5KQUrgc7y2Ik2CBlpvfDknU0PDlCo5PC2YxwGOJHX8sx5LAUkd8fw3ZBACxRd');
  audio.volume = 0.3;
  audio.play().catch(() => {
    // Ignore audio play errors
  });
};

export default function AdminSettings() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    language: 'en',
    theme: 'dark',
    newUserAlertSound: true,
    paymentAlertSound: true,
    systemAlertSound: true,
  });

  // Fixed values (not editable)
  const fixedSettings = {
    siteName: 'Kissan Helper Admin',
    contactEmail: 'sumankhan2909@gmail.com',
    phoneNumber: '+91 8942938405',
    timezone: 'India (IST)',
    emailNotifications: true,
    smsNotifications: true,
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await API.get('/settings');
      if (data.success && data.settings) {
        setSettings({
          language: data.settings.language || 'en',
          theme: data.settings.theme || 'dark',
          newUserAlertSound: data.settings.newUserAlertSound !== false,
          paymentAlertSound: data.settings.paymentAlertSound !== false,
          systemAlertSound: data.settings.systemAlertSound !== false,
        });
        setLanguage(data.settings.language || 'en');
        setTheme(data.settings.theme || 'dark');
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSettings(prev => ({ ...prev, language: newLanguage }));
    setLanguage(newLanguage);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSettings(prev => ({ ...prev, theme: newTheme }));
    setTheme(newTheme);
  };

  const handleAlertSoundChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
    
    // Play test sound when toggling
    if (checked) {
      playNotificationSound();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await API.put('/settings', {
        language: settings.language,
        theme: settings.theme,
        newUserAlertSound: settings.newUserAlertSound,
        paymentAlertSound: settings.paymentAlertSound,
        systemAlertSound: settings.systemAlertSound,
      });

      if (data.success) {
        setSuccess(t('settingsSaved'));
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'bn', label: 'Bengali (Bangla)' },
    { value: 'hi', label: 'Hindi' },
  ];

  return (
    <div className="text-white relative ml-[2.5vw] mr-[2.5vw]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('settings')}</h1>
        <p className="text-gray-400 mt-1">Configure your application settings</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden sticky top-6">
            <nav className="p-2">
              <a href="#general" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-white">
                <Globe size={20} />
                <span>{t('generalSettings')}</span>
              </a>
              <a href="#notifications" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Bell size={20} />
                <span>{t('notifications')}</span>
              </a>
              <a href="#appearance" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Palette size={20} />
                <span>{t('appearance')}</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <form id="general" onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">{t('generalSettings')}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {t('siteName')}
                </label>
                <input
                  type="text"
                  value={fixedSettings.siteName}
                  disabled
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 opacity-60 cursor-not-allowed"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {t('contactEmail')}
                    </div>
                  </label>
                  <input
                    type="email"
                    value={fixedSettings.contactEmail}
                    disabled
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 opacity-60 cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} />
                      {t('phoneNumber')}
                    </div>
                  </label>
                  <input
                    type="text"
                    value={fixedSettings.phoneNumber}
                    disabled
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('language')}
                  </label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleLanguageChange}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                  >
                    {languageOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('timezone')}
                  </label>
                  <input
                    type="text"
                    value={fixedSettings.timezone}
                    disabled
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-60"
              >
                <Save size={18} />
                {loading ? 'Saving...' : t('saveChanges')}
              </button>
            </div>
          </form>

          {/* Notification Settings */}
          <form id="notifications" onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">{t('notifications')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">{t('emailNotifications')}</h3>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <div className="w-11 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">Always Enabled</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">{t('smsNotifications')}</h3>
                  <p className="text-sm text-gray-400">Receive notifications via SMS</p>
                </div>
                <div className="w-11 h-6 bg-green-500 rounded-lg flex items-center justify-end px-1">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">Always Enabled</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-gray-400" />
                    <h3 className="font-medium">{t('newUserAlerts')}</h3>
                  </div>
                  <p className="text-sm text-gray-400">Play sound when new users register</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="newUserAlertSound"
                    checked={settings.newUserAlertSound}
                    onChange={handleAlertSoundChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-gray-400" />
                    <h3 className="font-medium">{t('paymentAlerts')}</h3>
                  </div>
                  <p className="text-sm text-gray-400">Play sound for payment activities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="paymentAlertSound"
                    checked={settings.paymentAlertSound}
                    onChange={handleAlertSoundChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-gray-400" />
                    <h3 className="font-medium">{t('systemAlerts')}</h3>
                  </div>
                  <p className="text-sm text-gray-400">Play sound for system events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="systemAlertSound"
                    checked={settings.systemAlertSound}
                    onChange={handleAlertSoundChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-60"
              >
                <Save size={18} />
                {loading ? 'Saving...' : t('saveChanges')}
              </button>
            </div>
          </form>

          {/* Appearance Settings */}
          <form id="appearance" onSubmit={handleSubmit} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">{t('appearance')}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {t('theme')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.theme === 'light' 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={settings.theme === 'light'}
                      onChange={handleThemeChange}
                      className="sr-only"
                    />
                    <div className="w-16 h-16 bg-white rounded-lg mb-2 border border-gray-300"></div>
                    <span className="text-sm font-medium">{t('lightMode')}</span>
                  </label>
                  
                  <label className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.theme === 'dark' 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={settings.theme === 'dark'}
                      onChange={handleThemeChange}
                      className="sr-only"
                    />
                    <div className="w-16 h-16 bg-gray-900 rounded-lg mb-2 border border-gray-700"></div>
                    <span className="text-sm font-medium">{t('darkMode')}</span>
                  </label>
                  
                  <label className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.theme === 'system' 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      checked={settings.theme === 'system'}
                      onChange={handleThemeChange}
                      className="sr-only"
                    />
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-900 rounded-lg mb-2 border border-gray-700"></div>
                    <span className="text-sm font-medium">{t('systemMode')}</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-60"
              >
                <Save size={18} />
                {loading ? 'Saving...' : t('saveChanges')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}