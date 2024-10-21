const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: Fetch all feedbacks
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
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

// GET: Fetch feedbacks for a specific course
exports.courseFeedbacks = async (req, res) => {
  const { c_id } = req.params;
  try {
    const feedback = await prisma.feedback.findMany({
      where: {
        course: {
          c_id: parseInt(c_id), // Ensure c_id is treated as an integer if it's a number
        },
      },
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
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
};

// POST: Submit feedback
exports.submitFeedback = async (req, res) => {
  const { u_id, c_id, remarks, rating } = req.body;
  console.log(u_id);
  console.log(c_id);
  console.log(remarks);
  console.log(rating);

  try {
    // Validate input
    if (!u_id || !c_id || !remarks || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure rating is between 1 and 5
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
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
    const feedback = await prisma.feedback.create({
      data: {
        remarks,
        rating,
        register: { connect: { u_id: parseInt(u_id) } },  // Connect the feedback to the user
        course: { connect: { c_id: parseInt(c_id) } },    // Connect the feedback to the course
      },
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};
