import { verifyToken } from "@/lib/token";

export function requireAdmin(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error("UNAUTHORIZED");
  }

  const token = auth.split(" ")[1];

  try {
    return verifyToken(token);
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}
