import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🌍 PUBLIC ROUTES
  if (
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/blogs") ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // 🔒 ADMIN ROUTES
  // ❗ Do NOT check headers or cookies here
  // Auth is enforced inside the API via requireAdmin()
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
