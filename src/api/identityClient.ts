import axios, { AxiosError } from "axios";
import { unwrapResponse } from "../utils/unwrapResponse";
import type { ApiError } from "../types/error";

const identityClient = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// unwrap helper

identityClient.interceptors.response.use(
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

export default identityClient;
