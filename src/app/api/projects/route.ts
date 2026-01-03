import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

// GET /api/projects → fetch all projects (PUBLIC)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { order: "asc" },        // manual ordering first
        { createdAt: "desc" },   // fallback
      ],
      include: {
        milestones: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
