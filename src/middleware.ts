import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow login & logout without auth
  if (
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const admin = await verifyAdminAuth(token);

  if (!admin) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  // Optional: pass admin info downstream
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-admin-id", admin.adminId.toString());

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
