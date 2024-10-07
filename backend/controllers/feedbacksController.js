const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.feedbacks = async (req, res) => {
    
  try {
    
    const feedback = await prisma.feedback.findMany({
      include: {
        register: {
          select: {
            u_name: true,
            d_id: true,
          },
        },
        course: {
          select: {
            c_name: true,
          },
        },
      },
    });
    // console.log(feedback.json())
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};
