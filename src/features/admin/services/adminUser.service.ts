import { api } from "../../../services/api";

class AdminUserService {
  async getUsers(params: {
    page: number;
    limit: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    teamName?: string;
  }) {
    const response = await api.get("api/users/filter", {
      params,
    });

    return response.data;
  }

  async deleteUser(userId: number) {
    const response = await api.delete(`api/users/remove/${userId}`);

    return response.data;
  }

  async getUserPrediction(userId: number) {
    const response = await api.get(`api/predictions/user/${userId}`);

    return response.data;
  }
}

export default new AdminUserService();
