import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyAdminAuth(token: string) {
	try {
		

		const payload = jwt.verify(token, JWT_SECRET) as {
			adminId: number;
			email: string;
		};

		

		const session = await prisma.adminSession.findFirst({
			where: {
				token,
				revoked: false,
				expiresAt: {
					gt: new Date(),
				},
			},
		});

	

		if (!session) return null;

		return payload;
	} catch (err: any) {
		console.error("JWT VERIFY ERROR:", err.name, err.message);
		return null;
	}
}
