import { useEffect, useState } from "react";
import clsx from "clsx";

import { useAuth } from "../../../auth/hooks/useAuth";
import { PredictionService, TeamsService } from "../../services";

import type { TeamsTypes } from "../../../../types/teams.types";

import PredictionBoard from "../../components/PredictionBoard/PredictionBoard";
import Button from "../../../../components/ui/Button/Button";
import styles from "./CreatePredictionPage.module.scss";

const CreateSeasonPredictionPage = () => {
  const { user } = useAuth();

  const [prediction, setPrediction] = useState<TeamsTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await TeamsService.getAll();

        setPrediction(response);
      } catch {
        setMessage("Greška prilikom učitavanja timova.");
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    void loadTeams();
  }, []);

  const handleSave = async () => {
    if (!user?.userId) {
      setMessage("Morate biti prijavljeni.");
      setIsSuccess(false);
      return;
    }

    if (prediction.length !== 20) {
      setMessage("Predikcija mora sadržavati tačno 20 timova.");
      setIsSuccess(false);
      return;
    }

    const teamIds = prediction
      .map((team) => team.teamId)
      .filter((id): id is number => typeof id === "number");

    if (teamIds.length !== 20) {
      setMessage("Neispravni podaci o timovima.");
      setIsSuccess(false);
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await PredictionService.createPrediction(user.userId, teamIds);

      setMessage("Predikcija je uspješno sačuvana.");
      setIsSuccess(true);
    } catch (error: any) {
      setIsSuccess(false);
      setMessage(
        error?.response?.data?.message ||
          "Predikcija nije mogla biti sačuvana.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading teams...</div>;
  }

  return (
    <div className={styles.page}>
      <PredictionBoard prediction={prediction} onChange={setPrediction} />

      <div className={styles.actions}>
        <Button
          type="button"
          variant="primary"
          size="lg"
          loading={saving}
          disabled={prediction.length !== 20}
          onClick={handleSave}
        >
          SAVE PREDICTION
        </Button>

        {message && (
          <p
            className={clsx(styles.message, {
              [styles.success]: isSuccess,
              [styles.error]: !isSuccess,
            })}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateSeasonPredictionPage;
