import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

/* ================= GET → single blog ================= */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);

    const blog = await prisma.blog.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

/* ================= PUT → update blog ================= */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    const body = await req.json();

    const blog = await prisma.blog.update({
      where: { id: Number(params.id) },
      data: {
        // Core
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,

        // Media
        coverImage: body.coverImage ?? null,
        images: body.images ?? [],

        // Classification
        category: body.category ?? null,
        tags: body.tags ?? [],

        // SEO
        metaTitle: body.metaTitle ?? null,
        metaDescription: body.metaDescription ?? null,
        ogImage: body.ogImage ?? null,

        // Publishing
        status: body.status,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 400 }
    );
  }
}

/* ================= DELETE → remove blog ================= */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    requireAdmin(req);

    await prisma.blog.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 400 }
    );
  }
}
