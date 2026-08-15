import { useEffect, useState } from "react";

import styles from "./MyLeaguesPage.module.scss";

import { useSeasonLeagues } from "../../hooks/useSeasonLeagues";
import { SeasonLeagueService } from "../../services/seasonLeague.service";
import { LeagueService } from "../../../../services/league.service";
import { PredictionService } from "../../services";

import Modal from "../../../../components/ui/Modal/Modal";

import type { LeaguesTypes } from "../../../../types/leagues.types";
import type { LeagueMemberTypes } from "../../../../types/league-member.types";
import type { LeagueStandingsTypes } from "../../types/league-standings.types";
import type { TeamsTypes } from "../../../../types/teams.types";

const SEASON_YEAR = 2026;

interface LeagueData {
  members: LeagueMemberTypes[];
  standings: LeagueStandingsTypes[];
}

interface PredictionItem {
  teamId: number;
  position: number;
  team: TeamsTypes;
}

interface PredictionResponse {
  predictionItems: PredictionItem[];
}

const MySeasonLeaguesPage = () => {
  const { myLeagues, loading, error, refreshMyLeagues } =
    useSeasonLeagues(SEASON_YEAR);

  const [leaving, setLeaving] = useState<number | null>(null);

  // ============================================================
  // LEAVE CONFIRMATION MODAL
  // ============================================================

  const [leaveLeagueId, setLeaveLeagueId] = useState<number | null>(null);

  const [leagueData, setLeagueData] = useState<Record<number, LeagueData>>({});

  const [loadingLeagueData, setLoadingLeagueData] = useState(false);

  // ============================================================
  // PREDICTION MODAL
  // ============================================================

  const [predictionOpen, setPredictionOpen] = useState(false);

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [predictionError, setPredictionError] = useState("");

  const [selectedPlayer, setSelectedPlayer] =
    useState<LeagueMemberTypes | null>(null);

  const [selectedPrediction, setSelectedPrediction] = useState<
    PredictionItem[]
  >([]);

  // ============================================================
  // LOAD MEMBERS + STANDINGS
  // ============================================================

  useEffect(() => {
    const loadLeagueData = async () => {
      if (myLeagues.length === 0) {
        setLeagueData({});
        return;
      }

      try {
        setLoadingLeagueData(true);

        const entries = await Promise.all(
          myLeagues.map(async (league) => {
            const [members, standings] = await Promise.all([
              LeagueService.getLeagueMembers(league.leagueId),
              LeagueService.getLeagueStandings(league.leagueId),
            ]);

            /*
             * BITNO:
             * Season Predictor mora biti sortiran po totalScore DESC.
             *
             * Backend position možemo koristiti ako ga backend već računa,
             * ali ovdje eksplicitno sortiramo po bodovima.
             */
            const sortedStandings = [...standings].sort((a, b) => {
              const scoreA = Number(a.totalScore ?? a.pointsWon ?? 0);

              const scoreB = Number(b.totalScore ?? b.pointsWon ?? 0);

              return scoreB - scoreA;
            });

            /*
             * Ponovo napravimo position na frontendu.
             *
             * Prvi sa najviše bodova = 1
             * drugi = 2
             * itd.
             */
            const standingsWithPosition = sortedStandings.map(
              (standing, index) => ({
                ...standing,
                position: index + 1,
              }),
            );

            return [
              league.leagueId,
              {
                members,
                standings: standingsWithPosition,
              },
            ] as const;
          }),
        );

        setLeagueData(Object.fromEntries(entries));
      } catch (err) {
        console.error("Failed to load league members and standings:", err);
      } finally {
        setLoadingLeagueData(false);
      }
    };

    void loadLeagueData();
  }, [myLeagues]);

  // ============================================================
  // OPEN PLAYER PREDICTION
  // ============================================================

  const handleOpenPrediction = async (member: LeagueMemberTypes) => {
    try {
      setSelectedPlayer(member);

      setPredictionOpen(true);

      setPredictionLoading(true);

      setPredictionError("");

      setSelectedPrediction([]);

      const response = (await PredictionService.getPrediction(
        member.userId,
      )) as PredictionResponse;

      const items = response.predictionItems ?? [];

      const sortedItems = [...items].sort((a, b) => a.position - b.position);

      setSelectedPrediction(sortedItems);
    } catch (err) {
      console.error("Failed to load player prediction:", err);

      setPredictionError("Predikcija ovog igrača nije pronađena.");
    } finally {
      setPredictionLoading(false);
    }
  };

  // ============================================================
  // CLOSE PREDICTION MODAL
  // ============================================================

  const handleClosePrediction = () => {
    setPredictionOpen(false);
    setSelectedPlayer(null);
    setSelectedPrediction([]);
    setPredictionError("");
  };

  // ============================================================
  // LEAVE
  // ============================================================

  const handleLeave = async (leagueId: number) => {
    try {
      setLeaving(leagueId);

      await SeasonLeagueService.leaveLeague(leagueId);

      setLeagueData((current) => {
        const updated = { ...current };

        delete updated[leagueId];

        return updated;
      });

      await refreshMyLeagues();
    } catch (err) {
      console.error("Failed to leave league:", err);
    } finally {
      setLeaving(null);
    }
  };

  // ============================================================
  // LEAVE CONFIRMATION
  // ============================================================

  const handleOpenLeaveConfirmation = (leagueId: number) => {
    setLeaveLeagueId(leagueId);
  };

  const handleCloseLeaveConfirmation = () => {
    if (leaving === null) {
      setLeaveLeagueId(null);
    }
  };

  const handleConfirmLeave = async () => {
    if (leaveLeagueId === null) {
      return;
    }

    const leagueId = leaveLeagueId;

    setLeaveLeagueId(null);

    await handleLeave(leagueId);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return <div className={styles.loading}>Loading leagues...</div>;
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return <div className={styles.loading}>{error}</div>;
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>My Leagues</h1>

      {myLeagues.length === 0 ? (
        <div className={styles.empty}>You are not a member of any league.</div>
      ) : (
        <div className={styles.grid}>
          {myLeagues.map((league: LeaguesTypes) => {
            const data = leagueData[league.leagueId];

            const members = data?.members ?? [];

            const standings = data?.standings ?? [];

            return (
              <div key={league.leagueId} className={styles.card}>
                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className={styles.cardHeader}>
                  <div>
                    <h3>{league.name}</h3>

                    <div className={styles.badgeGroup}>
                      <span
                        className={`${styles.badge} ${
                          league.type === "PUBLIC" ? styles.public : ""
                        }`}
                      >
                        {league.type}
                      </span>

                      <span className={styles.badge}>SEASON PREDICTOR</span>
                    </div>
                  </div>

                  <div className={styles.playersCount}>
                    {members.length}{" "}
                    {members.length === 1 ? "player" : "players"}
                  </div>
                </div>

                {/* ==================================================
                    LEAGUE INFO
                ================================================== */}

                {league.code && (
                  <div className={styles.codeBox}>
                    Code: <span>{league.code}</span>
                  </div>
                )}

                <div className={styles.season}>
                  Season: {league.seasonYear ?? SEASON_YEAR}
                </div>

                {/* ==================================================
                    MEMBERS + STANDINGS
                ================================================== */}

                {loadingLeagueData && !data ? (
                  <div className={styles.loadingLeague}>
                    Loading league standings...
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
                          <th>Prediction</th>
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
                          standings.map((standing) => {
                            const member = members.find(
                              (item) => item.userId === standing.userId,
                            );

                            if (!member) {
                              return null;
                            }

                            const score = Number(
                              standing.totalScore ?? standing.pointsWon ?? 0,
                            );

                            return (
                              <tr
                                key={member.userId}
                                className={styles.clickableRow}
                                onClick={() =>
                                  void handleOpenPrediction(member)
                                }
                              >
                                {/* RANK */}
                                <td>
                                  <strong>{standing.position}</strong>
                                </td>

                                {/* TEAM */}
                                <td>{member.teamName || "-"}</td>

                                {/* PLAYER */}
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

                                {/* SCORE */}
                                <td>
                                  <strong>{score}</strong>
                                </td>

                                {/* PREDICTION */}
                                <td>
                                  <button
                                    type="button"
                                    className={styles.predictionButton}
                                    onClick={(event) => {
                                      event.stopPropagation();

                                      void handleOpenPrediction(member);
                                    }}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ==================================================
                    LEAVE
                ================================================== */}

                <button
                  type="button"
                  onClick={() => handleOpenLeaveConfirmation(league.leagueId)}
                  disabled={leaving === league.leagueId}
                  className={styles.leaveButton}
                >
                  {leaving === league.leagueId ? "Leaving..." : "Leave League"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ==========================================================
          PLAYER PREDICTION MODAL
      ========================================================== */}

      <Modal open={predictionOpen} onClose={handleClosePrediction}>
        <div className={styles.predictionModal}>
          <div className={styles.predictionModalHeader}>
            <div>
              <h2>Season Prediction</h2>

              {selectedPlayer && (
                <p>
                  {selectedPlayer.firstName} {selectedPlayer.lastName}
                </p>
              )}
            </div>
          </div>

          {predictionLoading ? (
            <div className={styles.predictionLoading}>
              Loading prediction...
            </div>
          ) : predictionError ? (
            <div className={styles.predictionError}>{predictionError}</div>
          ) : selectedPrediction.length === 0 ? (
            <div className={styles.predictionEmpty}>
              This player has no prediction.
            </div>
          ) : (
            <div className={styles.predictionList}>
              {selectedPrediction.map((item) => (
                <div key={item.teamId} className={styles.predictionItem}>
                  <span className={styles.predictionPosition}>
                    {item.position}
                  </span>

                  <img
                    src={item.team.logoUrl}
                    alt={item.team.name}
                    className={styles.predictionLogo}
                  />

                  <span className={styles.predictionTeam}>
                    {item.team.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* ==========================================================
          LEAVE LEAGUE CONFIRMATION MODAL
      ========================================================== */}

      <Modal
        open={leaveLeagueId !== null}
        onClose={handleCloseLeaveConfirmation}
      >
        <div className={styles.leaveModal}>
          <div className={styles.leaveModalHeader}>
            <h2>Leave League?</h2>

            <p>Are you sure you want to leave this league?</p>
          </div>

          <div className={styles.leaveModalWarning}>
            This action cannot be undone. You will need to join the league again
            if you want to participate in it.
          </div>

          <div className={styles.leaveModalActions}>
            <button
              type="button"
              className={styles.leaveModalCancel}
              onClick={handleCloseLeaveConfirmation}
              disabled={leaving !== null}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.leaveModalConfirm}
              onClick={() => void handleConfirmLeave()}
              disabled={leaving !== null}
            >
              {leaving !== null ? "Leaving..." : "Leave League"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MySeasonLeaguesPage;
