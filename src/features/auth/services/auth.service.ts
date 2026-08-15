import { api } from "../../../services/api";
import type { UserTypes } from "../../../types/user.types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  teamName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  /**
   * Login
   */
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);

    return response.data;
  }

  /**
   * Register
   */
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);

    return response.data;
  }

  /**
   * Logged user
   */
  async getMe(): Promise<UserTypes> {
    const response = await api.get<UserTypes>("/auth/me");

    return response.data;
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });

    return response.data;
  }

  /**
   * Logout
   * (trenutno samo frontend)
   */
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export const authService = new AuthService();
