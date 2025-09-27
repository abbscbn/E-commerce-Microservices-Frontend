export interface RootResponse<T> {
  result: boolean;
  status: number;
  path: string;
  hostName: string;
  localDateTime: string;
  apiError?: {
    message: any;
  } | null;
  data?: T | null;
}
