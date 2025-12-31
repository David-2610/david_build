import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

async function run() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.admin.update({
    where: { email: "admin@yourdomain.com" },
    data: { password: hash },
  });

  console.log("Admin password fixed");
}

run();
