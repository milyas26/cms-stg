import axios from "axios";
import moment from "moment";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";
import { getToken } from "@/utils/authUtils";

const baseURL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL; // Set your default base URL here
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
    const timeStamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const requestId = uuid();
    const encoder = CryptoJS.enc.Hex;
    const clientId = `e1_3nmQ'^wS8S7fYwGKf%gWwkzT0{`;
    const clientSecret = `m76bx3fBeLs.tdI+{qesIk[b_ssQLH`;
    const rawSaltKey = `iYxp5YvoYd8zvy5j20km20zR3bCCHQ`;
    const saltKey = CryptoJS.SHA256(rawSaltKey + ":" + requestId).toString(
      encoder
    );
    const password = CryptoJS.SHA256(clientSecret + ":" + timeStamp).toString(
      encoder
    );
    const base64 = btoa(
      clientId + ":" + password + ":" + timeStamp + ":" + saltKey
    );
    const sha256 = CryptoJS.SHA256(base64).toString(encoder);
    const apiKey = CryptoJS.SHA256(sha256).toString(encoder);
    // Modify the request config here
    // For example, you can set a default URL or add headers
    config.headers.Authorization = `Bearer ${getToken()}`;
    config.headers["X-TIMESTAMP"] = timeStamp;
    config.headers["X-REQUEST-ID"] = requestId;
    config.headers["X-CLIENT-ID"] = clientId;
    config.headers["X-API-KEY"] = apiKey;

    return config;
  },
  function (error) {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default api;
