import { useCallback, useEffect, useState } from "react";

import type { LeaguesTypes } from "../../../types/leagues.types";

import { MatchLeagueService } from "../services/matchLeague.service";

interface UseMatchLeaguesReturn {
  myLeagues: LeaguesTypes[];
  publicLeagues: LeaguesTypes[];

  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  refreshMyLeagues: () => Promise<void>;
  refreshPublicLeagues: () => Promise<void>;
}

export const useMatchLeagues = (): UseMatchLeaguesReturn => {
  const [myLeagues, setMyLeagues] = useState<LeaguesTypes[]>([]);

  const [publicLeagues, setPublicLeagues] = useState<LeaguesTypes[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refreshMyLeagues = useCallback(async () => {
    const leagues = await MatchLeagueService.getMyLeagues();

    setMyLeagues(leagues);
  }, []);

  const refreshPublicLeagues = useCallback(async () => {
    const leagues = await MatchLeagueService.getPublicLeagues();

    setPublicLeagues(leagues);
  }, []);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all([refreshMyLeagues(), refreshPublicLeagues()]);
    } catch (err) {
      console.error("Failed to load match leagues:", err);

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
