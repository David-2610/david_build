import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
export const runtime = "nodejs";

// GET → public single project
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = await prisma.project.findUnique({
    where: { id: Number(params.id) },
    include: { milestones: true },
  });

  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT → admin update
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await requireAdmin(req);

  const body = await req.json();

  // replace milestones cleanly
  await prisma.projectMilestone.deleteMany({
    where: { projectId: Number(params.id) },
  });

  const project = await prisma.project.update({
    where: { id: Number(params.id) },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.slug && { slug: body.slug }),
      ...(body.shortDescription && { shortDescription: body.shortDescription }),
      ...(body.description && { description: body.description }),
      ...(body.category && { category: body.category }),
      ...(body.status && { status: body.status }),
      ...(body.techStack && { techStack: body.techStack }),
      ...(body.coverImage && { coverImage: body.coverImage }),
      ...(body.featured !== undefined && { featured: body.featured }),

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

  return NextResponse.json(project);
}

// DELETE → admin only
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await requireAdmin(req);

  await prisma.project.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ success: true });
}
