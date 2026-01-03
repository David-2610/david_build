"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type AdminAuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // 🔁 Restore token once on load
  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  function login(newToken: string) {
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
    router.push("/admin");
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
    router.push("/admin/login");
  }

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return ctx;
}
