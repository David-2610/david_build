"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Star, Layers, Calendar } from "lucide-react";

type Project = {
  id: number;
  title: string;
  shortDescription?: string;
  coverImage: string;
  featured: boolean;
  category: string;
  techStack: string[];
  createdAt: string;
};

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // 🔒 Auth guard
        const authRes = await fetch("/api/admin/dashboard", {
          credentials: "include",
        });

        if (authRes.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!authRes.ok) {
          throw new Error("Auth check failed");
        }

        // 📦 Fetch projects
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading projects…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-[#2B41B0]">
          Projects
        </h1>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#2B41B0] px-4 py-2 text-sm font-semibold text-white hover:scale-[1.05] transition"
        >
          + New Project
        </Link>
      </div>

      {/* Grid */}
      {projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {project.featured && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#2B41B0] px-3 py-1 text-xs font-semibold text-white">
                    <Star className="h-3 w-3" />
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3 p-5">
                <h3 className="text-lg font-semibold text-[#2B41B0]">
                  {project.title}
                </h3>

                {project.shortDescription && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {project.shortDescription}
                  </p>
                )}

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    {project.category}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#2B41B0]/10 px-3 py-1 text-xs font-medium text-[#2B41B0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B41B0] hover:underline"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
          No projects found. Create your first project.
        </div>
      )}
    </div>
  );
}
