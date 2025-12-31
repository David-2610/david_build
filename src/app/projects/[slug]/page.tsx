import Image from "next/image";
import { notFound } from "next/navigation";

type Project = {
  title: string;
  description: string;
  coverImage: string;
  techStack: unknown;
  category: string;
  status: string;
  images?: unknown;
  videoUrl?: string;
  milestones?: {
    id: number;
    title: string;
    summary: string;
    date?: string;
  }[];
};

async function getProject(slug: string): Promise<Project> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2B41B0]">
          {project.title}
        </h1>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm opacity-80">
          <span>{project.category}</span>
          <span>•</span>
          <span>{project.status}</span>
        </div>

        {/* Cover Image */}
        <div className="relative mt-10 h-[420px] w-full overflow-hidden rounded-2xl">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Description */}
        <div className="mt-12 prose prose-lg max-w-none">
          <p>{project.description}</p>
        </div>

        {/* Tech Stack */}
        {Array.isArray(project.techStack) && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-[#2B41B0]">
              Tech Stack
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#2B41B0]/10 px-4 py-1.5 text-sm font-medium text-[#2B41B0]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        {project.milestones && project.milestones.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-[#2B41B0]">
              Project Journey
            </h3>

            <div className="mt-6 space-y-6 border-l-2 border-[#7E57C2]/40 pl-6">
              {project.milestones.map((m) => (
                <div key={m.id}>
                  <h4 className="font-semibold">{m.title}</h4>
                  <p className="mt-1 text-sm opacity-80">
                    {m.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
