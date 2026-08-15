import { useCallback, useEffect, useState } from "react";

import type { LeaguesTypes } from "../types/leagues.types";

import { LeagueService, type LeagueGameType } from "../services/league.service";

interface UseLeaguesReturn {
  myLeagues: LeaguesTypes[];
  publicLeagues: LeaguesTypes[];

  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  refreshMyLeagues: () => Promise<void>;
  refreshPublicLeagues: () => Promise<void>;
}

export const useLeagues = (
  gameType: LeagueGameType,
  seasonYear?: number,
): UseLeaguesReturn => {
  const [myLeagues, setMyLeagues] = useState<LeaguesTypes[]>([]);

  const [publicLeagues, setPublicLeagues] = useState<LeaguesTypes[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refreshMyLeagues = useCallback(async () => {
    const leagues = await LeagueService.getMyLeagues();

    const filteredLeagues = leagues.filter(
      (league) => league.gameType === gameType,
    );

    setMyLeagues(filteredLeagues);
  }, [gameType]);

  const refreshPublicLeagues = useCallback(async () => {
    const leagues = await LeagueService.getPublicLeagues(gameType, seasonYear);

    const filteredLeagues = leagues.filter(
      (league) => league.gameType === gameType,
    );

    setPublicLeagues(filteredLeagues);
  }, [gameType, seasonYear]);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all([refreshMyLeagues(), refreshPublicLeagues()]);
    } catch (err) {
      console.error("Failed to load leagues:", err);

      setError("Greška prilikom učitavanja liga.");
    } finally {
      setLoading(false);
    }
  }, [refreshMyLeagues, refreshPublicLeagues]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    myLeagues,
    publicLeagues,

    loading,
    error,

    refresh,
    refreshMyLeagues,
    refreshPublicLeagues,
  };
};
