import type { ApiError } from "../types/error";
import type { RootResponse } from "../types/rootResponse";

export function unwrapResponse<T>(res: RootResponse<T>): T {
  if (!res.data) {
    // normalize error
    const error: ApiError = { message: "Boş veri döndü" };
    throw error;
  }
  return res.data as T;
}
