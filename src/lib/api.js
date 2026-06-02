// Centralized API helpers using REACT_APP_BACKEND_URL
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Attach Authorization header if we have a token in localStorage (fallback for cookie issues)
api.interceptors.request.use((config) => {
  const tokens = ["pm_user_token", "pm_admin_token", "pm_proloco_token"];
  for (const k of tokens) {
    const t = typeof window !== "undefined" ? localStorage.getItem(k) : null;
    if (t) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization) config.headers.Authorization = `Bearer ${t}`;
      break;
    }
  }
  return config;
});

export function formatApiError(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default api;
