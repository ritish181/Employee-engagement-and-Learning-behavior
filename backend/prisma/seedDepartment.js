const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Inserting departments
  const departments = await prisma.department.createMany({
    data: [
      { d_id: 0, d_name: 'Admin', empcount: 1 },
      { d_name: 'Human Resources', empcount: 0 },
      { d_name: 'Engineering', empcount: 0 },
      { d_name: 'Marketing', empcount: 0 },
      { d_name: 'Sales', empcount: 0 },
      { d_name: 'Fullstack', empcount: 0 },    // New department
      { d_name: 'DevOps', empcount: 0 },       // New department
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
