import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL && typeof window !== "undefined") {
  console.warn(
    "Warning: VITE_API_URL is not set. API requests will be sent to the frontend host instead of your backend."
  );
}

const API = axios.create({
  baseURL: baseURL || "",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;