import axios from "axios";

let AUTH_TOKEN = null;
export const setAuthToken = (token) => {
  AUTH_TOKEN = token || null;
};

const http = axios.create({
  baseURL: "http://localhost:5245",
  withCredentials: false, // keep false, you are not using cookies
});

http.interceptors.request.use((config) => {
  if (AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  return config;
});

export default http;