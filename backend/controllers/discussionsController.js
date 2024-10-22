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


exports.submitDiscussions = async(req, res) => {

  let { u_id, c_id, comment } = req.body;
  console.log(u_id);
  console.log(c_id);
  console.log(comment);

  try {
    // Validate input
    if (!u_id || !c_id || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user and course exist
    const user = await prisma.register.findUnique({ where: { u_id: parseInt(u_id) } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const course = await prisma.course.findUnique({ where: { c_id: parseInt(c_id) } });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create feedback in the database
    const feedback = await prisma.discussionParticipation.create({
      data: {
        comment,
        register: { connect: { u_id: Number(u_id) } },  // Connect the feedback to the user
        course: { connect: { c_id: Number(c_id) } },    // Connect the feedback to the course
      },
    });
    

    res.status(201).json({ message: 'Discussion submitted successfully', feedback });
  } catch (error) {
    console.error('Error submitting discussion:', error);
    res.status(500).json({ error: 'Failed to submit discussion' });
  }

}