import { api } from "../../../services/api";

import type { MatchesTypes } from "../../../types/matches.types";

class MatchService {
  async getByGameweek(gameweekId: number): Promise<MatchesTypes[]> {
    const response = await api.get(`api/matches/gameweek/${gameweekId}`);

    return response.data;
  }

  async create(data: {
    gameweekId: number;
    homeTeamId: number;
    awayTeamId: number;
    kickoffTime: string;
  }): Promise<MatchesTypes> {
    const response = await api.post("api/matches", data);

    return response.data;
  }

  async updateScore(
    matchId: number,
    homeScore: number,
    awayScore: number,
  ): Promise<MatchesTypes> {
    const response = await api.patch(`api/matches/${matchId}/score`, {
      homeScore,
      awayScore,
    });

    return response.data;
  }
}

export default new MatchService();
