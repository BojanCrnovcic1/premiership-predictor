import { Navigate, Outlet } from "react-router-dom";

import Loader from "../components/ui/Loader/Loader";
import { useAuth } from "../features/auth/hooks/useAuth";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader fullscreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
