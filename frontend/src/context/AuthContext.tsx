import React, { createContext, useState, useEffect } from "react";
import { login as loginApi } from "../api/authApi";

interface UserType {
  token: string;
  role?: string | null;
  email?: string | null;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("medvault_token");
    const role = localStorage.getItem("medvault_role");
    const email = localStorage.getItem("medvault_email");
    if (token) setUser({ token, role, email });
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginApi({ email, password });
    const token = res.data.token || res.data;
    const parsedToken = typeof token === "string" ? token : token?.token;
    if (!parsedToken) throw new Error("No token returned");

    localStorage.setItem("medvault_token", parsedToken);
    if (res.data.role) localStorage.setItem("medvault_role", res.data.role);
    localStorage.setItem("medvault_email", email);

    setUser({ token: parsedToken, role: res.data.role, email });
  };

  const logout = () => {
    localStorage.removeItem("medvault_token");
    localStorage.removeItem("medvault_role");
    localStorage.removeItem("medvault_email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
