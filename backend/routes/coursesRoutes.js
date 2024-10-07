// routes/coursesRoutes.js
const express = require('express');
const router = express.Router();
const { getCourseById, getAllCourses } = require('../controllers/coursesController');

// Route to get a course by ID along with learning materials
router.get('/courses/:id', getCourseById);
router.get('/courses', getAllCourses);

// You can add more routes here for quizzes, discussions, feedback, etc.
// Example: router.get('/:id/quiz', getQuizByCourseId);

module.exports = router;