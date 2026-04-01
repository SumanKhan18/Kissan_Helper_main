import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Clock, CalendarRange, CheckCircle, RefreshCcw } from 'lucide-react';
import Switch from '../block/Switch';
import API from '../api.js';
import { useLanguage } from '../context/LanguageContext';
import { playSystemAlertSound } from '../utils/notificationSound';

const defaultMessage = 'We are currently performing scheduled maintenance. Please check back soon.';

export default function AdminMaintenance() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState(defaultMessage);
  const [durationMinutes, setDurationMinutes] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduling, setScheduling] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [systemAlertEnabled, setSystemAlertEnabled] = useState(true);

  // Fetch settings to check if system alerts are enabled
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await API.get('/settings');
        if (data.success && data.settings) {
          setSystemAlertEnabled(data.settings.systemAlertSound !== false);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();
  }, []);

  // Play alert sound when maintenance is turned ON
  useEffect(() => {
    if (status?.isActive && systemAlertEnabled) {
      // Play sound when maintenance becomes active
      playSystemAlertSound();
    }
  }, [status?.isActive, systemAlertEnabled]);

  const fetchMaintenance = async () => {
    setLoading(true);
    setError('');
    try {
      const [statusRes, historyRes] = await Promise.all([
        API.get('/maintenance/status'),
        API.get('/maintenance/history'),
      ]);
      const maintenance = statusRes.data?.maintenance ?? null;
      setStatus(maintenance);
      setHistory(historyRes.data?.history ?? []);
      
      if (maintenance?.message) {
        setMessage(maintenance.message);
      }
    } catch (err) {
      console.error('Failed to load maintenance data:', err);
      setError(err?.response?.data?.message || 'Unable to load maintenance data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenance();
    
    // Set up interval to update remaining time every second
    const interval = setInterval(() => {
      if (status?.isActive && status?.startTime && status?.durationMinutes > 0) {
        const startTime = new Date(status.startTime);
        const endTime = new Date(startTime.getTime() + status.durationMinutes * 60000);
        const now = new Date();
        const remaining = endTime - now;
        
        if (remaining > 0) {
          const minutes = Math.floor(remaining / 60000);
          const seconds = Math.floor((remaining % 60000) / 1000);
          setRemainingTime({ minutes, seconds, total: remaining });
        } else {
          setRemainingTime(null);
          // Refresh status to get updated state
          fetchMaintenance();
        }
      } else {
        setRemainingTime(null);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [status?.isActive, status?.startTime, status?.durationMinutes]);

  const handleToggle = async (nextValue) => {
    setToggling(true);
    setError('');
    try {
      const isActive = Boolean(nextValue);
      const payload = {
        isActive,
        message,
        type: isActive ? 'emergency' : status?.type ?? 'emergency',
        durationMinutes: Number(durationMinutes) || 0,
      };
      const { data } = await API.post('/maintenance/toggle', payload);
      setStatus(data?.maintenance ?? null);
      
      // Play alert sound when turning ON (if enabled)
      if (isActive && systemAlertEnabled) {
        playSystemAlertSound();
      }
      
      if (isActive) {
        setDurationMinutes('');
      }
    } catch (err) {
      console.error('Failed to toggle maintenance:', err);
      setError(err?.response?.data?.message || 'Unable to update maintenance status.');
    } finally {
      setToggling(false);
      fetchMaintenance();
    }
  };

  const handleSchedule = async (event) => {
    event.preventDefault();
    setScheduling(true);
    setError('');
    try {
      const duration = Number(durationMinutes) || 0;
      if (duration <= 0) {
        setError('Please enter a valid duration for scheduled maintenance.');
        setScheduling(false);
        return;
      }
      
      await API.post('/maintenance/schedule', {
        date: scheduleDate,
        time: scheduleTime,
        durationMinutes: duration,
        message,
      });
      setScheduleDate('');
      setScheduleTime('');
      setDurationMinutes('');
      await fetchMaintenance();
    } catch (err) {
      console.error('Failed to schedule maintenance:', err);
      setError(err?.response?.data?.message || 'Unable to schedule maintenance.');
    } finally {
      setScheduling(false);
    }
  };

  const activeStatus = useMemo(() => {
    if (!status?.isActive) return null;
    const started = status?.startTime ? new Date(status.startTime) : null;
    return {
      message: status?.message ?? defaultMessage,
      startedAt: started ? started.toLocaleString() : '—',
      type: status?.type ?? 'emergency',
      durationMinutes: status?.durationMinutes ?? 0,
    };
  }, [status]);

  return (
    <div className="text-white ml-[2.5vw] mr-[2.5vw]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('maintenanceModeTitle')}</h1>
          <p className="text-gray-400 mt-1">{t('maintenanceModeDesc')}</p>
        </div>
        <button
          onClick={fetchMaintenance}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition disabled:opacity-60"
        >
          <RefreshCcw size={18} />
          {t('refresh')}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{t('immediateMaintenance')}</h2>
                <p className="text-sm text-gray-400">{t('immediateMaintenanceDesc')}</p>
              </div>
              <Switch
                checked={Boolean(status?.isActive)}
                onChange={handleToggle}
                disabled={toggling}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-gray-300">
                {t('maintenanceMessage')}
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={3}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </label>

              <label className="block text-sm text-gray-300">
                {t('duration')}
                <input
                  type="number"
                  min="0"
                  placeholder={t('durationPlaceholder')}
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(event.target.value)}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </label>

              {activeStatus ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-red-200 font-semibold">{t('activeStatus')}: {t('activeStatus')}</p>
                      <p className="text-sm text-red-100 mt-1">{activeStatus.message}</p>
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-red-200">{t('startedAt')}: {activeStatus.startedAt}</p>
                        <p className="text-xs text-red-200">{t('type')}: {activeStatus.type}</p>
                        {activeStatus.durationMinutes > 0 && remainingTime && (
                          <p className="text-xs text-red-200">
                            {t('remainingTime')}: {remainingTime.minutes}m {remainingTime.seconds}s
                          </p>
                        )}
                        {activeStatus.durationMinutes === 0 && (
                          <p className="text-xs text-red-200">{t('duration')}: {t('durationPlaceholder')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <p className="text-green-200">{t('systemIsOnline')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4">{t('scheduledMaintenance')}</h2>
            <form onSubmit={handleSchedule} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm text-gray-300">
                {t('scheduleDate')}
                <input
                  type="date"
                  required
                  value={scheduleDate}
                  onChange={(event) => setScheduleDate(event.target.value)}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </label>
              <label className="block text-sm text-gray-300">
                {t('scheduleTime')}
                <input
                  type="time"
                  required
                  value={scheduleTime}
                  onChange={(event) => setScheduleTime(event.target.value)}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </label>
              <label className="block text-sm text-gray-300 md:col-span-2">
                {t('duration')} - {t('requiredForScheduledMaintenance')}
                <input
                  type="number"
                  min="1"
                  required
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(event.target.value)}
                  placeholder={t('enterDurationInMinutes')}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
                />
              </label>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={scheduling}
                  className="w-full md:w-auto px-4 py-2 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
                >
                  {scheduling ? t('scheduling') : t('scheduleMaintenance')}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
          <h2 className="text-xl font-semibold">{t('history')}</h2>
          <p className="text-sm text-gray-400 mb-4">{t('recentMaintenanceEvents')}</p>
          {loading ? (
            <p className="text-sm text-gray-400">{t('loadingHistory')}</p>
          ) : history.length === 0 ? (
            <p className="text-sm text-gray-400">{t('noHistory')}</p>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
              {history.map((item) => (
                <div key={item._id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span className="capitalize">{item.type}</span>
                    <span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : '—'}</span>
                  </div>
                  <p className="text-gray-100 mt-2 text-sm">{item.message}</p>
                  <div className="mt-3 text-xs text-gray-400 space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock size={12} />
                      <span>{t('duration')}: {item.durationMinutes || 0} {t('minutes')}</span>
                    </div>
                    {item.startTime && (
                      <div className="flex items-center gap-2">
                        <CalendarRange size={12} />
                        <span>{t('start')}: {new Date(item.startTime).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${item.isActive ? 'bg-red-500/20 text-red-300' : 'bg-gray-700 text-gray-400'}`}>
                        {item.isActive ? t('active') : t('inactive')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}