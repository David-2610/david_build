import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
export const runtime = "nodejs";

// GET → public project list
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { milestones: true },
  });

  return NextResponse.json(projects);
}

// POST → admin only
export async function POST(req: Request) {
  await requireAdmin(req); // ✅ enforce

  const body = await req.json();

  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      shortDescription: body.shortDescription,
      description: body.description,
      coverImage: body.coverImage,
      techStack: body.techStack,

      category: body.category ?? "WEB",
      status: body.status ?? "COMPLETED",

      images: body.images ?? null,
      videoUrl: body.videoUrl ?? null,
      link: body.link ?? null,
      githubUrl: body.githubUrl ?? null,

      featured: body.featured ?? false,
      order: body.order ?? null,

      milestones: body.milestones?.length
        ? {
            create: body.milestones.map((m: any) => ({
              title: m.title,
              summary: m.summary,
              date: m.date ? new Date(m.date) : null,
            })),
          }
        : undefined,
    },
    include: { milestones: true },
  });

  return NextResponse.json(project, { status: 201 });
}
