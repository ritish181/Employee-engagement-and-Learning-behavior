const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const enroll = async (req, res) => {
  const { u_id, c_id } = req.body; // Extract user ID and course ID from the request body

  console.log(`enroll request recieved, uid: ${u_id}, cid: ${c_id}`)

  try {
    // Check if the user is already enrolled in the course
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        // Assuming your model has a composite unique constraint on (u_id, c_id)
        c_id_u_id: {
          u_id: parseInt(u_id),
          c_id: parseInt(c_id),
        },
      },
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in this course.' });
    }

    // Create a new enrollment record
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        u_id: parseInt(u_id),
        c_id: parseInt(c_id),
        created_at: new Date(), // Set the enrollment date to now
      },
    });

    console.log(`enroll request completed`)

    res.status(200).json(enrollment); // Respond with the newly created enrollment
  } catch (error) {
    console.error("Error enrolling user in course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  enroll,
};
