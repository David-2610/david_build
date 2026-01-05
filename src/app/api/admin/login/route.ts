import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAdminToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(password, admin.password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // ✅ JWT contains ONLY identity
  const token = signAdminToken(admin.id);

  const response = NextResponse.json({
    admin: { id: admin.id, email: admin.email },
  });

  // ✅ HttpOnly cookie (single source of auth truth)
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure:process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
