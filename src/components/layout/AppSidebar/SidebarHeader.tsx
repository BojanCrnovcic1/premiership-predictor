import Logo from "../../ui/Logo/Logo";
import { X } from "lucide-react";
import styles from "./SidebarHeader.module.scss";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const SidebarHeader = () => {
  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <Logo />

      {/* Kasnije ide iz AuthContext */}
      <div className={styles.team}>
        <span>Team</span>

        <h3>{user?.teamName}</h3>
      </div>

      <button className={styles.close}>
        <X size={20} />
      </button>
    </div>
  );
};

export default SidebarHeader;
