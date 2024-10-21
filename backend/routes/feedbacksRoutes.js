const express = require('express');
const router = express.Router();
const {feedbacks, submitFeedback} = require('../controllers/feedbacksController');
const {courseFeedbacks} = require('../controllers/feedbacksController');

// POST route for user registration
router.get('/feedbacks', feedbacks);
router.post('/feedbacks', submitFeedback);
router.get('/feedbacks/:c_id', courseFeedbacks);

module.exports = router;
