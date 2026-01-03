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
  isLoading: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(
  null
);

export function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load token once on mount
  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) {
      setTokenState(stored);
    }
    setIsLoading(false);
  }, []);

  function setToken(token: string | null) {
    if (token) {
      localStorage.setItem("admin_token", token);
      setTokenState(token);
    } else {
      localStorage.removeItem("admin_token");
      setTokenState(null);
    }
  }

  function logout() {
    setToken(null);
    router.push("/admin/login");
  }

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        setToken,
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
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }
  return ctx;
}
