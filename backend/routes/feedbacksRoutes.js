const express = require('express');
const router = express.Router();
const {feedbacks} = require('../controllers/feedbacksController');

// POST route for user registration
router.get('/feedbacks', feedbacks);

module.exports = router;
