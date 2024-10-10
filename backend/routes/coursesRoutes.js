// routes/coursesRoutes.js
const express = require('express');
const router = express.Router();
const { getCourseById, getAllCourses,createCourse,userEngagement } = require('../controllers/coursesController');
const verifyToken = require('../middlewares/authentication');
const authentication = require('../middlewares/authentication')
// Route to get a course by ID along with learning materials
router.get('/courses/:c_id', getCourseById);
router.get('/courses', getAllCourses);
router.post('/admin/courses/create',createCourse );

router.post('/engagement/module',userEngagement );

router.post('/createCourse',verifyToken,(req, res, next)=>{
    if(req.user.role != 'admin'){
        res.json("unauthorized request")
    }
})
// You can add more routes here for quizzes, discussions, feedback, etc.
// Example: router.get('/:id/quiz', getQuizByCourseId);

module.exports = router;