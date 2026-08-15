import { useNavigate } from "react-router-dom";

import Button from "../../../../../components/ui/Button/Button";
import Card from "../../../../../components/ui/Card/Card";

import styles from "./GlobalRankingCard.module.scss";

interface Props {
  rankCount?: number;
  currentUserPoints?: number;
  currentUserPosition?: number;
}

const GlobalRankingCard = ({
  rankCount,
  currentUserPoints,
  currentUserPosition,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>SEASON</span>

        <h2>Global Ranking</h2>
      </div>

      <p>View overall Match Predictor standings.</p>

      <div className={styles.stats}>
        {typeof currentUserPosition === "number" && (
          <div className={styles.stat}>
            <span>Your Position</span>
            <strong>#{currentUserPosition}</strong>
          </div>
        )}

        {typeof currentUserPoints === "number" && (
          <div className={styles.stat}>
            <span>Your Points</span>
            <strong>{currentUserPoints}</strong>
          </div>
        )}

        {typeof rankCount === "number" && (
          <div className={styles.stat}>
            <span>Players</span>
            <strong>{rankCount}</strong>
          </div>
        )}
      </div>

      <Button
        fullWidth
        onClick={() => navigate("/match-predictor/global-ranking")}
      >
        Open Global Ranking
      </Button>
    </Card>
  );
};

export default GlobalRankingCard;
