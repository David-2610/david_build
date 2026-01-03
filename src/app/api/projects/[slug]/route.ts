export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects/[slug]
export async function GET(
  _req: Request,
  context: { params: { slug: string } | Promise<{ slug: string }> }
) {
  try {
    // ✅ Unwrap params safely (Next 16 compatible)
    const { slug } =
      "then" in context.params
        ? await context.params
        : context.params;

    const project = await prisma.project.findUnique({
      where: { slug },
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

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("PROJECT DETAIL ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
