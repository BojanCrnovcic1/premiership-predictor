import styles from "./MatchRanking.module.scss";

interface RankingRow {
  userId: number;
  teamName: string;
  firstName: string;
  lastName: string;
  pointsWon: number;
}

interface Props {
  ranking: RankingRow[];
}

const MatchRanking = ({ ranking }: Props) => {
  return (
    <div className={styles.container}>
      <h2>Global Ranking</h2>

      {ranking.length === 0 ? (
        <p className={styles.empty}>No ranking data available.</p>
      ) : (
        <ol className={styles.list}>
          {ranking.map((player, index) => (
            <li key={player.userId} className={styles.row}>
              <span className={styles.rank}>#{index + 1}</span>

              <span className={styles.name}>
                {player.firstName} {player.lastName}
              </span>

              <span className={styles.team}>{player.teamName}</span>

              <strong className={styles.points}>{player.pointsWon} pts</strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default MatchRanking;
