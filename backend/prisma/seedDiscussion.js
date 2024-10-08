// prisma/seedDiscussions.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDiscussions() {
  const discussions = await prisma.discussionParticipation.createMany({
    data: [
      { u_id: 21, c_id: 1, comment: 'This course is amazing! I learned a lot.' },
      { u_id: 22, c_id: 2, comment: 'The DevOps module was very insightful.' },
      { u_id: 23, c_id: 3, comment: 'Marketing strategies are clearly explained.' },
      { u_id: 24, c_id: 1, comment: 'Can we have more practical examples in Fullstack?' },
      { u_id: 25, c_id: 4, comment: 'Engineering design principles are well covered.' },
      { u_id: 21, c_id: 5, comment: 'Sales strategies course is very comprehensive!' },
      { u_id: 23, c_id: 4, comment: 'Can we discuss real-world projects?' },
      { u_id: 22, c_id: 1, comment: 'The Fullstack Development course is well-structured.' },
      { u_id: 25, c_id: 2, comment: 'DevOps lab exercises are awesome!' },
      { u_id: 24, c_id: 3, comment: 'Looking forward to more marketing case studies.' }
    ],
    skipDuplicates: true, // Avoid duplicate entries
  });

  console.log({ discussions });
}

seedDiscussions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
