"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  FolderKanban,
  Eye,
  Star,
} from "lucide-react";

type DashboardData = {
  stats: {
    projects: number;
    blog: number;
    publishedblog: number;
    draftblog: number;
    blogViews: number;
    projectViews: number;
  };
  recent: {
    blog: {
      id: number;
      title: string;
      createdAt: string;
    }[];
    projects: {
      id: number;
      title: string;
      createdAt: string;
    }[];
  };
  featured: {
    blog: {
      id: number;
      title: string;
      slug: string;
    }[];
    projects: {
      id: number;
      title: string;
      slug: string;
    }[];
  };
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/dashboard", {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-red-600">
        Failed to load dashboard
      </div>
    );
  }

  const { stats, recent, featured } = data;

  return (
    <div className="space-y-10">
      {/* ================= STATS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Projects" value={stats.projects} icon={FolderKanban} />
        <StatCard label="blog" value={stats.blog} icon={FileText} />
        <StatCard label="Published blog" value={stats.publishedblog} />
        <StatCard label="Draft blog" value={stats.draftblog} />
        <StatCard label="Blog Views" value={stats.blogViews} icon={Eye} />
        <StatCard
          label="Project Views"
          value={stats.projectViews}
          icon={Eye}
        />
      </div>

      {/* ================= RECENT ================= */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recent blog">
          {recent.blog.map((b) => (
            <Item
              key={b.id}
              href={`/admin/blog/${b.id}`}
              title={b.title}
              date={b.createdAt}
            />
          ))}
        </Panel>

        <Panel title="Recent Projects">
          {recent.projects.map((p) => (
            <Item
              key={p.id}
              href={`/admin/projects/${p.id}`}
              title={p.title}
              date={p.createdAt}
            />
          ))}
        </Panel>
      </div>

      {/* ================= FEATURED ================= */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Featured blog" icon={Star}>
          {featured.blog.map((b) => (
            <Item
              key={b.id}
              href={`/admin/blog/${b.id}`}
              title={b.title}
            />
          ))}
        </Panel>

        <Panel title="Featured Projects" icon={Star}>
          {featured.projects.map((p) => (
            <Item
              key={p.id}
              href={`/admin/projects/${p.id}`}
              title={p.title}
            />
          ))}
        </Panel>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function StatCard({
  label,
  value,
  icon: Icon,
}: any) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-[#2B41B0]">
            {value}
          </p>
        </div>
        {Icon && <Icon className="h-6 w-6 text-gray-400" />}
      </div>
    </div>
  );
}

function Panel({ title, children, icon: Icon }: any) {
  return (
    <div className="rounded-xl border bg-white p-6 space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        {Icon && <Icon className="h-4 w-4 text-[#2B41B0]" />}
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({ href, title, date }: any) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
    >
      <span className="font-medium">{title}</span>
      {date && (
        <span className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString()}
        </span>
      )}
    </Link>
  );
}
