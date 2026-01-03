import { verifyAdminAuth } from "@/lib/auth";

/**
 * Throws if admin is not authenticated
 * Returns admin payload if valid
 */
export async function requireAdmin(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = auth.split(" ")[1];

  const admin = await verifyAdminAuth(token);
  if (!admin) {
    throw new Error("Unauthorized");
  }

  return admin;
}
