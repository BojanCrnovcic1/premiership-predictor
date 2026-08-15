import { NavLink } from "react-router-dom";
import styles from "./MatchDashboardPage.module.scss";

const MatchDashboardPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroCard}>
        <h1 className={styles.title}>Match Predictor</h1>

        <p className={styles.description}>
          Predict the exact result of every match before kickoff and climb the
          leaderboard.
        </p>

        <div className={styles.actions}>
          <NavLink
            to="/match-predictor/predictions"
            className={styles.btnPrimary}
          >
            Make Predictions
          </NavLink>

          <NavLink
            to="/match-predictor/my-predictions"
            className={styles.btnOutline}
          >
            My Predictions
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MatchDashboardPage;
