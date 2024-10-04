const express = require('express');
const router = express.Router();
const { adminCourses } = require('../controllers/adminCoursesController');

// POST route for user registration
router.post('/adminCourses', adminCourses);

module.exports = router;
