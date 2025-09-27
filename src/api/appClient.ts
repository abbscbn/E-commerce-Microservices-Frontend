import axios, { AxiosError } from "axios";
import { unwrapResponse } from "../utils/unwrapResponse";
import type { ApiError } from "../types/error";

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
    (response) => unwrapResponse(response.data),
    (error: AxiosError) => {
      let apiError: ApiError = { message: "Bilinmeyen hata oluştu" };

      if (error.response?.data && (error.response.data as any).apiError) {
        apiError = {
          message: (error.response.data as any).apiError.message,
          status: error.response.status,
        };
      } else if (error.message) {
        apiError = { message: error.message };
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};
