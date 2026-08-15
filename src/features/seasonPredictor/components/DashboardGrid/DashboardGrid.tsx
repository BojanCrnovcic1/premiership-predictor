import QuickActionCard from "../QuickActionCard/QuickActionCard";
import SeasonStatusCard from "../SeasonStatusCard/SeasonStatusCard";
import styles from "./DashboardGrid.module.scss";

const DashboardGrid = () => {
  return (
    <section className={styles.grid}>
      <SeasonStatusCard />

      <QuickActionCard
        title="Create Prediction"
        description="Arrange all 20 teams and submit your final prediction."
        button="Start"
        to="/season-predictor/create-prediction"
      />

      <QuickActionCard
        title="My Leagues"
        description="Create or join leagues and compete with other managers."
        button="Open"
        to="/season-predictor/my-leagues"
      />

      <QuickActionCard
        title="Global Ranking"
        description="See where you rank against every player."
        button="View"
        to="/season-predictor/global-ranking"
      />
    </section>
  );
};

export default DashboardGrid;
