const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all discussions
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await prisma.discussionParticipation.findMany({
      include: {
        register: {
          select: {
            u_name: true,
            d_id: true,
          },
        }, // Include user info
        course: {
          select: {
            c_name: true,
          },
        }, // Include course info
      },
    });

    console.log('Fetched discussions:', discussions); // Better log for debugging
    res.status(200).json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ error: 'Failed to fetch discussions' });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client is disconnected after the request
  }
};


exports.getCourseDiscussions = async (req, res) => {
  const { c_id } = req.params; // Assuming you're passing c_id through URL parameters

  try {
    const discussions = await prisma.discussionParticipation.findMany({
      where: {
        course: {
          c_id: parseInt(c_id), // Ensure the c_id is treated as an integer if it's a number
        },
      },
      include: {
        register: {
          select: {
            u_name: true,
            d_id: true,
          },
        }, // Include user info
        course: {
          select: {
            c_name: true,
          },
        }, // Include course info
      },
    });

    console.log(`Fetched discussions for course ${c_id}:`, discussions);
    res.status(200).json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ error: 'Failed to fetch discussions' });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client is disconnected after the request
  }
};
