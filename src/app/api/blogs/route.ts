import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/blogs → fetch all blogs
export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blogs);
}

// POST /api/blogs → create new blog
export async function POST(req: Request) {
  try {
    const { title, slug, content } = await req.json();

    const blog = await prisma.blog.create({
      data: { title, slug, content },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create blog" },
      { status: 500 }
    );
  }
}
