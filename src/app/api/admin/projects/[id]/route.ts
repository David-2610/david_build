import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export const runtime = "nodejs";

// GET → public single project
export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params; // ✅ REQUIRED
	const projectId = Number(id);

	if (Number.isNaN(projectId)) {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	const project = await prisma.project.findUnique({
		where: { id: projectId },
		include: { milestones: true },
	});

	if (!project) {
		return NextResponse.json({ message: "Not found" }, { status: 404 });
	}

	return NextResponse.json(project);
}

// PUT → admin update
// PUT → admin update
// PUT → admin update
export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const admin = await requireAdmin();
	if (!admin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const projectId = Number(id);

	if (Number.isNaN(projectId)) {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	// ✅ 1. Check existence
	const existing = await prisma.project.findUnique({
		where: { id: projectId },
		select: { id: true },
	});

	if (!existing) {
		return NextResponse.json(
			{ message: "Project not found" },
			{ status: 404 }
		);
	}

	const body = await req.json();

	// ✅ 2. Replace milestones safely
	await prisma.projectMilestone.deleteMany({
		where: { projectId },
	});

	// ✅ 3. Update ALL supported fields
	const project = await prisma.project.update({
		where: { id: projectId },
		data: {
			title: body.title,
			slug: body.slug,
			shortDescription: body.shortDescription,
			description: body.description,

			category: body.category ?? "WEB",
			status: body.status ?? "COMPLETED",

			techStack: body.techStack ?? [],
			coverImage: body.coverImage,

			images: body.images ?? [],
			videoUrl: body.videoUrl ?? null,

			link: body.link ?? null,
			githubUrl: body.githubUrl ?? null,

			featured: body.featured ?? false,
			order: body.order ?? null,

			startDate: body.startDate ? new Date(body.startDate) : null,
			endDate: body.endDate ? new Date(body.endDate) : null,

			milestones: body.milestones?.length
				? {
						create: body.milestones.map((m: any) => ({
							title: m.title,
							summary: m.summary,
							date: m.date ? new Date(m.date) : null,
						})),
				  }
				: undefined,
		},
		include: { milestones: true },
	});

	return NextResponse.json(project);
}

// DELETE → admin only
export async function DELETE(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const admin = await requireAdmin();
	if (!admin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params; // ✅ REQUIRED
	const projectId = Number(id);

	if (Number.isNaN(projectId)) {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	await prisma.project.delete({
		where: { id: projectId },
	});

	return NextResponse.json({ success: true });
}
