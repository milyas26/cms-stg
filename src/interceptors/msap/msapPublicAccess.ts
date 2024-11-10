import axios from "axios";

const msUserPublicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_PORTAL_BASE_URL, // Set your default base URL here
});

export default msUserPublicAPI;
