import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects → fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects → create a new project
export async function POST(req: Request) {
  try {
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
    } = body;

    // 🔒 Basic validation
    if (
      !title ||
      !slug ||
      !shortDescription ||
      !description ||
      !category ||
      !coverImage ||
      !techStack
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        shortDescription,
        description,
        category,
        status,
        techStack,        // Json
        coverImage,       // Cloudinary URL
        images,           // optional Json
        videoUrl,
        link,
        githubUrl,
        featured: featured ?? false,
        order,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("CREATE PROJECT ERROR:", error);

    // 🔑 Handle duplicate slug nicely
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Project with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}
