import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAdminToken } from "@/lib/jwt";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(password, admin.password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdminToken({
    adminId: admin.id,
    email: admin.email,
  });

  // ✅ UTC expiry controlled by backend
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

  await prisma.adminSession.create({
    data: {
      adminId: admin.id,
      token,
      expiresAt,
    },
  });

  return NextResponse.json({
    token,
    admin: { id: admin.id, email: admin.email },
  });
}
