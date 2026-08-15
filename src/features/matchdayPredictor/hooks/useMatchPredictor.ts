import { useCallback, useEffect, useState } from "react";

import type { GameweeksTypes } from "../../../types/gameweeks.types";
import type { LeaderboardPlayer } from "../../../types/leaderboard.types";

import GameweekService from "../services/gameweek.service";
import MatchPredictionService from "../services/matchPrediction.service";

interface LocalPrediction {
  homeScore: number | null;
  awayScore: number | null;
  isBoosted: boolean;
}

export const useMatchPredictor = (seasonYear: number) => {
  const [gameweeks, setGameweeks] = useState<GameweeksTypes[]>([]);

  const [selectedGameweekId, setSelectedGameweekId] = useState<number | null>(
    null,
  );

  const [predictions, setPredictions] = useState<
    Record<number, LocalPrediction>
  >({});

  const [loading, setLoading] = useState(true);

  const [savingPredictions, setSavingPredictions] = useState(false);

  const [gameweekLeaderboard, setGameweekLeaderboard] = useState<
    LeaderboardPlayer[]
  >([]);

  const [seasonLeaderboard, setSeasonLeaderboard] = useState<
    LeaderboardPlayer[]
  >([]);

  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // ============================================================
  // LOAD GAMEWEEKS
  // ============================================================

  const loadGameweeks = useCallback(async () => {
    setLoading(true);

    try {
      const data = await GameweekService.getBySeason(seasonYear);

      setGameweeks(data);

      if (data.length > 0) {
        const latestGameweek = data[data.length - 1];

        if (latestGameweek?.gameweekId) {
          setSelectedGameweekId(latestGameweek.gameweekId);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [seasonYear]);

  // ============================================================
  // LOAD MY PREDICTIONS
  // ============================================================

  const loadPredictions = useCallback(async (gameweekId: number) => {
    const data = await MatchPredictionService.getMyPredictions(gameweekId);

    const mapped: Record<number, LocalPrediction> = {};

    data.forEach((prediction) => {
      mapped[prediction.matchId] = {
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
        isBoosted: prediction.isBoosted,
      };
    });

    setPredictions(mapped);
  }, []);

  // ============================================================
  // LOAD GAMEWEEK LEADERBOARD
  // ============================================================

  const loadGameweekLeaderboard = useCallback(async (gameweekId: number) => {
    const data =
      await MatchPredictionService.getGameweekLeaderboard(gameweekId);

    setGameweekLeaderboard(data);
  }, []);

  // ============================================================
  // LOAD SEASON LEADERBOARD
  // ============================================================

  const loadSeasonLeaderboard = useCallback(async () => {
    const data = await MatchPredictionService.getSeasonLeaderboard(seasonYear);

    setSeasonLeaderboard(data);
  }, [seasonYear]);

  // ============================================================
  // GET USER PREDICTIONS
  // ============================================================
  const savePrediction = async (matchId: number) => {
    const prediction = predictions[matchId];

    if (!prediction) {
      return;
    }

    if (prediction.homeScore === null || prediction.awayScore === null) {
      return;
    }

    setSavingPredictions(true);

    try {
      const saved = await MatchPredictionService.upsertPrediction({
        matchId,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
        isBoosted: prediction.isBoosted,
      });

      setPredictions((previous) => ({
        ...previous,
        [matchId]: {
          homeScore: saved.homeScore,
          awayScore: saved.awayScore,
          isBoosted: saved.isBoosted,
        },
      }));
    } finally {
      setSavingPredictions(false);
    }
  };

  const getUserPredictions = useCallback(
    async (targetUserId: number, gameweekId: number) => {
      return MatchPredictionService.getUserPredictions(
        targetUserId,
        gameweekId,
      );
    },
    [],
  );

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    void loadGameweeks();
  }, [loadGameweeks]);

  useEffect(() => {
    setLeaderboardLoading(true);

    void loadSeasonLeaderboard().finally(() => {
      setLeaderboardLoading(false);
    });
  }, [loadSeasonLeaderboard]);

  // ============================================================
  // GAMEWEEK CHANGE
  // ============================================================

  useEffect(() => {
    if (!selectedGameweekId) {
      return;
    }

    void loadPredictions(selectedGameweekId);
  }, [selectedGameweekId, loadPredictions]);

  useEffect(() => {
    if (!selectedGameweekId) {
      return;
    }

    void loadGameweekLeaderboard(selectedGameweekId);
  }, [selectedGameweekId, loadGameweekLeaderboard]);

  // ============================================================
  // UPDATE LOCAL PREDICTION
  // ============================================================

  const updatePrediction = (
    matchId: number,
    data: Partial<LocalPrediction>,
  ) => {
    setPredictions((previous) => {
      const current = previous[matchId] ?? {
        homeScore: null,
        awayScore: null,
        isBoosted: false,
      };

      return {
        ...previous,
        [matchId]: {
          ...current,
          ...data,
        },
      };
    });
  };

  // ============================================================
  // UPDATE BOOST
  // ============================================================

  const updateBoost = (matchId: number, isBoosted: boolean) => {
    setPredictions((previous) => {
      const next = { ...previous };

      if (isBoosted) {
        // Skidamo Boost sa svih drugih utakmica.
        Object.keys(next).forEach((id) => {
          const numericId = Number(id);

          if (numericId !== matchId && next[numericId]) {
            next[numericId] = {
              ...next[numericId],
              isBoosted: false,
            };
          }
        });
      }

      const current = next[matchId] ?? {
        homeScore: null,
        awayScore: null,
        isBoosted: false,
      };

      next[matchId] = {
        ...current,
        isBoosted,
      };

      return next;
    });
  };

  // ============================================================
  // SAVE ALL PREDICTIONS
  // ============================================================

  const savePredictions = async () => {
    if (!selectedGameweek) {
      return;
    }

    const predictionsToSave = selectedGameweek.matches
      .filter((match) => {
        if (!match.matchId) {
          return false;
        }

        const prediction = predictions[match.matchId];

        return (
          prediction &&
          prediction.homeScore !== null &&
          prediction.awayScore !== null
        );
      })
      .map((match) => ({
        matchId: match.matchId!,
        prediction: predictions[match.matchId!]!,
      }));

    if (predictionsToSave.length === 0) {
      return;
    }

    setSavingPredictions(true);

    try {
      for (const item of predictionsToSave) {
        const saved = await MatchPredictionService.upsertPrediction({
          matchId: item.matchId,
          homeScore: item.prediction.homeScore!,
          awayScore: item.prediction.awayScore!,
          isBoosted: item.prediction.isBoosted,
        });

        setPredictions((previous) => ({
          ...previous,
          [item.matchId]: {
            homeScore: saved.homeScore,
            awayScore: saved.awayScore,
            isBoosted: saved.isBoosted,
          },
        }));
      }
    } finally {
      setSavingPredictions(false);
    }
  };

  // ============================================================
  // SELECTED GAMEWEEK
  // ============================================================

  const selectedGameweek = gameweeks.find(
    (gameweek) => gameweek.gameweekId === selectedGameweekId,
  );

  return {
    loading,

    gameweeks,
    selectedGameweek,
    selectedGameweekId,

    predictions,
    savingPredictions,

    gameweekLeaderboard,
    seasonLeaderboard,
    leaderboardLoading,

    setSelectedGameweekId,

    updatePrediction,
    updateBoost,
    savePredictions,

    savePrediction,

    getUserPredictions,

    reloadGameweekLeaderboard: () =>
      selectedGameweekId
        ? loadGameweekLeaderboard(selectedGameweekId)
        : undefined,

    reloadSeasonLeaderboard: loadSeasonLeaderboard,

    reloadPredictions: () =>
      selectedGameweekId ? loadPredictions(selectedGameweekId) : undefined,
  };
};
