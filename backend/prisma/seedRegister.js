// prisma/seedRegister.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedRegister() {
  const users = await prisma.register.createMany({
    data: [
      { u_name: 'Alice', email: 'alice@example.com', password: 'password1', d_id: 1, approved: 1 },
      { u_name: 'Bob', email: 'bob@example.com', password: 'password2', d_id: 1, approved: 1 },
      { u_name: 'Charlie', email: 'charlie@example.com', password: 'password3', d_id: 2, approved: 1 },
      { u_name: 'David', email: 'david@example.com', password: 'password4', d_id: 2, approved: 1 },
      { u_name: 'Eva', email: 'eva@example.com', password: 'password5', d_id: 3, approved: 1 }
    ],
    skipDuplicates: true, // Avoid duplicates
  });

  console.log({ users });
}

seedRegister()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
