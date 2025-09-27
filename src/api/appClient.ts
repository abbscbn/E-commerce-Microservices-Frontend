import axios from "axios";
import type { RootResponse } from "../types/rootResponse";

// unwrap helper
function unwrapResponse<T>(res: RootResponse<T>): T {
  if (!res.data) {
    throw new Error(res.apiError?.message ?? "Bilinmeyen hata");
  }
  return res.data;
}

export const createApiClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // REQUEST INTERCEPTOR: token ekleme
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // RESPONSE INTERCEPTOR: RootResponse unwrap
  client.interceptors.response.use(
    (response) => unwrapResponse(response.data), // TS artık return tipini T olarak alacak
    (error) => Promise.reject(error)
  );

  return client;
};
