import { useCallback, useEffect, useState } from "react";

import type { GameweeksTypes } from "../../../types/gameweeks.types";

import GameweekService from "../services/gameweek.service";

export const useGameweeks = (initialSeason = new Date().getFullYear()) => {
  const [seasonYear, setSeasonYear] = useState(initialSeason);

  const [gameweeks, setGameweeks] = useState<GameweeksTypes[]>([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const loadGameweeks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await GameweekService.getBySeason(seasonYear);

      setGameweeks(data);
    } catch {
      setGameweeks([]);
      setError("Greška prilikom učitavanja kola.");
    } finally {
      setLoading(false);
    }
  }, [seasonYear]);

  useEffect(() => {
    void loadGameweeks();
  }, [loadGameweeks]);

  const createGameweek = async (data: { number: number; name: string }) => {
    try {
      setCreating(true);
      setError(null);
      setMessage(null);

      await GameweekService.create({
        seasonYear,
        number: data.number,
        name: data.name,
      });

      setMessage("Kolo je uspješno kreirano.");

      await loadGameweeks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Greška prilikom kreiranja kola.",
      );
    } finally {
      setCreating(false);
    }
  };

  const toggleFinish = async (gameweekId: number, isFinished: boolean) => {
    try {
      setUpdating(true);
      setError(null);
      setMessage(null);

      await GameweekService.toggleFinish(gameweekId, isFinished);

      setMessage(
        isFinished
          ? "Kolo je označeno kao završeno."
          : "Kolo je ponovo otvoreno.",
      );

      await loadGameweeks();
    } catch {
      setError("Greška prilikom promjene statusa kola.");
    } finally {
      setUpdating(false);
    }
  };

  return {
    seasonYear,
    setSeasonYear,

    gameweeks,

    loading,
    creating,
    updating,

    error,
    message,

    loadGameweeks,
    createGameweek,
    toggleFinish,
  };
};
