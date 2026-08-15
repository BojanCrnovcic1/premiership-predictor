import { useEffect, useState } from "react";

import StandingsService from "../../services/standings.service";

import type { ActualStandingsTypes } from "../../types/actual-standings.types";

import Loader from "../../components/ui/Loader";

import styles from "./StandingsPage.module.scss";

const StandingsPage = () => {
  const [standings, setStandings] = useState<ActualStandingsTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadStandings = async () => {
      try {
        const data = await StandingsService.getStandings(currentYear);

        setStandings(data);
        setError(null);
      } catch {
        setError("Failed to load Premier League standings.");
      } finally {
        setLoading(false);
      }
    };

    void loadStandings();
  }, [currentYear]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.error}>
          <p>{error}</p>

          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>PREMIER LEAGUE</span>

        <h1>Current Standings</h1>

        <p>
          The current Premier League table for the {currentYear}/2027 season.
        </p>
      </header>

      <section className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
            </tr>
          </thead>

          <tbody>
            {standings.map((standing) => (
              <tr
                key={standing.actualStandingId ?? standing.teamId}
                className={styles.row}
              >
                <td className={styles.position}>{standing.position}</td>

                <td className={styles.team}>
                  {standing.team?.logoUrl && (
                    <img
                      src={standing.team.logoUrl}
                      alt={standing.team.name}
                      className={styles.logo}
                    />
                  )}

                  <div className={styles.teamInfo}>
                    <strong>{standing.team?.name}</strong>

                    <span>{standing.team?.shortName}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default StandingsPage;
