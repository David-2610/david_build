import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

// GET → list projects (unchanged)
export async function GET(req: Request) {
  try {
    requireAdmin(req);

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        milestones: true,
      },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// POST → create full project with ALL fields
export async function POST(req: Request) {
  try {
    requireAdmin(req);

    const body = await req.json();

    const {
      title,
      slug,
      shortDescription,
      description,
      category,
      status,
      techStack,
      coverImage,
      images,
      videoUrl,
      link,
      githubUrl,
      featured,
      order,
      milestones,
    } = body;

    const project = await prisma.project.create({
      data: {
        // required
        title,
        slug,
        shortDescription,
        description,
        coverImage,
        techStack,

        // enums (safe defaults handled by Prisma)
        category: category ?? "WEB",
        status: status ?? "COMPLETED",

        // optional media
        images: images ?? null,
        videoUrl: videoUrl ?? null,

        // optional links
        link: link ?? null,
        githubUrl: githubUrl ?? null,

        // flags
        featured: featured ?? false,
        order: order ?? null,

        // relations
        milestones: milestones?.length
          ? {
              create: milestones.map((m: any) => ({
                title: m.title,
                summary: m.summary,
                date: m.date ? new Date(m.date) : null,
              })),
            }
          : undefined,
      },
      include: {
        milestones: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 400 }
    );
  }
}
