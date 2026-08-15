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
