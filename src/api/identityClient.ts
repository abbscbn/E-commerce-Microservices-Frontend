import axios from "axios";
import type { RootResponse } from "../types/rootResponse";

const identityClient = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// unwrap helper
function unwrapResponse<T>(res: RootResponse<T>): T {
  if (!res.data) {
    throw new Error(res.apiError?.message ?? "Bilinmeyen hata");
  }
  return res.data;
}

identityClient.interceptors.response.use(
  (response) => unwrapResponse(response.data), // TS artık return tipini T olarak alacak
  (error) => Promise.reject(error)
);

export default identityClient;
