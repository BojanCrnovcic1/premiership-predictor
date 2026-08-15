import Loader from "../../../../components/ui/Loader";
import Button from "../../../../components/ui/Button/Button"; // Prilagodi putanju ako je drugačija
import GameweekSelector from "../../componentes/GameweekSelector/GameweekSelector";
import MatchCard from "../../componentes/MatchCard/MatchCard";
import { useMatchPredictor } from "../../hooks/useMatchPredictor";
import styles from "./MyPredictionsPage.module.scss";

const CURRENT_SEASON = 2026;

const MyPredictionsPage = () => {
  const {
    loading,
    gameweeks,
    selectedGameweek,
    selectedGameweekId,
    predictions,
    savingPredictions,
    setSelectedGameweekId,
    updatePrediction,
    updateBoost,
    savePredictions,
  } = useMatchPredictor(CURRENT_SEASON);

  if (loading) {
    return (
      <div className={styles.stateWrapper}>
        <Loader text="Loading your predictions..." />
      </div>
    );
  }

  if (!selectedGameweek) {
    return (
      <div className={styles.stateWrapper}>
        <p className={styles.emptyText}>No gameweek selected.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Predictions</h1>

        <p className={styles.subtitle}>
          Review and manage your submitted scores.
        </p>
      </header>

      <div className={styles.toolbar}>
        <GameweekSelector
          gameweeks={gameweeks}
          selectedGameweekId={selectedGameweekId}
          onChange={setSelectedGameweekId}
        />
      </div>

      <div className={styles.matchesGrid}>
        {selectedGameweek.matches.map((match) => {
          if (!match.matchId) {
            return null;
          }

          const prediction = predictions[match.matchId];

          return (
            <MatchCard
              key={match.matchId}
              match={match}
              homeScore={prediction?.homeScore ?? null}
              awayScore={prediction?.awayScore ?? null}
              isBoosted={prediction?.isBoosted ?? false}
              onHomeScoreChange={(value) =>
                updatePrediction(match.matchId!, {
                  homeScore: value,
                })
              }
              onAwayScoreChange={(value) =>
                updatePrediction(match.matchId!, {
                  awayScore: value,
                })
              }
              onBoostChange={(value) => updateBoost(match.matchId!, value)}
            />
          );
        })}
      </div>

      <div className={styles.saveSection}>
        <Button
          type="button"
          variant="primary"
          size="lg"
          loading={savingPredictions}
          onClick={() => void savePredictions()}
          className={styles.saveButton}
        >
          {savingPredictions ? "Saving predictions..." : "Save Predictions"}
        </Button>
      </div>
    </div>
  );
};

export default MyPredictionsPage;
