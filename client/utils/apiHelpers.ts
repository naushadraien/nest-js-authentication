import { envs } from "@/config/envs";
import axios from "axios";

// Extend AxiosResponse to include the 'ok' property
declare module "axios" {
  export interface AxiosResponse<T = any> {
    ok?: boolean;
  }
}

// Create Axios instance with base URL
const axiosInstance = axios.create({
  baseURL: envs.BACKEND_URL,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const tokens = await axios.get(
        `http://localhost:3000/api/auth/getSession`
      );
      console.log("🚀 ~ tokens:", tokens);

      if (tokens?.data.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.data.accessToken}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    response.ok = response.status >= 200 && response.status < 300;
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check if the error message indicates an expired token
      if (error.response.data?.message === "Unauthorized") {
        try {
          const tokens = await axios.get(
            `http://localhost:3000/api/auth/getSession`
          );
          const data = await axios.post(`${envs.BACKEND_URL}/auth/refresh`, {
            refreshToken: tokens.data.refreshToken,
          });

          await axios.post(`http://localhost:3000/api/auth/updateSession`, {
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          });
          console.log("🚀 ~ data:", data.data.accessToken);

          // Update the default Authorization header
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.data.accessToken}`;

          // Update the Authorization header of the original request
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.data.accessToken}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          alert("Session expired. Please log in again.");
          // // Redirect to login page
          // if (typeof window !== "undefined") {
          //   window.location.href = "/auth/signin";
          // }
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Clear Axios configuration and remove token from AsyncStorage
export const clearAxiosConfig = () => {
  delete axiosInstance.defaults.headers.Authorization;
  delete axiosInstance.defaults.headers.common.Authorization;
};

// Set Authorization header and store token in AsyncStorage
export const setAuthorizationHeader = (token: string = "") => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

// Set base URL for Axios instance
export const setAxiosInstanceBaseURL = (baseURL: string) => {
  axiosInstance.defaults.baseURL = baseURL;
};

export default axiosInstance;
