import DashboardGrid from "../../components/DashboardGrid/DashboardGrid";
import SeasonHeader from "../../components/SeasonHeader/SeasonHeader";
import styles from "./SeasonDashboardPage.module.scss";

const SeasonDashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      <SeasonHeader />

      <DashboardGrid />
    </div>
  );
};

export default SeasonDashboardPage;
