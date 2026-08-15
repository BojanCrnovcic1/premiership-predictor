import { api } from "../../../services/api";

import type { ActualStandingsTypes } from "../../../types/actual-standings.types";

class ActualStandingsService {
  async getBySeason(seasonYear: number): Promise<ActualStandingsTypes[]> {
    const response = await api.get(`api/standings/${seasonYear}`);

    return response.data;
  }

  async initialize(
    seasonYear: number,
    standings: {
      teamId: number;
      position: number;
    }[],
  ) {
    const response = await api.post("api/standings/initialize", {
      seasonYear,
      standings,
    });

    return response.data;
  }

  async updatePosition(
    seasonYear: number,
    teamId: number,
    newPosition: number,
  ) {
    const response = await api.patch("api/standings/update-position", {
      seasonYear,
      teamId,
      newPosition,
    });

    return response.data;
  }

  async reset(seasonYear: number) {
    const response = await api.delete(`api/standings/${seasonYear}`);

    return response.data;
  }
}

export default new ActualStandingsService();
