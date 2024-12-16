export interface ApiResponse<T> {
  code: number;
  message: string | null;
  data: T | null;
  success: boolean;
}
