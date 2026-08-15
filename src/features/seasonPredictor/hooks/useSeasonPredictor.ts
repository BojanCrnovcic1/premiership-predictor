import { useCallback, useEffect, useState } from "react";

import type { LeaguesTypes } from "../../../types/leagues.types";
import type { ScoresTypes } from "../../../types/scores.types";
import type { TeamsTypes } from "../../../types/teams.types";

import { PredictionService, ScoreService, TeamsService } from "../services";
import { LeagueService } from "../../../services/league.service";

type SavedPredictionResponse =
  | {
      predictionItems?: Array<{
        teamId: number;
      }>;
    }
  | Array<{
      teamId: number;
    }>;

const orderTeamsByIds = (teams: TeamsTypes[], teamIds: number[]) => {
  return teamIds
    .map((id) => teams.find((team) => team.teamId === id))
    .filter((team): team is TeamsTypes => Boolean(team));
};

export const useSeasonPredictor = (userId?: number) => {
  const [teams, setTeams] = useState<TeamsTypes[]>([]);
  const [prediction, setPrediction] = useState<TeamsTypes[]>([]);
  const [myLeagues, setMyLeagues] = useState<LeaguesTypes[]>([]);
  const [publicLeagues, setPublicLeagues] = useState<LeaguesTypes[]>([]);
  const [globalRanks, setGlobalRanks] = useState<ScoresTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [teamsData, myLeaguesData, publicLeaguesData] = await Promise.all([
        TeamsService.getAll(),
        LeagueService.getMyLeagues(),
        LeagueService.getPublicLeagues(),
      ]);

      setTeams(teamsData);
      setMyLeagues(myLeaguesData);
      setPublicLeagues(publicLeaguesData);

      try {
        const savedPrediction = (await PredictionService.getPrediction(
          userId,
        )) as SavedPredictionResponse;

        const teamIds = Array.isArray(savedPrediction)
          ? savedPrediction.map((item) => item.teamId)
          : (savedPrediction.predictionItems?.map((item) => item.teamId) ?? []);

        if (teamIds.length > 0) {
          setPrediction(orderTeamsByIds(teamsData, teamIds));
        } else {
          setPrediction(teamsData);
        }
      } catch {
        setPrediction(teamsData);
      }

      try {
        const currentYear = new Date().getFullYear();
        const ranks = await ScoreService.getGlobalRanks(currentYear);
        setGlobalRanks(ranks);
      } catch {
        setGlobalRanks([]);
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const resetPrediction = () => {
    setPrediction(teams);
  };

  const shufflePrediction = () => {
    setPrediction((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const savePrediction = async () => {
    if (!userId) return;

    const teamIds = prediction
      .map((team) => team.teamId)
      .filter((id): id is number => typeof id === "number");

    await PredictionService.createPrediction(userId, teamIds);
  };

  return {
    loading,
    teams,
    prediction,
    setPrediction,
    myLeagues,
    publicLeagues,
    globalRanks,
    load,
    savePrediction,
    resetPrediction,
    shufflePrediction,
  };
};
