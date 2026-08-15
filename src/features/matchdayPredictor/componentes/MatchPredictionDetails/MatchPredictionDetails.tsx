import type { MatchPredictionsTypes } from "../../../../types/matches-predictions.types";
import styles from "./MatchPredictionDetails.module.scss";

interface Props {
  predictions: MatchPredictionsTypes[];
  playerName: string;
}

const MatchPredictionDetails = ({ predictions, playerName }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>MATCH PREDICTOR</span>

        <h2>{playerName}</h2>

        <p>Predictions for this gameweek</p>
      </div>

      {predictions.length === 0 ? (
        <div className={styles.empty}>
          This player has no predictions for this gameweek.
        </div>
      ) : (
        <div className={styles.matches}>
          {predictions.map((prediction) => {
            const match = prediction.match;

            const homeTeam =
              match.homeTeam?.name ?? match.homeTeam?.shortName ?? "Home";

            const awayTeam =
              match.awayTeam?.name ?? match.awayTeam?.shortName ?? "Away";

            const kickoffPassed =
              new Date(match.kickoffTime).getTime() <= Date.now();

            return (
              <div key={prediction.matchPredictionId} className={styles.match}>
                <div className={styles.teams}>
                  <span>{homeTeam}</span>

                  <strong>vs</strong>

                  <span>{awayTeam}</span>
                </div>

                <div className={styles.prediction}>
                  <span>Prediction</span>

                  {prediction.homeScore === null ||
                  prediction.awayScore === null ? (
                    <strong className={styles.hidden}>Hidden</strong>
                  ) : (
                    <strong>
                      {prediction.homeScore} : {prediction.awayScore}
                    </strong>
                  )}
                </div>

                {kickoffPassed && (
                  <div className={styles.points}>
                    <span>Points</span>

                    <strong>{prediction.pointsWon}</strong>
                  </div>
                )}

                {kickoffPassed && prediction.isBoosted && (
                  <span className={styles.boost}>BOOST ×2</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchPredictionDetails;
