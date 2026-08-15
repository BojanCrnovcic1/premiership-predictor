import { useNavigate } from "react-router-dom";

import Button from "../../../../../components/ui/Button/Button";
import Card from "../../../../../components/ui/Card/Card";

import styles from "./GlobalRankingCard.module.scss";

interface Props {
  rankCount?: number;
}

const GlobalRankingCard = ({ rankCount }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <h2>Global Ranking</h2>

      <p>
        View overall Season Predictor standings.
        {typeof rankCount === "number" && (
          <span className={styles.count}> {rankCount} players ranked</span>
        )}
      </p>

      <Button
        fullWidth
        onClick={() => navigate("/season-predictor/global-ranking")}
      >
        Open Ranking
      </Button>
    </Card>
  );
};

export default GlobalRankingCard;
