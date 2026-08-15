import { useState } from "react";

import styles from "./PublicLeaguesPage.module.scss";

import { useSeasonLeagues } from "../../hooks/useSeasonLeagues";
import { SeasonLeagueService } from "../../services/seasonLeague.service";

const SEASON_YEAR = 2026;

const PublicSeasonLeaguesPage = () => {
  const {
    publicLeagues,
    loading,
    error,
    refreshMyLeagues,
    refreshPublicLeagues,
  } = useSeasonLeagues(SEASON_YEAR);

  const [joining, setJoining] = useState<number | null>(null);

  const handleJoin = async (leagueId: number) => {
    try {
      setJoining(leagueId);

      await SeasonLeagueService.joinPublic(leagueId);

      await Promise.all([refreshMyLeagues(), refreshPublicLeagues()]);
    } catch (err: any) {
      console.error("Failed to join public league:", err);

      alert(err?.response?.data?.message || "Nije moguće pridružiti se ligi.");
    } finally {
      setJoining(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading public leagues...</div>;
  }

  if (error) {
    return <div className={styles.loading}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Public Leagues</h1>

      {publicLeagues.length === 0 ? (
        <div className={styles.empty}>No public leagues available.</div>
      ) : (
        <div className={styles.grid}>
          {publicLeagues.map((league) => (
            <div key={league.leagueId} className={styles.card}>
              <div>
                <h3>{league.name}</h3>

                <p className={styles.owner}>Season: {league.seasonYear}</p>
              </div>

              <button
                type="button"
                className={styles.joinBtn}
                onClick={() => void handleJoin(league.leagueId)}
                disabled={
                  joining === league.leagueId || league.isMember === true
                }
              >
                {league.isMember
                  ? "Joined"
                  : joining === league.leagueId
                    ? "Joining..."
                    : "Join"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicSeasonLeaguesPage;
