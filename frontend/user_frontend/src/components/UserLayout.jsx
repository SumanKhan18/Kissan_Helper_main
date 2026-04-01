import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  UserCircle,
  CreditCard,
  Notebook,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  LogOut,
  
} from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import API from "../api";
import axios from "axios";

function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for user info
  const [user, setUser] = useState(null);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/auth/getProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);

        if (err.response && err.response.status === 401) {
          handleLogout(); // token invalid → force logout
        }
      }
    };

    fetchUser();
  }, []);

  // 🔹 Logout function
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setUser(null);
      navigate("/"); // or navigate("/") if you want home
    }
  };

  const navigation = [
    { name: "Dashboard", path: "/user", icon: LayoutDashboard },
    { name: "Profile", path: "/user/profile", icon: UserCircle },
    { name: "Transactions", path: "/user/transactions", icon: CreditCard },
    { name: "Plans", path: "/user/plans", icon: FileText },
    { name: "Notes", path: "/user/notes", icon: Notebook },
    { name: "Shipment", path: "/user/shipment", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-64 z-40 transform bg-[#0F172A] border-r border-gray-800 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                  <UserCircle className="w-6 h-6" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-green-400">{user?.name}</h3>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-green-500 text-gray-900"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}

UserLayout.propTypes = {};

export default UserLayout;
