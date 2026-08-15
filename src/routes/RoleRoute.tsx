import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

interface Props {
  allowedRoles: Array<"USER" | "ADMIN">;
}

const RoleRoute = ({ allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role!)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
