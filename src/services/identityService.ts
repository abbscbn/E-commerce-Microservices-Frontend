import identityClient from "../api/identityClient";
import type {
  RegisterResponse,
  LoginResponse,
  RegisterRequest,
  LoginRequest,
} from "../types/identity";

export const identityService = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return identityClient.post("/register", data);
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    return identityClient.post("/login", data);
  },

  async logout(data: string): Promise<string> {
    return identityClient.post("/logout", data);
  },
};
