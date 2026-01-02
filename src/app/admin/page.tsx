"use client";

import { useAdminSessionTimer } from "@/hooks/useAdminAuth";
import AdminShell from "@/app/admin/AdminShell";
export default function AdminDashboard() {
  const remaining = useAdminSessionTimer();

  function format(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const expiringSoon = remaining < 5 * 60 * 1000;

  return (
    <AdminShell>
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[#2B41B0]">
        Dashboard
      </h1>

      {/* Session Card */}
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
      </div>

      {/* Quick Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          title="Projects"
          value="Manage portfolio projects"
        />
        <OverviewCard
          title="Featured"
          value="Homepage highlights"
        />
        <OverviewCard
          title="Blogs"
          value="Coming soon"
        />
      </div>
    </div>
    </AdminShell>
  );
}

function OverviewCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 font-semibold text-[#2B41B0]">
        {value}
      </p>
    </div>
  );
}
