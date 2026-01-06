"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectsHeader from "@/components/Projects/ProjectsHeader";
import FeaturedProjects from "@/components/Projects/FeaturedProjects";
import ProjectsFilter from "@/components/Projects/ProjectsFilter";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";

import type { Project } from "@/types/project";
export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 2);

  const filteredProjects = useMemo(() => {
    if (!category || category === "ALL") return projects;
    return projects.filter((p) => p.category === category);
  }, [projects, category]);

  return (
    <div className="space-y-16">
      <ProjectsHeader />

      <FeaturedProjects projects={featured} />

      <ProjectsFilter active={category ?? "ALL"} />

      <ProjectsGrid
        projects={filteredProjects}
        loading={loading}
        hasFilter={!!category && category !== "ALL"}
      />
    </div>
  );
}
