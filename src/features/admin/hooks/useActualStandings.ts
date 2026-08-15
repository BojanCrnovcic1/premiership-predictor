import { useCallback, useEffect, useState } from "react";

import type { ActualStandingsTypes } from "../../../types/actual-standings.types";

import ActualStandingsService from "../services/actualStandings.service";
import { TeamsService } from "../../seasonPredictor/services";

export const useActualStandings = (initialSeason?: number) => {
  const [seasonYear, setSeasonYear] = useState(
    initialSeason ?? new Date().getFullYear(),
  );

  const [standings, setStandings] = useState<ActualStandingsTypes[]>([]);

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadStandings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ActualStandingsService.getBySeason(seasonYear);

      setStandings(data);
    } catch {
      setStandings([]);
      setError("Tabela za izabranu sezonu nije pronađena.");
    } finally {
      setLoading(false);
    }
  }, [seasonYear]);

  useEffect(() => {
    void loadStandings();
  }, [loadStandings]);

  const initializeSeason = async () => {
    try {
      setInitializing(true);
      setError(null);
      setMessage(null);

      const teams = await TeamsService.getAll();

      const initialStandings = teams.map((team, index) => {
        if (!team.teamId) {
          throw new Error(`Tim ${team.name} nema validan ID.`);
        }

        return {
          teamId: team.teamId,
          position: index + 1,
        };
      });

      await ActualStandingsService.initialize(seasonYear, initialStandings);

      setMessage("Tabela je uspješno inicijalizovana.");

      await loadStandings();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Greška prilikom inicijalizacije tabele.",
      );
    } finally {
      setInitializing(false);
    }
  };

  const updatePosition = async (teamId: number, newPosition: number) => {
    try {
      setSaving(true);
      setError(null);
      setMessage(null);

      await ActualStandingsService.updatePosition(
        seasonYear,
        teamId,
        newPosition,
      );

      await loadStandings();

      setMessage("Pozicija tima je uspješno ažurirana.");
    } catch {
      setError("Greška prilikom ažuriranja pozicije.");

      await loadStandings();
    } finally {
      setSaving(false);
    }
  };

  const resetSeason = async () => {
    try {
      setSaving(true);
      setError(null);
      setMessage(null);

      await ActualStandingsService.reset(seasonYear);

      setStandings([]);

      setMessage("Tabela sezone je uspješno resetovana.");
    } catch {
      setError("Greška prilikom resetovanja tabele.");
    } finally {
      setSaving(false);
    }
  };

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

  return {
    seasonYear,
    setSeasonYear,

    standings,

    loading,
    initializing,
    saving,

    error,
    message,

    loadStandings,
    initializeSeason,
    updatePosition,
    resetSeason,
    clearMessages,
  };
};
