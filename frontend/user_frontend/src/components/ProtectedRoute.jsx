import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // For now, we'll assume the user is always authenticated
  // In a real app, you would implement proper authentication
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}