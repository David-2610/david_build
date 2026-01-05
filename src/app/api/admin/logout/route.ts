import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  // ✅ Clear auth cookie
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
}
