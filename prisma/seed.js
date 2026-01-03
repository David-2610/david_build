const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const plainPassword = "password123";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log("🚀 Admin user created successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
