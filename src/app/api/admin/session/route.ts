import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ FIX
    const session = cookieStore.get("admin_session");

    if (!session) {
      return NextResponse.json({ authenticated: false });
    }

    const adminId = Number(session.value);

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, email: true },
    });

    if (!admin) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      admin,
    });
  } catch (error) {
    console.error("SESSION CHECK ERROR:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
