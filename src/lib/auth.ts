import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyAdminAuth(token: string) {
  try {
    // 1️⃣ JWT validation (UTC, authoritative)
    const payload = jwt.verify(token, JWT_SECRET) as {
      adminId: number;
      email: string;
    };

    // 2️⃣ DB validates expiry using DB time (NOW())
    const session = await prisma.adminSession.findFirst({
      where: {
        token,
        revoked: false,
        expiresAt: {
          gt: new Date(), // translated to `expiresAt > NOW()`
        },
      },
    });

    if (!session) return null;

    return payload;
  } catch {
    return null;
  }
}
