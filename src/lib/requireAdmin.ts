import { cookies } from "next/headers";
import { verifyAdminAuth } from "@/lib/auth";

/**
 * Throws if admin is not authenticated
 * Returns admin payload if valid
 */
export async function requireAdmin() {
  const cookieStore = await cookies(); // ✅ FIX
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const admin = await verifyAdminAuth(token);

  if (!admin) {
    throw new Error("Unauthorized");
  }

  return admin;
}
