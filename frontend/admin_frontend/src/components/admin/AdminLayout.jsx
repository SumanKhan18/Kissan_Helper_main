"use client";

import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenuFoldFill, RiMenuFold2Fill } from "react-icons/ri";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  AlertTriangle,
  LogOut,
  Home,
  UserCircle,
  Plane as Plant,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from '../../context/LanguageContext';
import DateTimeDisplay from '../DateTimeDisplay';

/* ================= Variants ================= */
const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
};

/* ================ Menu Toggle ================ */
const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <button
      onClick={toggle}
      className="fixed lg:hidden mt-[3.7vh] left-[0.13vw] w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 bg-transparent z-50 transition hover:bg-gray-800"
    >
      {isOpen ? (
        <RiMenuFoldFill size={25} className="text-white" />
      ) : (
        <RiMenuFold2Fill size={25} className="text-white" />
      )}
    </button>
  );
};

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { path: "/layout/profilecard", icon: <UserCircle size={18} />, label: t('profile') },
    { path: "/layout", icon: <LayoutDashboard size={18} />, label: t('dashboard') },
    { path: "/layout/users", icon: <Users size={18} />, label: t('users') },
    { path: "/layout/admins", icon: <Shield size={18} />, label: 'Admins' },
    { path: "/layout/policies", icon: <FileText size={18} />, label: t('policies') },
    { path: "/layout/broadcast", icon: <Plant size={18} />, label: t('broadcast') },
    { path: "/layout/payments", icon: <CreditCard size={18} />, label: t('payments') },
    { path: "/layout/settings", icon: <Settings size={18} />, label: t('settings') },
    { path: "/layout/maintenance", icon: <AlertTriangle size={18} />, label: t('maintenanceMode') },
    { path: "/portal-9508", icon: <Home size={18} />, label: t('home') },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/Login");
    }
  };

  // Close sidebar when clicking outside (only on mobile/tablet)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle click outside on mobile/tablet (when sidebar is overlay)
      if (window.innerWidth < 1024 && isOpen && containerRef.current && !containerRef.current.contains(event.target)) {
        const toggleButton = event.target.closest('button[class*="fixed"]');
        if (!toggleButton) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen && window.innerWidth < 1024) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto-close sidebar on mobile when navigating
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex relative">
      {/* Backdrop overlay - only on mobile/tablet */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav
        ref={containerRef}
        initial={false}
        animate={
          // On large screens, always show (open). On small screens, use toggle state
          window.innerWidth >= 1024 ? "open" : (isOpen ? "open" : "closed")
        }
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 overflow-y-auto lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <motion.ul
            className="flex-1 mt-20 space-y-1 px-3 py-4 overflow-y-auto"
            variants={navVariants}
          >
            {navItems.map((item) => (
              <motion.li key={item.path} variants={itemVariants}>
                <NavLink
                  to={item.path}
                  end={item.path === "/layout"}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                      isActive
                        ? "bg-green-500 text-black font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>

          {/* Logout Section - Fixed at bottom */}
          <motion.div
            className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 mt-auto"
            variants={itemVariants}
          >
            {/* User Info */}
            {user && (
              <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center flex-shrink-0 relative">
                    {user.personalImage ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${user.personalImage.startsWith('uploads/') ? user.personalImage : `uploads/${user.personalImage}`}`}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = e.target.nextElementSibling;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold text-sm ${user.personalImage ? 'hidden' : 'flex'}`}>
                      {(user.name || 'A').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-white font-medium text-sm truncate">{user.name || 'Admin'}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs truncate">{user.email || ''}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 transition-colors text-sm"
              variants={itemVariants}
            >
              <LogOut size={18} />
              <span className="font-medium">{t('logout')}</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Menu Toggle Button - only visible on mobile/tablet */}
      <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      {/* Main Content - margin on large screens, no margin on small screens */}
      <div className="flex-1 w-full lg:ml-64 transition-all duration-300">
        <main className="min-h-screen p-4 lg:p-6 bg-white dark:bg-black">
          {/* Date/Time Display - Fixed at top right */}
          <div className="fixed top-4 right-4 z-40 hidden lg:block">
            <DateTimeDisplay />
          </div>
          {/* Mobile Date/Time Display */}
          <div className="mb-4 lg:hidden">
            <DateTimeDisplay />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
