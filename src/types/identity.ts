export interface RegisterResponse {
  response: string;
}
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
  roles: string[]; 
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
