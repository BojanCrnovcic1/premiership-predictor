import { api } from "./api";

import type { ActualStandingsTypes } from "../types/actual-standings.types";

class StandingsService {
  async getStandings(seasonYear: number): Promise<ActualStandingsTypes[]> {
    const response = await api.get(`api/standings/${seasonYear}`);

    return response.data;
  }
}

export default new StandingsService();
