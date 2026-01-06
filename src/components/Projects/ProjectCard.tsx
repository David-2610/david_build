import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/projects/page";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-xl border bg-white overflow-hidden hover:shadow-md transition"
    >
      <div className="relative h-40">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-[#2B41B0]">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="text-xs text-gray-500 flex justify-between pt-1">
          <span>{project.category}</span>
          <span>
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
