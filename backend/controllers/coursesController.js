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

// Get a single course with its learning materials
const getCourseById = async (req, res) => {
  const { c_id } = req.params; // Expecting courseId in the request parameters
  try {
    const course = await prisma.course.findUnique({
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

module.exports = {
  getAllCourses,
  getCourseById,
};
