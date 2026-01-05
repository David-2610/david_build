import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  console.log("ADMIN DASHBOARD ADMIN:");
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // normal dashboard logic here
  return NextResponse.json({
    message: "Welcome admin",
    adminId: admin.adminId,
  });
}
