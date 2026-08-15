import { api } from "../../../services/api";

class PredictionService {
  async createPrediction(userId: number, teamIds: number[]) {
    const response = await api.post("api/predictions", {
      userId,
      teamIds,
    });

    return response.data;
  }

  async getPrediction(userId: number) {
    const response = await api.get(`api/predictions/user/${userId}`);

    return response.data;
  }
}

export default new PredictionService();
