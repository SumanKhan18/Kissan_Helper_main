import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Trash2, RefreshCcw, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import API from '../api.js';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Offline', value: 'offline' },
];

const SUBSCRIPTION_OPTIONS = [
  { label: 'All Plans', value: 'all' },
  { label: 'Free', value: 'Free' },
  { label: 'Premium', value: 'Premium' },
];

const ITEMS_PER_PAGE = 8;

export default function AdminUsers() {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', status: 'all', subscription: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const STATUS_OPTIONS = [
    { label: t('allStatuses'), value: 'all' },
    { label: t('online'), value: 'online' },
    { label: t('offline'), value: 'offline' },
  ];

  const SUBSCRIPTION_OPTIONS = [
    { label: t('allPlans'), value: 'all' },
    { label: t('free'), value: 'Free' },
    { label: t('premium'), value: 'Premium' },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.get('/users');
      setUsers(data?.users ?? []);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError(err?.response?.data?.message || 'Unable to fetch users from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesSearch = [user.name, user.email, user.location]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(filters.search.toLowerCase()));

        const matchesStatus = filters.status === 'all' || user.status === filters.status;
        const matchesSubscription =
          filters.subscription === 'all' || user.subscription === filters.subscription;

        return matchesSearch && matchesStatus && matchesSubscription;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filters.search, filters.status, filters.subscription, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const displayedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await API.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError(err?.response?.data?.message || 'Unable to delete user. Try again later.');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="text-gray-900 dark:text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold ml-[2.5vw] mr-[2.5vw]">{t('usersTitle')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 ml-[2.5vw] mr-[2.5vw]">{t('usersDesc')}</p>
        </div>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="ml-[2.5vw] mr-[2.5vw] inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-60"
        >
          <RefreshCcw size={18} />
          {t('refresh')}
        </button>
      </div>

      {error && (
        <div className="ml-[2.5vw] mr-[2.5vw] mb-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 ml-[2.5vw] mr-[2.5vw] mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="w-full sm:w-48 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filters.subscription}
              onChange={(event) => setFilters((prev) => ({ ...prev, subscription: event.target.value }))}
              className="w-full sm:w-48 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:ring-green-500"
            >
              {SUBSCRIPTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden ml-[2.5vw] mr-[2.5vw]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
                <th className="px-4 py-3 text-left">{t('user')}</th>
                <th className="px-4 py-3 text-left">{t('status')}</th>
                <th className="px-4 py-3 text-left">{t('location')}</th>
                <th className="px-4 py-3 text-left">{t('subscription')}</th>
                <th className="px-4 py-3 text-left">{t('joined')}</th>
                <th className="px-4 py-3 text-left">{t('lastActive')}</th>
                <th className="px-4 py-3 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12">
                    <LoadingSpinner 
                      message={t('loadingUsers')} 
                      subMessage="Fetching user data from the database"
                      icon={Users}
                      size="md"
                    />
                  </td>
                </tr>
              ) : displayedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-600 dark:text-gray-400">
                    {t('noUsersFound')}
                  </td>
                </tr>
              ) : (
                displayedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white font-medium">{user.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-500">{user.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'online'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-300'
                        }`}
                      >
                        {user.status ?? 'unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{user.location ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.subscription === 'Premium'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {user.subscription ?? 'Free'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {user.lastActive ? new Date(user.lastActive).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingId === user._id}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/20 transition disabled:opacity-60"
                      >
                        <Trash2 size={16} />
                        {deletingId === user._id ? 'Deleting…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-gray-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -
            {' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}