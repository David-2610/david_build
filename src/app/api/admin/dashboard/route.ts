export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

// GET /api/admin/dashboard → analytics
export async function GET(req: Request) {
  await requireAdmin();


  try {
    const [
      projectCount,
      blogCount,
      publishedblog,
      draftblog,
      totalBlogViews,
      totalProjectViews,
      recentblog,
      recentProjects,
      featuredProjects,
      featuredblog,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
      prisma.blog.count({ where: { status: "DRAFT" } }),

      prisma.blog.aggregate({
        _sum: { views: true },
      }),

      prisma.project.aggregate({
        _sum: { views: true },
      }),

      prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
        },
      }),

      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
        },
      }),

      prisma.project.findMany({
        where: { featured: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
        },
      }),

      prisma.blog.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        projects: projectCount,
        blog: blogCount,
        publishedblog,
        draftblog,
        blogViews: totalBlogViews._sum.views ?? 0,
        projectViews: totalProjectViews._sum.views ?? 0,
      },

      recent: {
        blog: recentblog,
        projects: recentProjects,
      },

      featured: {
        blog: featuredblog,
        projects: featuredProjects,
      },
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load dashboard analytics" },
      { status: 500 }
    );
  }
}