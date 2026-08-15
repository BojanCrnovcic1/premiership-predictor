import { useNavigate } from "react-router-dom";
import styles from "./DashboardPage.module.scss";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

import { useAuth } from "../../../auth/hooks/useAuth";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.dashboard}>
      <DashboardHeader teamName={user?.teamName || "N/A"} />

      <section className={styles.cards}>
        <DashboardCard
          title="Season Predictor"
          description="Predict the final Premier League table and compete against everyone."
          buttonText="Play"
          onClick={() => navigate("/season-predictor")}
        />

        <DashboardCard
          title="Match Predictor"
          description="Predict every fixture and collect points every gameweek."
          buttonText="Play"
          onClick={() => navigate("/match-predictor")}
        />
      </section>
    </div>
  );
};

export default DashboardPage;
