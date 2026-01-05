import Image from "next/image";

export default function ProjectHero({ project }: any) {
  return (
    <section className="space-y-6">
      <div className="relative h-[420px] rounded-2xl overflow-hidden border">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="space-y-2 max-w-3xl">
        <h1 className="text-4xl font-bold text-[#2B41B0]">
          {project.title}
        </h1>
        <p className="text-gray-600">
          {project.shortDescription}
        </p>
      </div>
    </section>
  );
}
