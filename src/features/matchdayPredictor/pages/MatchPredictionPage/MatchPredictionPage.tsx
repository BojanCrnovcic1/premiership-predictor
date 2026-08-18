import Loader from "../../../../components/ui/Loader";
import GameweekSelector from "../../componentes/GameweekSelector/GameweekSelector";
import MatchCard from "../../componentes/MatchCard/MatchCard";
import MatchPredictionHeader from "../../componentes/MatchPredictionHeader/MatchPredictionHeader";
import { useMatchPredictor } from "../../hooks/useMatchPredictor";
import styles from "./MatchPredictionPage.module.scss";

const CURRENT_SEASON = 2026;

const MatchPredictionPage = () => {
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
        <Loader text="Loading gameweeks..." />
      </div>
    );
  }

  if (!selectedGameweek) {
    return (
      <div className={styles.stateWrapper}>
        <p className={styles.emptyText}>No gameweeks available.</p>
      </div>
    );
  }

  const sortedMatches = [...selectedGameweek.matches].sort(
    (a, b) =>
      new Date(a.kickoffTime).getTime() - new Date(b.kickoffTime).getTime(),
  );

  return (
    <div className={styles.page}>
      <MatchPredictionHeader
        gameweekName={selectedGameweek.name}
        matchCount={selectedGameweek.matches.length}
      />

      <div className={styles.toolbar}>
        <GameweekSelector
          gameweeks={gameweeks}
          selectedGameweekId={selectedGameweekId}
          onChange={setSelectedGameweekId}
        />
      </div>

      <div className={styles.matchesGrid}>
        {sortedMatches.map((match) => {
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

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => void savePredictions()}
          disabled={savingPredictions}
        >
          {savingPredictions ? "Saving predictions..." : "Save predictions"}
        </button>
      </div>
    </div>
  );
};

export default MatchPredictionPage;
