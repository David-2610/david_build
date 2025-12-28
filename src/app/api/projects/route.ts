import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/projects → fetch all projects
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

// POST /api/projects → create a new project
export async function POST(req: Request) {
  try {
    const { title, description, link } = await req.json();

    const project = await prisma.project.create({
      data: {
        title,
        description,
        link,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}
