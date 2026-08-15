import { LogOut } from "lucide-react";

import Button from "../../ui/Button/Button";

import styles from "./SidebarFooter.module.scss";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SidebarFooter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.footer}>
      <Button variant="ghost" fullWidth onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </Button>
    </div>
  );
};

export default SidebarFooter;
