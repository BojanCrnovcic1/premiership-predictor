import type { MatchesTypes } from "../../../../types/matches.types";
import MatchPredictionForm from "../MatchPredictionForm/MatchPredictionForm";
import styles from "./MatchCard.module.scss";

interface Props {
  match: MatchesTypes;
  homeScore: number | null;
  awayScore: number | null;
  isBoosted: boolean;
  onHomeScoreChange: (value: number | null) => void;
  onAwayScoreChange: (value: number | null) => void;
  onBoostChange: (value: boolean) => void;
}

const MatchCard = ({
  match,
  homeScore,
  awayScore,
  isBoosted,
  onHomeScoreChange,
  onAwayScoreChange,
  onBoostChange,
}: Props) => {
  const kickoffTime = new Date(match.kickoffTime);

  const isLocked = match.isFinished || new Date() >= kickoffTime;

  return (
    <article className={styles.card}>
      <div className={styles.matchRow}>
        <div className={`${styles.team} ${styles.home}`}>
          <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} />
          <span>{match.homeTeam.shortName}</span>
        </div>

        <MatchPredictionForm
          homeScore={homeScore}
          awayScore={awayScore}
          isBoosted={isBoosted}
          disabled={isLocked}
          onHomeScoreChange={onHomeScoreChange}
          onAwayScoreChange={onAwayScoreChange}
          onBoostChange={onBoostChange}
        />

        <div className={`${styles.team} ${styles.away}`}>
          <span>{match.awayTeam.shortName}</span>
          <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} />
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.kickoff}>
          {kickoffTime.toLocaleDateString("sr-RS", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        {isLocked && (
          <span className={styles.status}>
            {match.isFinished ? "Match finished" : "Locked"}
          </span>
        )}
      </div>
    </article>
  );
};

export default MatchCard;
