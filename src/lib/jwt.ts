import jwt, { Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET as Secret;

// ✅ Correctly typed duration for jsonwebtoken
const JWT_EXPIRES_IN: number | StringValue =
  (process.env.JWT_EXPIRES_IN as StringValue) ?? "7d";

export function signAdminToken(adminId: number): string {
  return jwt.sign(
    { adminId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyAdminToken(token: string): {
  adminId: number;
  iat: number;
  exp: number;
} {
  return jwt.verify(token, JWT_SECRET) as {
    adminId: number;
    iat: number;
    exp: number;
  };
}
