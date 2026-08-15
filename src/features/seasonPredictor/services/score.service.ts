import { api } from "../../../services/api";
import type { ScoresTypes } from "../../../types/scores.types";

class ScoreService {
  async getGlobalRanks(currentYear: number): Promise<ScoresTypes[]> {
    const response = await api.get(`api/scores/${currentYear}/top`);

    return response.data;
  }
}

export default new ScoreService();
