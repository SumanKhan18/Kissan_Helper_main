// import { Menu, X, Sprout, User, LogOut, Bell, Settings } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { motion, AnimatePresence } from "framer-motion";

// // ---------------- Navbar ----------------

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (!auth) return;
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const getUserName = (user) => {
//     if (user?.displayName) return user.displayName.toUpperCase();
//     if (user?.email) return user.email.split("@")[0].toUpperCase();
//     return "";
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <nav className="fixed w-full bg-gray/90 backdrop-blur-sm z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14">
//           {/* Logo */}
//           <Link to="/portal-9508" className="flex items-center space-x-2">
//             <Sprout className="h-8 w-8 text-green-500" />
//             <span className="text-2xl font-bold text-white">KissanHelper</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6 ml-auto">
//             <Link to="/portal-9508" className="text-gray-300 hover:text-green-500 text-sm font-medium">Home</Link>
//             {/* <Link to="/about" className="text-gray-300 hover:text-green-500 text-sm font-medium">About</Link>
//             <Link to="/join" className="text-gray-300 hover:text-green-500 text-sm font-medium">View Plans</Link> */}

//             <div className="flex items-center space-x-4 relative z-[60]">
//               <NotificationBell />
//               <ProfileMenu user={user} getUserName={getUserName} handleLogout={handleLogout} />
//               {!user && (
//                 <Link to="/Login" className="bg-green-500 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600">
//                   Login/Register
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="md:hidden px-4 py-4 space-y-3 bg-black/95 backdrop-blur-sm shadow-lg z-40 max-h-[80vh] overflow-y-auto"
//           >
//             <Link to="/portal-9508" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-green-500 text-base py-2">Home</Link>
//             <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-green-500 text-base py-2">About</Link>
//             <Link to="/join" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-green-500 text-base py-2">View Plans</Link>

//             <NotificationBell />
//             <ProfileMenu user={user} getUserName={getUserName} handleLogout={handleLogout} />
//             {!user && (
//               <Link to="/Login" onClick={() => setIsOpen(false)} className="block bg-green-500 text-black px-4 py-2 rounded-md">
//                 Login/Register
//               </Link>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// // ---------------- NotificationBell ----------------

// function NotificationBell() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications] = useState([
//     { id: 1, title: "New User Registration", message: "A new farmer has registered.", read: false },
//     { id: 2, title: "System Update", message: "New features added.", read: false },
//     { id: 3, title: "Payment Received", message: "Premium subscription payment received.", read: true },
//   ]);
//   const unreadCount = notifications.filter(n => !n.read).length;
//   const notificationRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={notificationRef}>
//       <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-full bg-gray-800 hover:bg-gray-600 transition">
//         <Bell className="h-6 w-6 text-green-500" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       <AnimatePresence>
//         {showNotifications && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-lg border border-gray-800 z-[100]"
//           >
//             <div className="p-4 border-b border-gray-800 flex justify-between">
//               <h3 className="text-lg font-semibold text-white">Notifications</h3>
//               <Link to="/notifications" className="text-sm text-green-500 hover:text-green-400">View All</Link>
//             </div>
//             <div className="max-h-96 overflow-y-auto">
//               {notifications.map(notification => (
//                 <Link key={notification.id} to={`/notifications/${notification.id}`} className="block p-4 hover:bg-gray-800 transition">
//                   <div className="flex items-center justify-between">
//                     <h4 className="text-sm font-medium text-white">{notification.title}</h4>
//                     {!notification.read && <span className="h-2 w-2 bg-green-500 rounded-full" />}
//                   </div>
//                   <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ---------------- ProfileMenu ----------------

// function ProfileMenu({ user, getUserName, handleLogout }) {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="relative z-[1000]" ref={menuRef}>
//       <button onClick={() => setOpen(!open)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 transition">
//         <User className="h-6 w-6 text-green-500" />
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg border border-gray-800 z-[1000]"
//           >
//             <div className="p-4 border-b border-gray-800">
//               <h4 className="text-white font-semibold text-sm">{getUserName(user)}</h4>
//               <p className="text-gray-400 text-xs">{user.email}</p>
//             </div>
//             <div className="p-2 space-y-1">
//               <Link to="/user" className="flex items-center gap-2 p-2 text-sm text-white hover:bg-gray-800 rounded-md">
//                 <User className="w-4 h-4" />
//                 View Profile
//               </Link>
//               <Link to="/user/setting" className="flex items-center gap-2 p-2 text-sm text-white hover:bg-gray-800 rounded-md">
//                 <Settings className="w-4 h-4" />
//                 Settings
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 p-2 text-sm text-red-500 hover:bg-gray-800 rounded-md w-full text-left"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
