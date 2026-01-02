import { cookies } from "next/headers";

/**
 * Throws if admin session is missing.
 * Returns adminId if authenticated.
 */
export function requireAdmin() {
  const session = cookies().get("admin_session");

  if (!session) {
    throw new Error("Unauthorized");
  }

  return Number(session.value);
}
