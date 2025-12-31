import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

// GET /api/projects/[slug]
export async function GET(
  req: Request,
  context: RouteContext
) {
  try {
    const { slug } = await context.params; // ✅ FIX HERE

    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        milestones: {
          orderBy: {
            createdAt: "asc",
          },
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
