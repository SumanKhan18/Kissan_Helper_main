import User from '../models/dummyUser.model.js';
import Payment from '../models/payment.model.js';
import Activity from '../models/activity.model.js';

// === Helpers ===
const startOfMonth = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth(), 1);

const endOfMonth = (d = new Date()) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

const addMonths = (d, n) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);

const pct = (curr, prev) => {
  if (!prev) return '∞%';
  const val = ((curr - prev) / prev) * 100;
  return `${val.toFixed(1)}%`;
};

// ==============================
// 1) Overview (top cards)
// ==============================
export const getOverview = async (req, res) => {
  try {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const prevMonthStart = startOfMonth(addMonths(now, -1));
    const prevMonthEnd = endOfMonth(addMonths(now, -1));

    // Users
    const [totalUsers, activeUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({
        $or: [
          { status: 'online' },
          { lastActive: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } }
        ]
      })
    ]);

    // Revenue
    const [totalRevenueAgg, monthlyRevenueAgg, prevMonthlyRevenueAgg] =
      await Promise.all([
        Payment.aggregate([
          { $match: { status: 'success' } },
          { $group: { _id: null, sum: { $sum: '$amount' } } }
        ]),
        Payment.aggregate([
          {
            $match: {
              status: 'success',
              createdAt: { $gte: thisMonthStart, $lte: thisMonthEnd }
            }
          },
          { $group: { _id: null, sum: { $sum: '$amount' } } }
        ]),
        Payment.aggregate([
          {
            $match: {
              status: 'success',
              createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd }
            }
          },
          { $group: { _id: null, sum: { $sum: '$amount' } } }
        ])
      ]);

    const totalRevenue = totalRevenueAgg[0]?.sum || 0;
    const monthlyRevenue = monthlyRevenueAgg[0]?.sum || 0;
    const prevMonthlyRevenue = prevMonthlyRevenueAgg[0]?.sum || 0;

    // Growth comparisons
    const [thisMonthUsers, prevMonthUsers] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: thisMonthStart, $lte: thisMonthEnd } }),
      User.countDocuments({ createdAt: { $gte: prevMonthStart, $lte: prevMonthEnd } })
    ]);
    const usersGrowth = pct(thisMonthUsers, prevMonthUsers);

    const [thisMonthActive, prevMonthActive] = await Promise.all([
      User.countDocuments({ lastActive: { $gte: thisMonthStart, $lte: thisMonthEnd } }),
      User.countDocuments({ lastActive: { $gte: prevMonthStart, $lte: prevMonthEnd } })
    ]);
    const activeUsersGrowth = pct(thisMonthActive, prevMonthActive);

    const monthlyRevenueGrowth = pct(monthlyRevenue, prevMonthlyRevenue);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        totalRevenue,
        monthlyRevenue,
        growth: {
          users: usersGrowth,
          activeUsers: activeUsersGrowth,
          totalRevenue: pct(totalRevenue, totalRevenue - monthlyRevenue),
          monthlyRevenue: monthlyRevenueGrowth
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==============================
// 2) User Activity (registrations + logins)
// ==============================
export const getUserActivity = async (req, res) => {
  try {
    const now = new Date();
    const start = startOfMonth(addMonths(now, -11));

    const registrations = await User.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.y': 1, '_id.m': 1 } }
    ]);

    const logins = await Activity.aggregate([
      { $match: { type: 'login', createdAt: { $gte: start } } },
      {
        $group: {
          _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.y': 1, '_id.m': 1 } }
    ]);

    const months = [];
    const regSeries = [];
    const loginSeries = [];

    for (let i = 0; i < 12; i++) {
      const dt = addMonths(start, i);
      const y = dt.getFullYear();
      const m = dt.getMonth() + 1;

      const monthName = dt.toLocaleString('en-US', { month: 'short' });
      months.push(monthName);

      const r = registrations.find(x => x._id.y === y && x._id.m === m)?.count || 0;
      const l = logins.find(x => x._id.y === y && x._id.m === m)?.count || 0;

      regSeries.push(r);
      loginSeries.push(l);
    }

    res.json({
      success: true,
      data: { months, registrations: regSeries, logins: loginSeries }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==============================
// 3) Revenue (last 12 months)
// ==============================
export const getRevenue = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          totalRevenue: { $sum: "$amount" } // assuming "amount" = plan cost
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const formatted = payments.map(p => ({
      month: new Date(2000, p._id.month - 1).toLocaleString("en", { month: "short" }),
      revenue: p.totalRevenue
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ==============================
// 4) Plan Distribution
// ==============================
export const getPlanDistribution = async (req, res) => {
  try {
    const agg = await User.aggregate([
      { $group: { _id: '$subscription', count: { $sum: 1 } } }
    ]);

    const plans = {};
    agg.forEach(i => {
      plans[i._id || 'Unknown'] = i.count;
    });

    res.json({ success: true, data: { plans } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==============================
// 5) Recent Activities
// ==============================
export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ type: 'user_registered' })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email')
      .lean();

    const formatted = activities.map(a => ({
      type: a.type,
      userId: a.user?._id,
      userName: a.user?.name || 'Unknown',
      email: a.user?.email || '',
      time: a.createdAt
    }));

    res.json({ success: true, data: { activities: formatted } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
