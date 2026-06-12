// Auth context for end users (JWT)
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "@/lib/api";

const AuthContext = createContext({ user: null, loading: true, login: () => {}, register: () => {}, logout: () => {}, refresh: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data?.access_token) {
      // Clear other tokens to ensure user token takes precedence
      localStorage.removeItem("pm_admin_token");
      localStorage.removeItem("pm_proloco_token");
      localStorage.setItem("pm_user_token", data.access_token);
    }
    setUser(data);
    return data;
  }, []);

  const register = useCallback(async (email, password, name) => {
    const { data } = await api.post("/auth/register", { email, password, name });
    if (data?.access_token) {
      // Clear other tokens to ensure user token takes precedence
      localStorage.removeItem("pm_admin_token");
      localStorage.removeItem("pm_proloco_token");
      localStorage.setItem("pm_user_token", data.access_token);
    }
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try { await api.post("/auth/logout"); } catch (_) { /* ignore */ }
    localStorage.removeItem("pm_user_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh: checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
