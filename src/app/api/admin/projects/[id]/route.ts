import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

type Params = {
  params: { id: string };
};

// GET → fetch single project
export async function GET(req: Request, { params }: Params) {
  try {
    requireAdmin(req);

    const project = await prisma.project.findUnique({
      where: { id: Number(params.id) },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// PUT → update project
export async function PUT(req: Request, { params }: Params) {
  try {
    requireAdmin(req);

    const body = await req.json();

    const project = await prisma.project.update({
      where: { id: Number(params.id) },
      data: {
        title: body.title,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        category: body.category,
        techStack: body.techStack,
        coverImage: body.coverImage,
        featured: body.featured,
      },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 400 }
    );
  }
}

// DELETE → remove project
export async function DELETE(req: Request, { params }: Params) {
  try {
    requireAdmin(req);

    await prisma.project.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 400 }
    );
  }
}
