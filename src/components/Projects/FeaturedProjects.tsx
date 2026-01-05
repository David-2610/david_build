import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/projects/page";

export default function FeaturedProjects({
  projects,
}: {
  projects: Project[];
}) {
  if (projects.length === 0) return null;

  return (
    <section className="grid gap-8 lg:grid-cols-2">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="group rounded-2xl border bg-white overflow-hidden hover:shadow-lg transition"
        >
          <div className="relative h-64">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-[#2B41B0]">
              {project.title}
            </h2>

            <p className="text-gray-600">
              {project.shortDescription}
            </p>

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

            <span className="inline-block text-sm font-semibold text-[#2B41B0]">
              View Project →
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
