import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({
  projects,
  loading,
  hasFilter,
}: {
  projects: Project[];
  loading: boolean;
  hasFilter: boolean;
}) {
  if (loading) {
    return <p className="text-gray-500">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border p-10 text-center text-gray-500">
        No projects found in this category.
        {hasFilter && (
          <p className="mt-2 text-sm">
            Try selecting <strong>All</strong>.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
