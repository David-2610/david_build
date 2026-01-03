export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

// PUT /api/admin/blogs/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  await requireAdmin(req);

  try {
    const { id } =
      "then" in context.params
        ? await context.params
        : context.params;

    const body = await req.json();

    const blog = await prisma.blog.update({
      where: { id: Number(id) },
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
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  await requireAdmin(req);

  const { id } =
    "then" in context.params
      ? await context.params
      : context.params;

  await prisma.blog.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
