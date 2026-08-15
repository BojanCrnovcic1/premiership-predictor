import styles from "./MatchPredictionHeader.module.scss";

interface Props {
  gameweekName?: string;
  matchCount: number;
}

const MatchPredictionHeader = ({ gameweekName, matchCount }: Props) => {
  return (
    <header className={styles.header}>
      <h1>Match Predictor</h1>

      {gameweekName && <h2>{gameweekName}</h2>}

      <p>{matchCount} matches available for prediction.</p>
    </header>
  );
};

export default MatchPredictionHeader;
