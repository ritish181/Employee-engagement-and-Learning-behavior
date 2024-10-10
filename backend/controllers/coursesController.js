const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Enrolled Courses

const getEnrolledCourses = async (req, res) => {
  const { u_id } = req.params; // Get the u_id from the request parameters

  try {
    const courses = await prisma.courseEnrollment.findMany({
      where: {
        u_id: parseInt(u_id), // Filter by the specific user ID
      },
      include: {
        course: true,      // Include course details
        register: true,    // Include user details (from the 'Register' table)
      },
    });
    res.status(200).json(courses); // Send the fetched courses as the response
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get a single course with its learning materials
const getCourseById = async (req, res) => {
  const { c_id } = req.params; // Expecting courseId in the request parameters
  
  try {
    const course = await prisma.course.findMany({
      where: {
        c_id: parseInt(c_id),
      },
      include: {
        materials: true, // Include learning materials related to the course
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCourse = async (req, res) => {
  const { c_name, learningMaterials, quizzes } = req.body;

  try {
    // Create the course
    const course = await prisma.course.create({
      data: {
        c_name,
        // Create learning materials and quizzes at the same time
        materials: {
          create: learningMaterials,
        }
      },
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Error creating course and related data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client is disconnected after the request
  }
};


// Engagement controller
const userEngagement = async (req, res) => {
  const { user_id, course_id, module_id, time_spent } = req.body;

  // Validate the request body
  if (!user_id || !course_id || !module_id || typeof time_spent !== 'number') {
    return res.status(400).json({ message: 'Missing or invalid parameters.' });
  }

  try {
    // Create a new engagement record in the database
    const engagement = await prisma.engagement.create({
      data: {
        timeSpent: time_spent,
        u_id: user_id,
        c_id: parseInt(course_id),
        m_id: parseInt(module_id),
        module_completed: true, // Default value for module_completed
      },
    });
    const sampleEngagement = await prisma.engagement.findFirst();
    
    console.log('Engagement Model Fields:', Object.keys(sampleEngagement));
    // Respond with the created engagement record
    return res.status(201).json(engagement);
  } catch (error) {
    console.error('Error creating engagement:', error);
    return res.status(500).json({ message: 'Error creating engagement record.' });
  }
};



module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  userEngagement,
  getEnrolledCourses
};
