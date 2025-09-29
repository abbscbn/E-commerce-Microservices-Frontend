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
  //LoginResponse
  async login(data: LoginRequest): Promise<LoginResponse> {
    return identityClient.post("/login", data);
  },

  async adminLogin(data: LoginRequest): Promise<LoginResponse> {
    return identityClient.post("/admin", data);
  },

  async logout(): Promise<string> {

    const token = localStorage.getItem("token");
    
    return identityClient.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
