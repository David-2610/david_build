import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/token";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken({
      adminId: admin.id,
      email: admin.email,
    });

    return NextResponse.json({
      token,
      expiresIn: "2h",
    });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
