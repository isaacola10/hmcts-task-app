import type { CreateTaskRequest, Task } from "../types"
import axios, {AxiosError} from "axios"

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080"

export type ApiErrorPayload = {
    message?: string;
    errors?: Record<string, string[]>;
    [key: string]: unknown;
  };
  
  // ✅ AxiosErrorResponse type (guarantees `response` exists when present)
  export type AxiosErrorResponse<T = unknown> = AxiosError<T> & {
    response: NonNullable<AxiosError<T>["response"]>;
  };

export async function createTask(payload: CreateTaskRequest): Promise<Task> {
    const res = await axios.post(`${BASE_URL}/api/tasks`, payload)
    return res.data;
}