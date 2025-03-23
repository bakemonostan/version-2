import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie, deleteCookie } from "cookies-next/client";

export interface AxiosErrorResponse extends AxiosRequestConfig {
  error: string;
  message: string;
  response: { data: { message: string } };
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer",
  },
  withCredentials: false,
});


api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<AxiosErrorResponse>) => {
    let errorMessage = "An unknown error occurred";
    if (error.response) {
      if (error.response.status === 401) {
        deleteCookie("token");
        window.location.href = "/";
      }
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = "No response received from server";
    } else {
      errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
