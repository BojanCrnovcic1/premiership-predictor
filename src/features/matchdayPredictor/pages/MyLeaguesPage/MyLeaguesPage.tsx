import { useEffect, useState } from "react";

import Modal from "../../../../components/ui/Modal/Modal";

import { useLeagues } from "../../../../hooks/useLeagues";
import { LeagueService } from "../../../../services/league.service";

import type { GameweeksTypes } from "../../../../types/gameweeks.types";
import type { MatchPredictionsTypes } from "../../../../types/matches-predictions.types";

import GameweekService from "../../services/gameweek.service";
import MatchPredictionService from "../../services/matchPrediction.service";

import styles from "./MyLeaguesPage.module.scss";
import type { LeagueStandingsTypes } from "../../../seasonPredictor/types/league-standings.types";
import MatchPredictionDetails from "../../componentes/MatchPredictionDetails/MatchPredictionDetails";

interface MatchLeagueDetails {
  league: {
    leagueId: number;
    name: string;
    type: "PUBLIC" | "PRIVATE";
    gameType: "MATCH_PREDICTOR";
    seasonYear: number;
  };

  standings: LeagueStandingsTypes[];
}

const CURRENT_SEASON = 2026;

const MyLeaguesPage = () => {
  const { myLeagues, loading, error, refreshMyLeagues } =
    useLeagues("MATCH_PREDICTOR");

  const [gameweeks, setGameweeks] = useState<GameweeksTypes[]>([]);

  const [selectedGameweekId, setSelectedGameweekId] = useState<number | null>(
    null,
  );

  const [leagueData, setLeagueData] = useState<
    Record<number, MatchLeagueDetails>
  >({});

  const [loadingLeagueData, setLoadingLeagueData] = useState(true);

  const [leaving, setLeaving] = useState<number | null>(null);

  // ============================================================
  // LEAVE CONFIRMATION MODAL
  // ============================================================

  const [leaveLeagueId, setLeaveLeagueId] = useState<number | null>(null);

  // ============================================================
  // PREDICTION MODAL
  // ============================================================

  const [predictionOpen, setPredictionOpen] = useState(false);

  const [predictionLoading, setPredictionLoading] = useState(false);

  const [selectedPlayer, setSelectedPlayer] =
    useState<LeagueStandingsTypes | null>(null);

  const [userPredictions, setUserPredictions] = useState<
    MatchPredictionsTypes[]
  >([]);

  // ============================================================
  // LOAD GAMEWEEKS
  // ============================================================

  useEffect(() => {
    const loadGameweeks = async () => {
      try {
        const data = await GameweekService.getBySeason(CURRENT_SEASON);

        setGameweeks(data);

        if (data.length > 0) {
          const active =
            data.find((gameweek) => !gameweek.isFinished) ??
            data[data.length - 1];

          if (active?.gameweekId !== undefined) {
            setSelectedGameweekId(active.gameweekId);
          }
        }
      } catch (err) {
        console.error("Failed to load gameweeks:", err);
      }
    };

    void loadGameweeks();
  }, []);

  // ============================================================
  // LOAD LEAGUE DETAILS
  // ============================================================

  useEffect(() => {
    const loadLeagueData = async () => {
      if (myLeagues.length === 0) {
        setLeagueData({});
        setLoadingLeagueData(false);
        return;
      }

      try {
        setLoadingLeagueData(true);

        const entries = await Promise.all(
          myLeagues.map(async (league) => {
            const details = await LeagueService.getMatchLeagueDetails(
              league.leagueId,
            );

            return [league.leagueId, details] as const;
          }),
        );

        setLeagueData(Object.fromEntries(entries));
      } catch (err) {
        console.error("Failed to load match league details:", err);
      } finally {
        setLoadingLeagueData(false);
      }
    };

    void loadLeagueData();
  }, [myLeagues]);

  // ============================================================
  // OPEN PREDICTION MODAL
  // ============================================================

  const handleOpenPrediction = async (player: LeagueStandingsTypes) => {
    if (!selectedGameweekId) {
      return;
    }

    setSelectedPlayer(player);
    setPredictionOpen(true);
    setPredictionLoading(true);
    setUserPredictions([]);

    try {
      const predictions = await MatchPredictionService.getUserPredictions(
        player.userId,
        selectedGameweekId,
      );

      setUserPredictions(predictions);
    } catch (err) {
      console.error("Failed to load user predictions:", err);
    } finally {
      setPredictionLoading(false);
    }
  };

  const handleClosePrediction = () => {
    setPredictionOpen(false);
    setSelectedPlayer(null);
    setUserPredictions([]);
  };

  // ============================================================
  // LEAVE
  // ============================================================

  const handleLeave = async (leagueId: number) => {
    try {
      setLeaving(leagueId);

      await LeagueService.leaveLeague(leagueId);

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

  if (error) {
    return <div className={styles.loading}>{error}</div>;
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <span className={styles.eyebrow}>MATCH PREDICTOR</span>

            <h1 className={styles.title}>My Leagues</h1>
          </div>

          {gameweeks.length > 0 && (
            <select
              value={selectedGameweekId ?? ""}
              onChange={(event) =>
                setSelectedGameweekId(Number(event.target.value))
              }
              className={styles.gameweekSelect}
            >
              {gameweeks.map((gameweek) => (
                <option key={gameweek.gameweekId} value={gameweek.gameweekId}>
                  {gameweek.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {myLeagues.length === 0 ? (
          <div className={styles.empty}>
            You are not a member of any league.
          </div>
        ) : (
          <div className={styles.grid}>
            {myLeagues.map((league) => {
              const data = leagueData[league.leagueId];

              const standings = data?.standings ?? [];

              return (
                <div key={league.leagueId} className={styles.card}>
                  <h3>{league.name}</h3>

                  <div className={styles.badgeGroup}>
                    <span
                      className={`${styles.badge} ${
                        league.type === "PUBLIC" ? styles.public : ""
                      }`}
                    >
                      {league.type}
                    </span>

                    <span className={styles.badge}>MATCH PREDICTOR</span>
                  </div>

                  {league.code && (
                    <div className={styles.codeBox}>
                      Code: <span>{league.code}</span>
                    </div>
                  )}

                  {loadingLeagueData && !data ? (
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
                              <tr
                                key={player.userId}
                                className={styles.clickableRow}
                                onClick={() =>
                                  void handleOpenPrediction(player)
                                }
                              >
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

                  <button
                    type="button"
                    onClick={() => handleOpenLeaveConfirmation(league.leagueId)}
                    disabled={leaving === league.leagueId}
                  >
                    {leaving === league.leagueId
                      ? "Leaving..."
                      : "Leave League"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================
          PREDICTION MODAL
      ============================================================ */}

      <Modal open={predictionOpen} onClose={handleClosePrediction}>
        {predictionLoading ? (
          <div className={styles.loading}>Loading prediction...</div>
        ) : selectedPlayer ? (
          <MatchPredictionDetails
            playerName={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
            predictions={userPredictions}
          />
        ) : null}
      </Modal>

      {/* ============================================================
          LEAVE LEAGUE CONFIRMATION MODAL
      ============================================================ */}

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
    </>
  );
};

export default MyLeaguesPage;
