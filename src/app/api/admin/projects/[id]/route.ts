import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";

// GET → public single project
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { milestones: true },
  });

  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

// PUT → admin update
// PUT → admin update
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  // ✅ 1️⃣ Check existence FIRST
  const existing = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  const body = await req.json();

  // ✅ 2️⃣ Safe to replace milestones
  await prisma.projectMilestone.deleteMany({
    where: { projectId },
  });

  // ✅ 3️⃣ Safe update
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.slug && { slug: body.slug }),
      ...(body.shortDescription && {
        shortDescription: body.shortDescription,
      }),
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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params; // ✅ REQUIRED
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return NextResponse.json({ success: true });
}
