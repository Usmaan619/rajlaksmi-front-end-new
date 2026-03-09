import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/utils/token";

export const PublicRoute = () => {
  const token = getToken();

  if (token) {
    // If authenticated, redirect to home page
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the child routes (login, register)
  return <Outlet />;
};

export default PublicRoute;
