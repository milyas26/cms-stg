import axios from "axios";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  setToken,
} from "@/utils/authUtils";

const msUserGuardedClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_PORTAL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor
msUserGuardedClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
msUserGuardedClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      return new Promise(function (resolve, reject) {
        const payload = {
          refreshToken,
        };
        msUserGuardedClient
          .post("/auth/refresh", payload)
          .then(({ data }: any) => {
            setToken(data.accessToken);
            msUserGuardedClient.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(axios(originalRequest));
          })
          .catch((err: any) => {
            processQueue(err, null);
            clearAuth();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default msUserGuardedClient;
