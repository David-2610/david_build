// src/lib/requireAdmin.ts
import { cookies } from "next/headers";
import { verifyAdminAuth } from "@/lib/auth";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return null;
  }

  const admin = await verifyAdminAuth(token);
  if (!admin) {
    return null;
  }

  return admin;
}
