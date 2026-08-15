import { useAuth } from "../../../auth/hooks/useAuth";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DeleteAccountCard from "../../components/DeleteAccountCard/DeleteAccountCard";
import styles from "./SettingsPage.module.scss";

const SettingsPage = () => {
  const { user } = useAuth();
  return (
    <div className={styles.settings}>
      <DashboardHeader teamName={user?.teamName || "N/A"} />

      <DeleteAccountCard />
    </div>
  );
};

export default SettingsPage;
