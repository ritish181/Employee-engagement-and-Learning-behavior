const express = require('express');
const router = express.Router();
const { department } = require('../controllers/departmentController');

// POST route for user registration
router.get('/department', department);

module.exports = router;
