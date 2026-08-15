import { useEffect, useState } from "react";

import { PredictionService } from "../../services";

import type { TeamsTypes } from "../../../../types/teams.types";
import styles from "./MyPredictionPage.module.scss";
import { useAuth } from "../../../auth/hooks/useAuth";

const MyPredictionPage = () => {
  const { user } = useAuth();

  const [prediction, setPrediction] = useState<TeamsTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrediction = async () => {
      if (!user?.userId) return;

      try {
        const response = await PredictionService.getPrediction(user.userId);

        const items = response.predictionItems ?? response;

        setPrediction(
          items
            .sort((a: any, b: any) => a.position - b.position)
            .map((item: any) => item.team),
        );
      } catch {
        setError("Predikcija nije pronađena.");
      } finally {
        setLoading(false);
      }
    };

    void loadPrediction();
  }, [user?.userId]);

  if (loading) {
    return <div className={styles.loading}>Loading prediction...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Season Prediction</h1>

      <div className={styles.list}>
        {prediction.map((team, index) => (
          <div key={team.teamId} className={styles.item}>
            <span className={styles.rank}>{index + 1}.</span>
            <img src={team.logoUrl} alt={team.name} className={styles.logo} />
            <span className={styles.name}>{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPredictionPage;
