import { useState } from "react";

import { MatchLeagueService } from "../../services/matchLeague.service";
import { useMatchLeagues } from "../../hooks/useMatchLeagues";

import styles from "./PublicLeaguesPage.module.scss";

const PublicLeaguesPage = () => {
  const { publicLeagues, loading, error, refreshMyLeagues } = useMatchLeagues();

  const [joiningLeagueId, setJoiningLeagueId] = useState<number | null>(null);

  const handleJoin = async (leagueId: number) => {
    try {
      setJoiningLeagueId(leagueId);

      await MatchLeagueService.joinPublic(leagueId);
      await refreshMyLeagues();

      alert("Successfully joined the public league!");
    } catch (error) {
      console.error("Failed to join league:", error);
    } finally {
      setJoiningLeagueId(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading public leagues...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1>Public Leagues</h1>

      {publicLeagues.length === 0 ? (
        <p className={styles.empty}>No public leagues available.</p>
      ) : (
        <div className={styles.list}>
          {publicLeagues.map((league) => (
            <div key={league.leagueId} className={styles.card}>
              <h2>{league.name}</h2>

              <button
                type="button"
                className={styles.joinBtn}
                disabled={joiningLeagueId === league.leagueId}
                onClick={() => void handleJoin(league.leagueId)}
              >
                {joiningLeagueId === league.leagueId ? "Joining..." : "Join"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicLeaguesPage;
