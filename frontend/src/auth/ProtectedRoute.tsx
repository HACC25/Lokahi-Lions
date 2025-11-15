import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

// A component that protects routes that require authentication
export function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}