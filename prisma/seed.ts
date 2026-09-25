import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = "admin@sbflight.com";
  const password = "Admin@123456";

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: {
      email,
    },

    update: {
      firstName: "SB",
      lastName: "Admin",
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },

    create: {
      firstName: "SB",
      lastName: "Admin",
      email,
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      country: "Bangladesh",
    },
  });

  console.log("✅ Admin created successfully!");
  console.log("ID:", admin.id);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Role:", admin.role);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });