import { useNavigate } from "react-router-dom";

import Button from "../../../../../components/ui/Button/Button";
import Card from "../../../../../components/ui/Card/Card";

import styles from "./WeeklyRankingCard.module.scss";

interface Props {
  gameweekNumber?: number;
  gameweekName?: string;
  rankCount?: number;
  currentUserPoints?: number;
  currentUserPosition?: number;
}

const WeeklyRankingCard = ({
  gameweekNumber,
  gameweekName,
  rankCount,
  currentUserPoints,
  currentUserPosition,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>GAMEWEEK</span>

        <h2>Weekly Ranking</h2>
      </div>

      <p>
        {typeof gameweekNumber === "number"
          ? `View standings for Gameweek ${gameweekNumber}.`
          : "View standings for the current gameweek."}
      </p>

      {gameweekName && (
        <span className={styles.gameweekName}>{gameweekName}</span>
      )}

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
        Open Weekly Ranking
      </Button>
    </Card>
  );
};

export default WeeklyRankingCard;
