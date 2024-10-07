// controllers/discussionsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all discussions
exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await prisma.discussionParticipation.findMany({
      include: {
        register:{
            select:{
                u_name :true,
                d_id: true,
            }
        },  // Include user info
        course: {
            select:{
                c_name: true,
            }
        },    // Include course info
      },
    });
    res.status(200).json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    res.status(500).json({ error: 'Failed to fetch discussions' });
  }
};