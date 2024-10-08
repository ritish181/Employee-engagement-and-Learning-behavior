const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedFeedbacks() {
  const feedbacks = await prisma.feedback.createMany({
    data: [
      { u_id: 21, c_id: 1, remarks: 'Great course!', rating: 5 },
      { u_id: 22, c_id: 1, remarks: 'Very helpful', rating: 4 },
      { u_id: 23, c_id: 2, remarks: 'Could be better', rating: 3 },
      { u_id: 24, c_id: 2, remarks: 'Excellent content', rating: 5 },
      { u_id: 25, c_id: 3, remarks: 'Loved the examples', rating: 4 },
      { u_id: 21, c_id: 3, remarks: 'Highly recommended', rating: 5 },
      { u_id: 22, c_id: 4, remarks: 'Average', rating: 3 },
      { u_id: 23, c_id: 4, remarks: 'Good, but could improve', rating: 4 },
      { u_id: 24, c_id: 5, remarks: 'Informative', rating: 4 },
      { u_id: 25, c_id: 5, remarks: 'Great for beginners', rating: 5 },
    ],
    skipDuplicates: true,
  });

  console.log('Feedbacks seeded:', feedbacks);
}

seedFeedbacks()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
