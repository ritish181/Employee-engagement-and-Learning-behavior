const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Inserting departments
  const departments = await prisma.department.createMany({
    data: [
      { d_name: 'Human Resources', empcount: 25 },
      { d_name: 'Engineering', empcount: 100 },
      { d_name: 'Marketing', empcount: 30 },
      { d_name: 'Sales', empcount: 40 },
      { d_name: 'Fullstack', empcount: 50 },    // New department
      { d_name: 'DevOps', empcount: 35 },       // New department
    ],
    skipDuplicates: true, // Prevent inserting duplicates
  });

  console.log({ departments });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
