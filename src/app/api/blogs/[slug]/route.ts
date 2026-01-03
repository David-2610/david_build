import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/blogs/[slug] → public blog + increment views
export async function GET(
  _req: Request,
  context: { params: { slug: string } | Promise<{ slug: string }> }
) {
  try {
    const { slug } =
      "then" in context.params
        ? await context.params
        : context.params;

    // 1️⃣ Fetch published blog
    const blog = await prisma.blog.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Increment views (fire-and-forget, atomic)
    prisma.blog.update({
      where: { id: blog.id },
      data: {
        views: { increment: 1 },
      },
    }).catch(() => {
      // silently fail — never block user
    });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("BLOG DETAIL ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
