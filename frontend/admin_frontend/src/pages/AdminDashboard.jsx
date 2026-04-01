import { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  CreditCard,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import API from '../api';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { LayoutDashboard } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [overview, setOverview] = useState(null);
  const [activity, setActivity] = useState({ months: [], registrations: [], logins: [] });
  const [revenue, setRevenue] = useState([]);
  const [plans, setPlans] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [overviewRes, activityRes, revenueRes, plansRes, recentRes] = await Promise.all([
          API.get('/dashboard/overview'),
          API.get('/dashboard/user-activity'),
          API.get('/dashboard/revenue'),
          API.get('/dashboard/plan-distribution'),
          API.get('/dashboard/recent-activities'),
        ]);

        setOverview(overviewRes.data?.data ?? null);
        setActivity(activityRes.data?.data ?? { months: [], registrations: [], logins: [] });
        setRevenue(revenueRes.data?.data ?? []);

        const planData = plansRes.data?.data?.plans ?? {};
        const formattedPlans = Object.entries(planData).map(([name, value]) => ({
          name,
          value,
        }));
        setPlans(formattedPlans);

        setActivities(recentRes.data?.data?.activities ?? []);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        setError(err.response?.data?.message || 'Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = useMemo(() => ({
    totalUsers: overview?.totalUsers ?? 0,
    activeUsers: overview?.activeUsers ?? 0,
    totalRevenue: overview?.totalRevenue ?? 0,
    monthlyRevenue: overview?.monthlyRevenue ?? 0,
    growth: overview?.growth ?? {},
  }), [overview]);

  const userActivityData = useMemo(() => {
    const months = activity.months ?? [];
    return months.map((month, index) => ({
      name: month,
      registrations: activity.registrations?.[index] ?? 0,
      logins: activity.logins?.[index] ?? 0,
    }));
  }, [activity]);

  const StatCard = ({ title, value, icon, change, isPositive }) => (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">{icon}</div>
      </div>
      {change && (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-sm">{t('vsLastMonth')}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-10 relative min-h-screen overflow-hidden">
      <div className="relative z-10 mb-5">
        {/* Plasma Background */}
        {/* <div className="absolute inset-0 z-0">
          <Plasma
            color="#ff6b35"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={true}
          />
        </div> */}

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('dashboardTitle')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('dashboardWelcome')}</p>
          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner 
            message={t('loadingDashboard')} 
            subMessage="Loading dashboard statistics and charts"
            icon={LayoutDashboard}
            size="lg"
          />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <StatCard
                title={t('totalUsers')}
                value={stats.totalUsers.toLocaleString()}
                icon={<Users className="w-6 h-6 text-blue-500" />}
                change={stats.growth?.users}
                isPositive={!stats.growth?.users || !stats.growth?.users.includes('-')}
              />
              <StatCard
                title={t('activeUsers')}
                value={stats.activeUsers.toLocaleString()}
                icon={<Users className="w-6 h-6 text-green-500" />}
                change={stats.growth?.activeUsers}
                isPositive={!stats.growth?.activeUsers || !stats.growth?.activeUsers.includes('-')}
              />
              <StatCard
                title={t('totalRevenue')}
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                icon={<CreditCard className="w-6 h-6 text-purple-500" />}
                change={stats.growth?.totalRevenue}
                isPositive={!stats.growth?.totalRevenue || !stats.growth?.totalRevenue.includes('-')}
              />
              <StatCard
                title={t('monthlyRevenue')}
                value={`₹${stats.monthlyRevenue.toLocaleString()}`}
                icon={<TrendingUp className="w-6 h-6 text-yellow-500" />}
                change={stats.growth?.monthlyRevenue}
                isPositive={!stats.growth?.monthlyRevenue || !stats.growth?.monthlyRevenue.includes('-')}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* User Activity */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('userActivity')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                      itemStyle={{ color: '#F9FAFB' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Legend />
                    <Bar dataKey="registrations" fill="#44ad17" radius={[4, 4, 0, 0]} isAnimationActive />
                    <Bar dataKey="logins" fill="#22d3ee" radius={[4, 4, 0, 0]} isAnimationActive />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('revenue')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                      itemStyle={{ color: '#F9FAFB' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#44ad17" strokeWidth={2} dot={{ r: 4 }} isAnimationActive />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Plan Distribution */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('planDistribution')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={plans}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {plans.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '0.5rem' }}
                      itemStyle={{ color: '#F9FAFB' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activities */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 lg:col-span-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('recentActivities')}</h3>
                <div className="space-y-4">
                  {activities.map((item, index) => (
                    <div key={`${item.userId}-${index}`} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium capitalize">{item.type?.replaceAll('_', ' ')}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.userName} ({item.email})</p>
                        <p className="text-gray-500 text-xs mt-1">{new Date(item.time).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('noRecentActivities')}</p>
                  )}
                </div>
                <button className="mt-4 w-full py-2 text-green-500 hover:text-green-400 transition-colors">
                  {t('viewAllActivities')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
