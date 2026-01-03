"use client";

import { useRouter } from "next/navigation";
import { useAdminData } from "@/contexts/AdminDataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash } from "lucide-react";
import { adminFetch } from "@/lib/adminFetch";

export default function AdminProjects() {
  const router = useRouter();
  const { projects } = useAdminData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => router.push("/admin/projects/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects?.map((project: any) => (
          <div
            key={project.id}
            className="rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Cover */}
            <img
              src={project?.coverImage}
              alt={project?.title}
              className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{project.title}</h2>
                <Badge>{project.status}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {project.shortDescription}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">{project.category}</Badge>
                {project.featured && <Badge>Featured</Badge>}
                <Badge variant="secondary">Views: {project.views}</Badge>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1">
                {Array.isArray(project.techStack) &&
                  project.techStack.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
              </div>

              {/* Timeline */}
              <div className="text-xs text-muted-foreground">
                <p><b>Start:</b> {project.startDate ?? "—"}</p>
                <p><b>End:</b> {project.endDate ?? "—"}</p>
                <p><b>Slug:</b> {project.slug}</p>
              </div>

              {/* Links */}
              <div className="text-xs">
                {project.link && <p>🔗 {project.link}</p>}
                {project.githubUrl && <p>🐙 {project.githubUrl}</p>}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() =>
                    router.push(`/admin/projects/${project.id}`)
                  }
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  Edit
                </Button>

                <Button
  size="sm"
  variant="destructive"
  onClick={async () => {
    const ok = confirm(
      `Delete project "${project.title}" permanently?`
    );
    if (!ok) return;

    await adminFetch(`/api/admin/projects/${project.id}`, {
      method: "DELETE",
    });

    // refresh admin state
    window.location.reload();
  }}
>
  <Trash className="mr-1 h-4 w-4" />
  Delete
</Button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
