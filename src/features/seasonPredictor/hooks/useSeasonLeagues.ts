import { useCallback, useEffect, useState } from "react";

import type { LeaguesTypes } from "../../../types/leagues.types";

import { LeagueService } from "../../../services/league.service";

interface UseSeasonLeaguesReturn {
  myLeagues: LeaguesTypes[];
  publicLeagues: LeaguesTypes[];

  loading: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  refreshMyLeagues: () => Promise<void>;
  refreshPublicLeagues: () => Promise<void>;
}

const GAME_TYPE = "SEASON_PREDICTOR" as const;

export const useSeasonLeagues = (
  seasonYear?: number,
): UseSeasonLeaguesReturn => {
  const [myLeagues, setMyLeagues] = useState<LeaguesTypes[]>([]);

  const [publicLeagues, setPublicLeagues] = useState<LeaguesTypes[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refreshMyLeagues = useCallback(async () => {
    const leagues = await LeagueService.getMyLeagues();

    setMyLeagues(leagues.filter((league) => league.gameType === GAME_TYPE));
  }, []);

  const refreshPublicLeagues = useCallback(async () => {
    const leagues = await LeagueService.getPublicLeagues(GAME_TYPE, seasonYear);

    setPublicLeagues(leagues);
  }, [seasonYear]);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await Promise.all([refreshMyLeagues(), refreshPublicLeagues()]);
    } catch (err) {
      console.error("Failed to load season leagues:", err);

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
