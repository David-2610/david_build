import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";

// PUT /api/admin/blogs/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const blogId = Number(id);

  if (Number.isNaN(blogId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  // ✅ 1️⃣ Check existence FIRST
  const existing = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  const body = await req.json();

  // ✅ 2️⃣ Safe update
  const blog = await prisma.blog.update({
    where: { id: blogId },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.slug && { slug: body.slug }),
      ...(body.excerpt && { excerpt: body.excerpt }),
      ...(body.content && { content: body.content }),

      ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
      ...(body.images !== undefined && { images: body.images }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.tags !== undefined && { tags: body.tags }),

      ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
      ...(body.metaDescription !== undefined && {
        metaDescription: body.metaDescription,
      }),
      ...(body.ogImage !== undefined && { ogImage: body.ogImage }),

      ...(body.status && { status: body.status }),
      ...(body.featured !== undefined && { featured: body.featured }),
    },
  });

  return NextResponse.json(blog);
}

// DELETE /api/admin/blogs/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const blogId = Number(id);

  if (Number.isNaN(blogId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  // ✅ 1️⃣ Check existence FIRST
  const existing = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { id: true },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: 404 }
    );
  }

  // ✅ 2️⃣ Safe delete
  await prisma.blog.delete({
    where: { id: blogId },
  });

  return NextResponse.json({ success: true });
}
