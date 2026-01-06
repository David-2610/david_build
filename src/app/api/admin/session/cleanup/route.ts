export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { cleanupAdminSessions } from "@/lib/sessionCleanup";

// POST /api/admin/sessions/cleanup
export async function POST(req: Request) {
  await requireAdmin();

  const deletedCount = await cleanupAdminSessions();

  return NextResponse.json({
    success: true,
    deletedSessions: deletedCount,
  });
}
