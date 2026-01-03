"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { adminFetch } from "../lib/adminFetch";

type DashboardStats = {
  projects: number;
  blogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  blogViews: number;
  projectViews: number;
};

type AdminDataContextType = {
  dashboard: DashboardStats | null;
  projects: any[];
  blogs: any[];
  refreshDashboard: () => void;
  refreshProjects: () => void;
  refreshBlogs: () => void;
};

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // 🔁 Initial load from localStorage (INSTANT UI)
  useEffect(() => {
    const cachedDashboard = localStorage.getItem("admin_dashboard");
    const cachedProjects = localStorage.getItem("admin_projects");
    const cachedBlogs = localStorage.getItem("admin_blogs");

    if (cachedDashboard) setDashboard(JSON.parse(cachedDashboard));
    if (cachedProjects) setProjects(JSON.parse(cachedProjects));
    if (cachedBlogs) setBlogs(JSON.parse(cachedBlogs));

    // Background refresh
    refreshDashboard();
    refreshProjects();
    refreshBlogs();
  }, []);

  async function refreshDashboard() {
    const res = await adminFetch("/api/admin/dashboard");
    const data = await res.json();
    setDashboard(data.stats);
    localStorage.setItem("admin_dashboard", JSON.stringify(data.stats));
  }

  async function refreshProjects() {
    const res = await adminFetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    localStorage.setItem("admin_projects", JSON.stringify(data));
  }

  async function refreshBlogs() {
    const res = await adminFetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
    localStorage.setItem("admin_blogs", JSON.stringify(data));
  }

  return (
    <AdminDataContext.Provider
      value={{
        dashboard,
        projects,
        blogs,
        refreshDashboard,
        refreshProjects,
        refreshBlogs,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error("useAdminData must be used inside AdminDataProvider");
  }
  return ctx;
}
