import { api } from "../../../services/api";
import type { TeamsTypes } from "../../../types/teams.types";

class TeamsService {
  async getAll(): Promise<TeamsTypes[]> {
    const response = await api.get("api/teams");

    return response.data;
  }

  async getById(id: number): Promise<TeamsTypes> {
    const response = await api.get(`api/teams/${id}`);

    return response.data;
  }
}

export default new TeamsService();
