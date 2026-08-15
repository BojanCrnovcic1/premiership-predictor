import { api } from "../../../services/api";
import type { LeaderboardPlayer } from "../../../types/leaderboard.types";

import type { MatchPredictionsTypes } from "../../../types/matches-predictions.types";

interface UpsertMatchPredictionData {
  matchId: number;
  homeScore: number;
  awayScore: number;
  isBoosted: boolean;
}

class MatchPredictionService {
  async upsertPrediction(
    data: UpsertMatchPredictionData,
  ): Promise<MatchPredictionsTypes> {
    const response = await api.post("api/match-predictions", data);

    return response.data;
  }

  async getMyPredictions(gameweekId: number): Promise<MatchPredictionsTypes[]> {
    const response = await api.get(
      `api/match-predictions/my/gameweek/${gameweekId}`,
    );

    return response.data;
  }

  async getUserPredictions(
    targetUserId: number,
    gameweekId: number,
  ): Promise<MatchPredictionsTypes[]> {
    const response = await api.get(
      `api/match-predictions/user/${targetUserId}/gameweek/${gameweekId}`,
    );

    return response.data;
  }

  async getLeagueUserPredictions(
    leagueId: number,
    targetUserId: number,
    gameweekId: number,
  ): Promise<MatchPredictionsTypes[]> {
    const response = await api.get(
      `api/match-predictions/league/${leagueId}/user/${targetUserId}/gameweek/${gameweekId}`,
    );

    return response.data;
  }

  async getGameweekLeaderboard(
    gameweekId: number,
  ): Promise<LeaderboardPlayer[]> {
    const response = await api.get(
      `api/match-predictions/leaderboard/gameweek/${gameweekId}`,
    );

    return response.data;
  }
  async getSeasonLeaderboard(seasonYear: number): Promise<LeaderboardPlayer[]> {
    const response = await api.get(
      `api/match-predictions/leaderboard/season/${seasonYear}`,
    );

    return response.data;
  }
}

export default new MatchPredictionService();
