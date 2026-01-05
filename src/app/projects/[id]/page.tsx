import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export default async function ProjectDetailPage(
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  // ✅ SAFELY UNWRAP PARAMS
  const { id } =
    "then" in context.params
      ? await context.params
      : context.params;

  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    notFound();
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      milestones: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Example rendering */}
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="mt-4 text-gray-600">{project.shortDescription}</p>

      {/* Continue your UI here */}
    </main>
  );
}
