import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

// GET /api/projects/featured
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
      },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        category: true,
        techStack: true,
        coverImage: true,
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("FEATURED PROJECTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch featured projects" },
      { status: 500 }
    );
  }
}
