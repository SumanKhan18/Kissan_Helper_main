import React, { Suspense, lazy, useState } from "react"; // Ensure useState is imported here
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // Ensure motion is imported here
import { ToastContainer } from "react-toastify";

// Components
import LoadingScreen from "./components/LoadingScreen.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Make sure this path is correct

import AssistantWidget from "./components/AssistantWidget.jsx";

// Lazy-loaded Pages
const Home = lazy(() => import("./Home.jsx"));
const About = lazy(() => import("./About.jsx"));
const Learn = lazy(() => import("./learn.jsx"));
const Dashboard = lazy(() => import("./Dashboard.jsx"));
const Auth = lazy(() => import("./Auth.jsx"));
const JoinNow = lazy(() => import("./JoinNow.jsx"));
const Terms = lazy(() => import("./Terms.jsx"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy.jsx"));

// Features
const NPKAnalysis = lazy(() => import("./features/NPKAnalysis.jsx"));
const SoilSeedSelection = lazy(() => import("./features/SoilSeedSelection.jsx"));
const SeasonalMedicines = lazy(() => import("./features/SeasonalMedicines.jsx"));
const GreenhouseMonitoring = lazy(() => import("./features/GreenhouseMonitoring.jsx"));
const DetectSoil = lazy(() => import("./features/DetectSoil.jsx"));
const CropYieldDetection = lazy(() => import("./features/CropYieldDetection.jsx"));
const DiseaseDetection = lazy(() => import("./features/DiseaseDetection.jsx"));
const WaterIrrigation = lazy(() => import("./features/WaterIrrigation.jsx"));
const GovernmentPolicies = lazy(() => import("./features/GovernmentPolicies.jsx"));

// Media
const Media = lazy(() => import("./media/Media.jsx"));
const Feed = lazy(() => import("./media/Feed.jsx"));
const Tutorials = lazy(() => import("./media/Tutorials.jsx"));
const Community = lazy(() => import("./media/Community.jsx"));
const Notifications = lazy(() => import("./media/Notifications.jsx"));

// Notification Page
const NotificationList = lazy(() => import("./notifications/NotificationList.jsx"));

// User Dashboard
const UserLayout = lazy(() => import("./components/UserLayout.jsx"));
const UserDashboard = lazy(() => import("./pages/UserDashboard.jsx"));
const UserProfile = lazy(() => import("./pages/UserProfile.jsx"));
const UserTransactions = lazy(() => import("./pages/UserTransactions.jsx"));
const UserPlans = lazy(() => import("./pages/UserPlans.jsx"));
const UserNotes = lazy(() => import("./pages/UserNotes.jsx"));
const UserShipment = lazy(() => import("./pages/UserShipment.jsx"));

// Mock user
const mockUser = {
  id: 1,
  name: "Kissan",
  email: "kissanhelper@example.com",
  profilePic: "",
  joinedDate: "2024-01-15",
  currentPlan: "Premium",
  planExpiry: "2025-01-15",
};

// Public layout component
function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-[10px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// 404 Page Component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
    <h1 className="text-6xl font-extrabold mb-4 animate-bounce">🤖 404</h1>
    <p className="text-2xl mb-2 animate-pulse">
      Oops! This page took a coffee break ☕
    </p>
    <p className="text-lg text-gray-400">Let’s get you back.</p>
    <a
      href="/"
      className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-110 animate-bounce-slow"
    >
      🚀 Back me home!
    </a>
  </div>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* ErrorBoundary should wrap Suspense to catch errors during lazy loading */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/join" element={<JoinNow />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Features */}
              <Route path="/npk-analysis" element={<NPKAnalysis />} />
              <Route path="/soil-seed-selection" element={<SoilSeedSelection />} />
              <Route path="/seasonal-medicines" element={<SeasonalMedicines />} />
              <Route path="/greenhouse-monitoring" element={<GreenhouseMonitoring />} />
              <Route path="/detect-soil" element={<DetectSoil />} />
              <Route path="/crop-yield" element={<CropYieldDetection />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/irrigation" element={<WaterIrrigation />} />
              <Route path="/policies" element={<GovernmentPolicies />} />

              {/* Media */}
              <Route path="/media/*" element={<Media />}>
                <Route path="feed" element={<Feed />} />
                <Route path="tutorials" element={<Tutorials />} />
                <Route path="community" element={<Community />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>

              <Route path="/notifications" element={<NotificationList />} />
            </Route>

            {/* User Dashboard Routes */}
            <Route path="/user/*" element={<UserLayout user={mockUser} />}>
              <Route index element={<UserDashboard user={mockUser} />} />
              <Route path="profile" element={<UserProfile user={mockUser} />} />
              <Route path="transactions" element={<UserTransactions user={mockUser} />} />
              <Route path="plans" element={<UserPlans user={mockUser} />} />
              <Route path="notes" element={<UserNotes user={mockUser} />} />
              <Route path="shipment" element={<UserShipment user={mockUser} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AnimatePresence>
  );
}


export default function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} limit={3} />
      <AssistantWidget />
    </Router>
  );
}
