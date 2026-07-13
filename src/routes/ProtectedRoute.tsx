import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/utils/token";

export const ProtectedRoute = () => {
  const token = getToken();

  if (!token) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
