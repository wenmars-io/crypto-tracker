/**
 * ApiResponse<T> - Generic wrapper for successful API responses
 */
export interface ApiSuccessResponse<T = unknown> {
  data: T;
  message?: string;
  statusCode: number;
  timestamp?: string; // ISO string
}

/**
 * ApiError - Standard shape for API errors
 */
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[] | string>;
  timestamp?: string; // ISO string
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
