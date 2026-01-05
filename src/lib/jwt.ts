import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function signAdminToken(adminId: number) {
  return jwt.sign(
    { adminId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    adminId: number;
    iat: number;
    exp: number;
  };
}
