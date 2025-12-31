import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;


if (!SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export type AdminTokenPayload = {
  adminId: number;
  email: string;
};

export function generateToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: "2h",
  });
}

export function verifyToken(token: string): AdminTokenPayload {
  const decoded = jwt.verify(token, SECRET) as JwtPayload;

  if (
    typeof decoded !== "object" ||
    typeof decoded.adminId !== "number" ||
    typeof decoded.email !== "string"
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    adminId: decoded.adminId,
    email: decoded.email,
  };
}
