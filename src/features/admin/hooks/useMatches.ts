import { useCallback, useEffect, useState } from "react";

import type { MatchesTypes } from "../../../types/matches.types";

import MatchService from "../services/match.service";

export const useMatches = (gameweekId?: number) => {
  const [matches, setMatches] = useState<MatchesTypes[]>([]);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updatingScore, setUpdatingScore] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const loadMatches = useCallback(async () => {
    if (!gameweekId) {
      setMatches([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await MatchService.getByGameweek(gameweekId);

      setMatches(data);
    } catch {
      setMatches([]);
      setError("Greška prilikom učitavanja utakmica.");
    } finally {
      setLoading(false);
    }
  }, [gameweekId]);

  useEffect(() => {
    void loadMatches();
  }, [loadMatches]);

  const createMatch = async (data: {
    homeTeamId: number;
    awayTeamId: number;
    kickoffTime: string;
  }) => {
    if (!gameweekId) return;

    try {
      setCreating(true);
      setError(null);
      setMessage(null);

      await MatchService.create({
        gameweekId,
        homeTeamId: data.homeTeamId,
        awayTeamId: data.awayTeamId,
        kickoffTime: data.kickoffTime,
      });

      setMessage("Utakmica je uspješno dodata.");

      await loadMatches();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Greška prilikom dodavanja utakmice.",
      );
    } finally {
      setCreating(false);
    }
  };

  const updateScore = async (
    matchId: number,
    homeScore: number,
    awayScore: number,
  ) => {
    try {
      setUpdatingScore(true);
      setError(null);
      setMessage(null);

      await MatchService.updateScore(matchId, homeScore, awayScore);

      setMessage("Rezultat je uspješno ažuriran.");

      await loadMatches();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Greška prilikom ažuriranja rezultata.",
      );
    } finally {
      setUpdatingScore(false);
    }
  };

  return {
    matches,

    loading,
    creating,
    updatingScore,

    error,
    message,

    loadMatches,
    createMatch,
    updateScore,
  };
};
