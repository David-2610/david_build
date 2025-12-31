"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminLogout } from "@/lib/adminAuth";

type Project = {
  id: number;
  title: string;
  category: string;
  featured: boolean;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    fetch("/api/admin/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) adminLogout();
        return res.json();
      })
      .then(setProjects);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2B41B0]">
          Projects
        </h1>

        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-[#2B41B0] px-4 py-2 text-sm font-semibold text-white"
        >
          + New Project
        </Link>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 text-center">
                  {p.featured ? "✅" : "—"}
                </td>
                <td className="p-3 text-center">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-[#2B41B0] hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
