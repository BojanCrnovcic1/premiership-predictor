import { useEffect, useState } from "react";

import Card from "../../../../../components/ui/Card/Card";
import Modal from "../../../../../components/ui/Modal/Modal";

import type { LeaguesTypes } from "../../../../../types/leagues.types";
import type { LeagueMemberTypes } from "../../../../../types/league-member.types";
import type { LeagueStandingsTypes } from "../../../types/league-standings.types";

import { LeagueService } from "../../../../../services/league.service";
import { PredictionService } from "../../../services";

import styles from "./MyLeaguesCard.module.scss";
import type { TeamsTypes } from "../../../../../types/teams.types";

interface Props {
  leagues: LeaguesTypes[];
}

interface LeagueData {
  members: LeagueMemberTypes[];
  standings: LeagueStandingsTypes[];
}

interface PredictionItem {
  position: number;
  team: TeamsTypes;
}

type PredictionResponse =
  | {
      predictionItems?: PredictionItem[];
    }
  | PredictionItem[];

const MyLeaguesCard = ({ leagues }: Props) => {
  const [leagueData, setLeagueData] = useState<Record<number, LeagueData>>({});

  const [loading, setLoading] = useState(true);

  // ============================================================
  // SELECTED PLAYER
  // ============================================================

  const [selectedMember, setSelectedMember] =
    useState<LeagueMemberTypes | null>(null);

  const [selectedPrediction, setSelectedPrediction] = useState<
    PredictionItem[]
  >([]);

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [predictionError, setPredictionError] = useState<string | null>(null);

  // ============================================================
  // LOAD LEAGUE DATA
  // ============================================================

  useEffect(() => {
    const loadLeagueData = async () => {
      try {
        setLoading(true);

        const entries = await Promise.all(
          leagues.map(async (league) => {
            const [members, standings] = await Promise.all([
              LeagueService.getLeagueMembers(league.leagueId),
              LeagueService.getLeagueStandings(league.leagueId),
            ]);

            return [
              league.leagueId,
              {
                members,
                standings,
              },
            ] as const;
          }),
        );

        setLeagueData(Object.fromEntries(entries));
      } catch (err) {
        console.error("Failed to load league details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (leagues.length === 0) {
      setLoading(false);
      setLeagueData({});
      return;
    }

    void loadLeagueData();
  }, [leagues]);

  // ============================================================
  // OPEN PLAYER PREDICTION
  // ============================================================

  const handleOpenPrediction = async (member: LeagueMemberTypes) => {
    try {
      setSelectedMember(member);
      setSelectedPrediction([]);
      setPredictionError(null);
      setPredictionLoading(true);

      const response = (await PredictionService.getPrediction(
        member.userId,
      )) as PredictionResponse;

      const items = Array.isArray(response)
        ? response
        : (response.predictionItems ?? []);

      const sortedPrediction = [...items].sort(
        (a, b) => a.position - b.position,
      );

      setSelectedPrediction(sortedPrediction);
    } catch (err) {
      console.error("Failed to load player prediction:", err);

      setPredictionError("Predikcija ovog igrača nije pronađena.");
    } finally {
      setPredictionLoading(false);
    }
  };

  // ============================================================
  // CLOSE MODAL
  // ============================================================

  const handleClosePrediction = () => {
    setSelectedMember(null);
    setSelectedPrediction([]);
    setPredictionError(null);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
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
              const data = leagueData[league.leagueId];

              const members = data?.members ?? [];

              const standings = data?.standings ?? [];

              /*
               * VAŽNO:
               *
               * Standings sortiramo po bodovima.
               *
               * Tako igrač sa najviše bodova uvijek ide prvi,
               * bez obzira kojim redom backend vrati members.
               */
              const sortedStandings = [...standings].sort((a, b) => {
                const scoreA = Number(a.totalScore ?? a.pointsWon ?? 0);

                const scoreB = Number(b.totalScore ?? b.pointsWon ?? 0);

                return scoreB - scoreA;
              });
              /*
               * Ako iz nekog razloga član postoji u members,
               * ali još nema standings zapis, dodajemo ga na kraj.
               */
              const standingUserIds = new Set(
                sortedStandings.map((standing) => standing.userId),
              );

              const membersWithoutStanding = members.filter(
                (member) => !standingUserIds.has(member.userId),
              );

              return (
                <div key={league.leagueId} className={styles.league}>
                  {/* ================================================== */}
                  {/* LEAGUE HEADER */}
                  {/* ================================================== */}

                  <div className={styles.leagueTop}>
                    <div className={styles.leagueMeta}>
                      <strong>{league.name}</strong>

                      <span>{league.type}</span>
                    </div>

                    <div className={styles.badge}>{members.length} players</div>
                  </div>

                  {/* ================================================== */}
                  {/* LEAGUE INFO */}
                  {/* ================================================== */}

                  <div className={styles.infoRow}>
                    {league.type === "PRIVATE" && league.code && (
                      <span>
                        <strong>Code:</strong> {league.code}
                      </span>
                    )}

                    {league.seasonYear && (
                      <span>
                        <strong>Season:</strong> {league.seasonYear}
                      </span>
                    )}
                  </div>

                  {/* ================================================== */}
                  {/* LOADING */}
                  {/* ================================================== */}

                  {loading && !data ? (
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
                          {members.length === 0 ? (
                            <tr>
                              <td colSpan={5} className={styles.noMembers}>
                                No members in this league.
                              </td>
                            </tr>
                          ) : (
                            <>
                              {/* ====================================== */}
                              {/* SORTED MEMBERS */}
                              {/* ====================================== */}

                              {sortedStandings.map((standing, index) => {
                                const member = members.find(
                                  (item) => item.userId === standing.userId,
                                );

                                if (!member) {
                                  return null;
                                }

                                return (
                                  <tr
                                    key={member.userId}
                                    className={styles.clickableRow}
                                    onClick={() =>
                                      void handleOpenPrediction(member)
                                    }
                                    title="View player's prediction"
                                  >
                                    <td>
                                      <span
                                        className={
                                          index === 0
                                            ? styles.firstPlace
                                            : styles.position
                                        }
                                      >
                                        {index + 1}
                                      </span>
                                    </td>

                                    <td>
                                      <div className={styles.teamCell}>
                                        {member.teamName}
                                      </div>
                                    </td>

                                    <td>
                                      <div className={styles.playerCell}>
                                        <span>
                                          {member.firstName} {member.lastName}
                                        </span>

                                        {member.isOwner && (
                                          <span className={styles.owner}>
                                            Owner
                                          </span>
                                        )}
                                      </div>
                                    </td>

                                    <td>
                                      <strong className={styles.points}>
                                        {standing.pointsWon}
                                      </strong>
                                    </td>

                                    <td>
                                      {new Date(
                                        member.joinedAt,
                                      ).toLocaleDateString()}
                                    </td>
                                  </tr>
                                );
                              })}

                              {/* ====================================== */}
                              {/* MEMBERS WITHOUT STANDING */}
                              {/* ====================================== */}

                              {membersWithoutStanding.map((member, index) => (
                                <tr
                                  key={member.userId}
                                  className={styles.clickableRow}
                                  onClick={() =>
                                    void handleOpenPrediction(member)
                                  }
                                  title="View player's prediction"
                                >
                                  <td>{sortedStandings.length + index + 1}</td>

                                  <td>{member.teamName}</td>

                                  <td>
                                    <div className={styles.playerCell}>
                                      <span>
                                        {member.firstName} {member.lastName}
                                      </span>

                                      {member.isOwner && (
                                        <span className={styles.owner}>
                                          Owner
                                        </span>
                                      )}
                                    </div>
                                  </td>

                                  <td>
                                    <strong className={styles.points}>0</strong>
                                  </td>

                                  <td>
                                    {new Date(
                                      member.joinedAt,
                                    ).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))}
                            </>
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

      {/* ============================================================ */}
      {/* PLAYER PREDICTION MODAL */}
      {/* ============================================================ */}

      <Modal open={selectedMember !== null} onClose={handleClosePrediction}>
        {selectedMember && (
          <div className={styles.predictionModal}>
            {/* ====================================================== */}
            {/* MODAL HEADER */}
            {/* ====================================================== */}

            <div className={styles.predictionHeader}>
              <div>
                <h2>
                  {selectedMember.firstName} {selectedMember.lastName}
                </h2>

                <p>{selectedMember.teamName}</p>
              </div>

              {selectedMember.isOwner && (
                <span className={styles.owner}>Owner</span>
              )}
            </div>

            {/* ====================================================== */}
            {/* MODAL CONTENT */}
            {/* ====================================================== */}

            {predictionLoading ? (
              <div className={styles.predictionLoading}>
                Loading prediction...
              </div>
            ) : predictionError ? (
              <div className={styles.predictionError}>{predictionError}</div>
            ) : selectedPrediction.length === 0 ? (
              <div className={styles.predictionEmpty}>
                This player has no saved prediction.
              </div>
            ) : (
              <div className={styles.predictionList}>
                <div className={styles.predictionTitle}>
                  <h3>Season Prediction</h3>

                  <span>{selectedPrediction.length} teams</span>
                </div>

                <div className={styles.predictionTeams}>
                  {selectedPrediction.map((item, index) => (
                    <div
                      key={item.team.teamId}
                      className={styles.predictionTeam}
                    >
                      <span className={styles.predictionPosition}>
                        {item.position || index + 1}
                      </span>

                      <img
                        src={item.team.logoUrl}
                        alt={item.team.name}
                        className={styles.predictionLogo}
                      />

                      <span className={styles.predictionTeamName}>
                        {item.team.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default MyLeaguesCard;
