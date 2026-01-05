export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

// POST /api/admin/blogs → create blog
export async function POST(req: Request) {
  // ✅ Enforce admin auth (cookie-based)
  await requireAdmin();

  try {
    const body = await req.json();

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,

        coverImage: body.coverImage ?? null,
        images: body.images ?? null,
        category: body.category ?? null,
        tags: body.tags ?? null,

        // SEO
        metaTitle: body.metaTitle ?? null,
        metaDescription: body.metaDescription ?? null,
        ogImage: body.ogImage ?? null,

        status: body.status ?? "DRAFT",
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error("CREATE BLOG ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Blog with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create blog" },
      { status: 500 }
    );
  }
}
