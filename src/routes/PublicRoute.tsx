import { Navigate, Outlet } from "react-router-dom";

import Loader from "../components/ui/Loader/Loader";
import { useAuth } from "../features/auth/hooks/useAuth";

const PublicRoute = () => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <Loader fullscreen />;
  }

  if (isAuthenticated) {
    return (
      <Navigate to={user?.role === "ADMIN" ? "/admin" : "/dashboard"} replace />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
