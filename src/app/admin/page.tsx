"use client";

import { useAdminData } from "@/contexts/AdminDataContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  const { dashboard } = useAdminData();

  // First-ever load fallback (no cache yet)
  if (!dashboard) {
    return (
      <p className="text-muted-foreground">
        Preparing dashboard…
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Projects" value={dashboard.projects} />
        <StatCard title="Blogs" value={dashboard.blogs} />
        <StatCard title="Blog Views" value={dashboard.blogViews} />
        <StatCard title="Project Views" value={dashboard.projectViews} />
        <StatCard title="Published Blogs" value={dashboard.publishedBlogs} />
        <StatCard title="Draft Blogs" value={dashboard.draftBlogs} />
      </div>

      {/* Charts placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Views Overview</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Charts hook ready (Recharts / Chart.js)
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">
        {value}
      </CardContent>
    </Card>
  );
}
