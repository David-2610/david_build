import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        milestones: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("PROJECT DETAIL ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
