import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST /api/admin/logout
export async function POST() {
  const cookieStore = await cookies(); // ✅ FIX

  cookieStore.delete("admin_session");

  return NextResponse.json({ success: true });
}
