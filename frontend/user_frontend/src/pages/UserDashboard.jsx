import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Activity,
  TrendingUp,
  Users,
  IndianRupee,
  BadgeCheck,
} from "lucide-react";

function UserDashboard({ user }) {
  const [stats, setStats] = useState({
    name: "",
    totalTransactions: 0,
    monthlySpending: 0,
    activeNotes: 0,
    sharedFiles: 0,
    currentPlan: "",
    recentNotes: "",
  });

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        // console.log(token);
        const res = await fetch("http://localhost:3000/api/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        // console.log(data);
        // console.log("this is"+stats.recentNotes)
        // console.log("This is "+stats.currentPlan)
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      name: "Total Transactions",
      value: stats.totalTransactions,
      change: "+5%", // TODO: calculate dynamically later
      icon: Activity,
      trend: "up",
    },
    {
      name: "Active Notes",
      value: stats.activeNotes,
      change: "0%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      name: "Shared Files",
      value: stats.sharedFiles,
      change: "+2%",
      icon: Users,
      trend: "up",
    },
    {
      name: "Monthly Spending",
      value: `₹${stats.monthlySpending}`,
      change: "-3%",
      icon: IndianRupee,
      trend: "down",
    },
  ];

  return (
    <div>
      {/* Welcome & Plan */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-500">
            Welcome back,{stats.name}!
          </h1>
          <p className="text-gray-500">
            Here's what's happening with your account.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg shadow">
          <BadgeCheck className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-300">
            Current Plan:{" "}
            <span className="text-green-400">{stats.currentPlan}</span>
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-300">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      {/* Recent Activity */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-green-500 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {stats.recentActivity?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  {item.amount ? (
                    <>
                      {/* Transaction */}
                      <p className="text-sm font-medium text-gray-400">
                        Transaction of ₹{item.amount / 100} ({item.status})
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Note */}
                      <p className="text-sm font-medium text-gray-400">
                        Note created: {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {/* <span className="text-sm font-medium text-green-600">View</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

UserDashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDashboard;
