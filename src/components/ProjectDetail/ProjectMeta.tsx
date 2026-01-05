import { Calendar, Layers } from "lucide-react";

export default function ProjectMeta({ project }: any) {
  return (
    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
      <span className="flex items-center gap-2">
        <Layers className="h-4 w-4" />
        {project.category}
      </span>

      <span className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        {new Date(project.createdAt).toLocaleDateString()}
      </span>

      <span>
        Status: <strong>{project.status}</strong>
      </span>
    </div>
  );
}
