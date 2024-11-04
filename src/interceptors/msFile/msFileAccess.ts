import { getToken } from "@/utils/authUtils";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_FILE_BASE_URL; // Set your default base URL here
const api = axios.create({
  baseURL, // Set your default base URL here
  headers: {
    common: {
      // Set your default headers here
      "Content-Type": "application/json",
      // Add more default headers if needed
    },
  },
});

api.interceptors.request.use(
  function (config) {
    // Modify the request config here
    // For example, you can set a default URL or add headers
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  function (error) {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default api;
