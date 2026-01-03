export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

// GET /api/admin/sessions → list sessions
export async function GET(req: Request) {
  const admin = await requireAdmin(req);

  const sessions = await prisma.adminSession.findMany({
    where: {
      adminId: admin.adminId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      expiresAt: true,
      revoked: true,
    },
  });

  return NextResponse.json(sessions);
}
