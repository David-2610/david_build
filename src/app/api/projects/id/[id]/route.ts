import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// GET /api/projects/id/[id]
export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const projectId = Number(id);
  
    if (Number.isNaN(projectId)) {
      return NextResponse.json(
        { message: "Invalid project ID" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
  
    return NextResponse.json(project);
  }
  
