import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

// GET → list projects
export async function GET(req: Request) {
  try {
    requireAdmin(req);

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// POST → create project
export async function POST(req: Request) {
  try {
    requireAdmin(req);

    const body = await req.json();

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        category: body.category,
        techStack: body.techStack,
        coverImage: body.coverImage,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 400 }
    );
  }
}
