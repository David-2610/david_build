"use client";

import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminLogout } from "@/lib/adminAuth";
import {
  FolderKanban,
  Star,
  FileText,
  Plus,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const remaining = useAdminAuth();

  function format(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const expiringSoon = remaining < 5 * 60 * 1000;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-[#2B41B0]">
          Admin Dashboard
        </h1>

        <button
          onClick={adminLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Session Timer */}
      <div
        className={`rounded-xl border p-5 shadow-sm ${
          expiringSoon
            ? "border-red-300 bg-red-50"
            : "bg-white"
        }`}
      >
        <p className="text-sm text-gray-500">
          Session expires in
        </p>

        <p
          className={`mt-1 text-2xl font-semibold ${
            expiringSoon
              ? "text-red-500"
              : "text-[#2B41B0]"
          }`}
        >
          {remaining > 0 ? format(remaining) : "Expired"}
        </p>

        {expiringSoon && (
          <p className="mt-1 text-xs text-red-500">
            Please save your work. You will be logged out soon.
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Projects"
          description="Manage all portfolio projects"
          icon={<FolderKanban />}
          href="/admin/projects"
        />

        <DashboardCard
          title="Featured Projects"
          description="Highlight key work on homepage"
          icon={<Star />}
          href="/admin/projects"
        />

        <DashboardCard
          title="Blogs"
          description="Create and manage blog posts"
          icon={<FileText />}
          href="/admin/blogs"
          disabled
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#2B41B0]">
          Quick Actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#2B41B0] px-4 py-2 text-sm font-semibold text-white hover:scale-[1.05] transition"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>

          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            View Projects
          </Link>
        </div>
      </div>

      {/* Welcome */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-gray-600">
          Welcome back. From here you can manage your projects,
          featured content, and future blog posts.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Card Component ---------------- */

function DashboardCard({
  title,
  description,
  icon,
  href,
  disabled = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
}) {
  const content = (
    <div
      className={`rounded-xl border p-6 shadow-sm transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "bg-white hover:shadow-md hover:-translate-y-1"
      }`}
    >
      <div className="flex items-center gap-3 text-[#2B41B0]">
        <div className="rounded-lg bg-[#2B41B0]/10 p-2">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        {description}
      </p>
    </div>
  );

  if (disabled) return content;

  return <Link href={href}>{content}</Link>;
}
