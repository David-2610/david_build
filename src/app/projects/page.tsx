import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsClient />
    </Suspense>
  );
}

function ProjectsLoading() {
  return (
    <div className="p-10 text-center text-gray-500">
      Loading projects…
    </div>
  );
}
