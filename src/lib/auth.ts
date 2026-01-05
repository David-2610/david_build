import { verifyAdminToken } from "@/lib/jwt";

export async function verifyAdminAuth(token: string) {
  try {
    const payload = verifyAdminToken(token);

    return { adminId: payload.adminId };
  } catch (err: any) {
    console.error("ADMIN AUTH VERIFY ERROR:", err.message);
    return null;
  }
}
