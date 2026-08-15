import Card from "../../../../components/ui/Card/Card";

import styles from "./SeasonStatusCard.module.scss";

const SeasonStatusCard = () => {
  return (
    <Card className={styles.card}>
      <h2>Season Status</h2>

      <div className={styles.row}>
        <span>Prediction</span>

        <strong>Not Created</strong>
      </div>

      <div className={styles.row}>
        <span>My Leagues</span>

        <strong>0</strong>
      </div>

      <div className={styles.row}>
        <span>Global Rank</span>

        <strong>-</strong>
      </div>
    </Card>
  );
};

export default SeasonStatusCard;
