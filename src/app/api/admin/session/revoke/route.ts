export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

// POST /api/admin/sessions/revoke
export async function POST(req: Request) {
  const admin = await requireAdmin(req);
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json(
      { message: "Session ID is required" },
      { status: 400 }
    );
  }

  // Ensure admin can revoke ONLY their own sessions
  const session = await prisma.adminSession.findFirst({
    where: {
      id: sessionId,
      adminId: admin.adminId,
      revoked: false,
    },
  });

  if (!session) {
    return NextResponse.json(
      { message: "Session not found or already revoked" },
      { status: 404 }
    );
  }

  await prisma.adminSession.update({
    where: { id: sessionId },
    data: { revoked: true },
  });

  return NextResponse.json({ success: true });
}
