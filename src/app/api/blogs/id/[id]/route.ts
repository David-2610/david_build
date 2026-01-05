export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// GET /api/blogs/id/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const blogId = Number(id);

  if (Number.isNaN(blogId)) {
    return NextResponse.json(
      { message: "Invalid blog ID" },
      { status: 400 }
    );
  }

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}
