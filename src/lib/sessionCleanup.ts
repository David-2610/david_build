import { prisma } from "@/lib/prisma";

export async function cleanupAdminSessions() {
  const now = new Date();

  const result = await prisma.adminSession.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: now } }, // expired
        { revoked: true },          // revoked
      ],
    },
  });

  return result.count;
}
