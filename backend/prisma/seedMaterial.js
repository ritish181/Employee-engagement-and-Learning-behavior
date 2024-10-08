const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedLearningMaterials() {
  try {
    // Fetch course IDs to ensure learning materials are linked correctly
    const courses = await prisma.course.findMany({
      select: { c_id: true, c_name: true },
    });

    // Create a map to associate course names with their IDs
    const courseMap = {};
    courses.forEach(course => {
      courseMap[course.c_name] = course.c_id;
    });

    // Seed learning materials
    const learningMaterials = await prisma.learningMaterial.createMany({
      data: [
        {
          title: 'Introduction to Fullstack Development',
          type: 'Video',
          content: 'https://example.com/fullstack_intro.mp4',
          c_id: courseMap['Fullstack Development'],
        },
        {
          title: 'Backend with Node.js',
          type: 'Document',
          content: 'https://example.com/nodejs_backend.pdf',
          c_id: courseMap['Fullstack Development'],
        },
        {
          title: 'Introduction to DevOps',
          type: 'Video',
          content: 'https://example.com/devops_intro.mp4',
          c_id: courseMap['DevOps Essentials'],
        },
        {
          title: 'Marketing Basics',
          type: 'Presentation',
          content: 'https://example.com/marketing_basics.pptx',
          c_id: courseMap['Marketing 101'],
        },
        {
          title: 'Engineering Design Concepts',
          type: 'Document',
          content: 'https://example.com/eng_design.pdf',
          c_id: courseMap['Engineering Design'],
        },
        {
          title: 'Effective Sales Strategies',
          type: 'Video',
          content: 'https://example.com/sales_strategies.mp4',
          c_id: courseMap['Sales Strategies'],
        },
      ],
      skipDuplicates: true, // Avoid duplicates
    });

    console.log('Learning materials seeded:', learningMaterials);
  } catch (error) {
    console.error('Error seeding learning materials:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedLearningMaterials()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
