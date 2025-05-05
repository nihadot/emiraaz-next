import axios from "axios";
import { baseUrl } from ".";
import { attachInterceptors } from "./interceptors";

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Attach interceptors
attachInterceptors(apiClient);

export default apiClient;
