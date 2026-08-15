import GlobalRankingCard from "../../componentes/LeaguePanel/GlobalRankingCard/GlobalRankingCard";
import WeeklyRankingCard from "../../componentes/LeaguePanel/WeeklyRankingCard/WeeklyRankingCard";
import { useMatchPredictor } from "../../hooks/useMatchPredictor";

import styles from "./GlobalRankingPage.module.scss";

const CURRENT_SEASON = 2026;

const GlobalRankingPage = () => {
  const {
    loading,
    selectedGameweek,
    gameweekLeaderboard,
    seasonLeaderboard,
    leaderboardLoading,
  } = useMatchPredictor(CURRENT_SEASON);

  if (loading || leaderboardLoading) {
    return <div className={styles.loading}>Loading ranking...</div>;
  }

  return (
    <div className={styles.page}>
      {/* ============================================================
          HEADER
      ============================================================ */}

      <div className={styles.header}>
        <span className={styles.eyebrow}>MATCH PREDICTOR</span>

        <h1>Global Ranking</h1>

        <p>
          Compare your Match Predictor results with all players throughout the
          season.
        </p>
      </div>

      {/* ============================================================
          SUMMARY CARDS
      ============================================================ */}

      <div className={styles.cards}>
        <GlobalRankingCard rankCount={seasonLeaderboard.length} />

        <WeeklyRankingCard
          gameweekNumber={selectedGameweek?.number}
          gameweekName={selectedGameweek?.name}
          rankCount={gameweekLeaderboard.length}
        />
      </div>

      {/* ============================================================
          SEASON RANKING
      ============================================================ */}

      <section className={styles.rankingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>MATCH PREDICTOR</span>

            <h2>Season Ranking</h2>

            <p>Overall points earned by all players.</p>
          </div>
        </div>

        {seasonLeaderboard.length === 0 ? (
          <div className={styles.empty}>No ranking data available.</div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Player</th>
                  <th>Points</th>
                </tr>
              </thead>

              <tbody>
                {seasonLeaderboard.map((player, index) => (
                  <tr key={player.userId}>
                    <td>
                      <span className={styles.position}>{index + 1}</span>
                    </td>

                    <td>{player.teamName || "-"}</td>

                    <td>
                      <div className={styles.player}>
                        <strong>
                          {player.firstName} {player.lastName}
                        </strong>
                      </div>
                    </td>

                    <td>
                      <strong className={styles.points}>{player.points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ============================================================
          GAMEWEEK RANKING
      ============================================================ */}

      <section className={styles.rankingSection}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>GAMEWEEK</span>

            <h2>
              {selectedGameweek ? selectedGameweek.name : "Gameweek Ranking"}
            </h2>

            <p>
              Ranking of players based on their points in the selected gameweek.
            </p>
          </div>
        </div>

        {gameweekLeaderboard.length === 0 ? (
          <div className={styles.empty}>
            No ranking data available for this gameweek.
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Player</th>
                  <th>Points</th>
                </tr>
              </thead>

              <tbody>
                {gameweekLeaderboard.map((player, index) => (
                  <tr key={player.userId}>
                    <td>
                      <span className={styles.position}>{index + 1}</span>
                    </td>

                    <td>{player.teamName || "-"}</td>

                    <td>
                      <div className={styles.player}>
                        <strong>
                          {player.firstName} {player.lastName}
                        </strong>
                      </div>
                    </td>

                    <td>
                      <strong className={styles.points}>{player.points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default GlobalRankingPage;
