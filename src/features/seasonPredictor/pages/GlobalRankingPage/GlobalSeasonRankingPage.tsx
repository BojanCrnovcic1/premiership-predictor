import { useEffect, useState } from "react";

import styles from "./GlobalRankingPage.module.scss";
import type { ScoresTypes } from "../../../../types/scores.types";
import { ScoreService } from "../../services";

const GlobalSeasonRankingPage = () => {
  const [ranking, setRanking] = useState<ScoresTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadRanking = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ScoreService.getGlobalRanks(currentYear);

        setRanking(data);
      } catch (error) {
        console.error("Failed to load global ranking:", error);
        setError("Unable to load global ranking.");
      } finally {
        setLoading(false);
      }
    };

    loadRanking();
  }, [currentYear]);

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Global Ranking</h1>

        <div className={styles.empty}>Loading ranking...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Global Ranking</h1>

        <div className={styles.empty}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Global Ranking</h1>

      {ranking.length === 0 ? (
        <div className={styles.empty}>No players are ranked yet.</div>
      ) : (
        <div className={styles.table}>
          {ranking.map((player, index) => (
            <div className={styles.row} key={player.userId}>
              <div className={styles.position}>{index + 1}</div>

              <div className={styles.player}>
                <strong>{player.user.teamName}</strong>

                <span>
                  {player.user.firstName} {player.user.lastName}
                </span>
              </div>

              <div className={styles.score}>{player.totalScore}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSeasonRankingPage;
