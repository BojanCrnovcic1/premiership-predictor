import { useEffect, useState } from "react";

import Card from "../../../../../components/ui/Card/Card";

import type { LeaguesTypes } from "../../../../../types/leagues.types";

import { LeagueService } from "../../../../../services/league.service";

import styles from "./MyLeaguesCard.module.scss";
import type { LeagueStandingsTypes } from "../../../../seasonPredictor/types/league-standings.types";

interface Props {
  leagues: LeaguesTypes[];
}

const MyLeaguesCard = ({ leagues }: Props) => {
  const [leagueStandings, setLeagueStandings] = useState<
    Record<number, LeagueStandingsTypes[]>
  >({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeagueData = async () => {
      if (leagues.length === 0) {
        setLeagueStandings({});
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const entries = await Promise.all(
          leagues.map(async (league) => {
            const details = await LeagueService.getMatchLeagueDetails(
              league.leagueId,
            );

            return [league.leagueId, details.standings] as const;
          }),
        );

        setLeagueStandings(Object.fromEntries(entries));
      } catch (err) {
        console.error("Failed to load league details:", err);
      } finally {
        setLoading(false);
      }
    };

    void loadLeagueData();
  }, [leagues]);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h2>My Leagues</h2>

        <span>{leagues.length} joined</span>
      </div>

      {leagues.length === 0 ? (
        <p className={styles.empty}>No leagues joined yet.</p>
      ) : (
        <div className={styles.list}>
          {leagues.map((league) => {
            const standings = leagueStandings[league.leagueId] ?? [];

            return (
              <div key={league.leagueId} className={styles.league}>
                <div className={styles.leagueTop}>
                  <div className={styles.leagueMeta}>
                    <strong>{league.name}</strong>

                    <span>{league.type}</span>
                  </div>

                  <div className={styles.badge}>{standings.length} players</div>
                </div>

                {league.type === "PRIVATE" && league.code && (
                  <div className={styles.infoRow}>
                    <span>
                      <strong>Code:</strong> {league.code}
                    </span>
                  </div>
                )}

                {loading && !leagueStandings[league.leagueId] ? (
                  <div className={styles.loading}>Loading league...</div>
                ) : (
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Team</th>
                          <th>Player</th>
                          <th>Points</th>
                          <th>Joined</th>
                        </tr>
                      </thead>

                      <tbody>
                        {standings.length === 0 ? (
                          <tr>
                            <td colSpan={5} className={styles.noMembers}>
                              No members in this league.
                            </td>
                          </tr>
                        ) : (
                          standings.map((player) => (
                            <tr key={player.userId}>
                              <td>{player.position}</td>

                              <td>{player.teamName || "-"}</td>

                              <td>
                                {player.firstName} {player.lastName}
                              </td>

                              <td>{player.pointsWon ?? 0}</td>

                              <td>
                                {player.joinedAt
                                  ? new Date(
                                      player.joinedAt,
                                    ).toLocaleDateString()
                                  : "-"}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default MyLeaguesCard;
