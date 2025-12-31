import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/token";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("LOGIN EMAIL:", email);

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    console.log("ADMIN FOUND:", admin);

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("DB PASSWORD:", admin.password);
    console.log("INPUT PASSWORD:", password);

    const valid = await bcrypt.compare(password, admin.password);
    console.log("PASSWORD MATCH:", valid);

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

    return NextResponse.json({ token, expiresIn: "2h" });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}

