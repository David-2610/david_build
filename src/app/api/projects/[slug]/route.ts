import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  context: { params: { slug: string } | Promise<{ slug: string }> }
) {
  try {
    // ✅ SAFE PARAM UNWRAP
    const { slug } =
      "then" in context.params
        ? await context.params
        : context.params;

    console.log("FETCHING PROJECT DETAIL FOR SLUG:", slug);

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is missing" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { slug },
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
