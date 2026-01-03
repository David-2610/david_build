import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blogs → list published blogs (PUBLIC)
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
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

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
