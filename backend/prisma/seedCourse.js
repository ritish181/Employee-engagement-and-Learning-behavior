// prisma/seedCourse.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedCourses() {
  const courses = await prisma.course.createMany({
    data: [
      { c_name: 'Fullstack Development' },
      { c_name: 'DevOps Essentials' },
      { c_name: 'Marketing 101' },
      { c_name: 'Engineering Design' },
      { c_name: 'Sales Strategies' }
    ],
    skipDuplicates: true, // Avoid duplicates
  });

  console.log({ courses });
}

seedCourses()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
