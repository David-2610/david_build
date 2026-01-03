import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

// GET → list blogs
export async function GET(req: Request) {
	try {
		requireAdmin(req);

		const blogs = await prisma.blog.findMany({
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(blogs);
	} catch {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
}

// POST → create blog
export async function POST(req: Request) {
	try {
		requireAdmin(req);
		const body = await req.json();

		const blog = await prisma.blog.create({
			data: {
				title: body.title,
				slug: body.slug,
				excerpt: body.excerpt,
				content: body.content,

				coverImage: body.coverImage,
				images: body.images ?? [],
				category: body.category ?? null,
				tags: body.tags ?? [],

				// SEO
				metaTitle: body.metaTitle ?? null,
				metaDescription: body.metaDescription ?? null,
				ogImage: body.ogImage ?? null,

				status: body.status ?? "DRAFT",
				featured: body.featured ?? false,
			},
		});

		return NextResponse.json(blog, { status: 201 });
	} catch {
		return NextResponse.json(
			{ message: "Failed to create blog" },
			{ status: 400 }
		);
	}
}
