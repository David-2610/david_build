import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blog → list published blog (PUBLIC)
export async function GET() {
  try {
    const blog = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        createdAt: true,
      },
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("GET blog ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
