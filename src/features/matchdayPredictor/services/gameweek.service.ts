import { api } from "../../../services/api";

import type { GameweeksTypes } from "../../../types/gameweeks.types";

class GameweekService {
  async getBySeason(seasonYear: number): Promise<GameweeksTypes[]> {
    const response = await api.get(`api/gameweeks/season/${seasonYear}`);

    return response.data;
  }

  async getById(gameweekId: number): Promise<GameweeksTypes> {
    const response = await api.get(`api/gameweeks/${gameweekId}`);

    return response.data;
  }
}

export default new GameweekService();
