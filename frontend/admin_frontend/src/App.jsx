import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClickSpark from './block/ClickSpark';
import FuzzyText from './block/FuzzyText';

// Context
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Components
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages/components
const Home = lazy(() => import("./Home"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminPolicies = lazy(() => import("./pages/AdminPolicies"));
const AdminPayments = lazy(() => import("./pages/AdminPayments"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminMaintenance = lazy(() => import("./pages/AdminMaintenance"));
const AdminBroadcast = lazy(() => import("./pages/AdminBroadcast"));
const AdminShipment = lazy(() => import("./pages/AdminShipment"));
const AdminManagement = lazy(() => import("./pages/AdminManagement"));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProfileCard = lazy(() => import('./pages/ProfileCard'));

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <ErrorBoundary>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <main className="pt-[10px]">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/portal-9508" replace />} />
                <Route path="/portal-9508" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/layout/*" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="policies" element={<AdminPolicies />} />
                    <Route path="broadcast" element={<AdminBroadcast />} />
                    <Route path="shipment" element={<AdminShipment />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="maintenance" element={<AdminMaintenance />} />
                    <Route path="admins" element={<AdminManagement />} />
                    <Route path="profilecard" element={<ProfileCard />} />
                  </Route>
                </Route>

                <Route
                  path="*"
                  element={
                    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                      <FuzzyText
                        baseIntensity={0.2}
                        hoverIntensity={0.8} // you can tweak this value
                        enableHover={true}   // set to false if you don't want hover interaction
                        className="text-6xl font-extrabold mb-4 animate-bounce"
                      >
                        404 Not Found !!
                      </FuzzyText>
                    </div>
                  }
                />
              </Routes>
            </main>
          </ClickSpark>
        </ErrorBoundary>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppRoutes />
            <ToastContainer position="top-center" autoClose={3000} />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
