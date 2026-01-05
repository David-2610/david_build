import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectLinks({
  github,
  live,
}: {
  github?: string;
  live?: string;
}) {
  if (!github && !live) return null;

  return (
    <section className="flex gap-4">
      {github && (
        <Link
          href={github}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border px-5 py-2 font-semibold hover:bg-gray-50"
        >
          <Github className="h-4 w-4" />
          GitHub
        </Link>
      )}

      {live && (
        <Link
          href={live}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg bg-[#2B41B0] px-5 py-2 font-semibold text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Live Demo
        </Link>
      )}
    </section>
  );
}
