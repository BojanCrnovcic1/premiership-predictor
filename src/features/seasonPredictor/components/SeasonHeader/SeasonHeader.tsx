import styles from "./SeasonHeader.module.scss";

const SeasonHeader = () => {
  return (
    <header className={styles.header}>
      <span>Season Predictor</span>

      <h1>Premier League 2026/27</h1>

      <p>
        Predict the final table, join leagues and compete with your friends.
      </p>
    </header>
  );
};

export default SeasonHeader;
