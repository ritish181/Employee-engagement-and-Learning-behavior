const express = require('express');
const router = express.Router();
const { registerUser, employeeCount } = require('../controllers/registerController');

// POST route for user registration
router.post('/register', registerUser);
router.get('/employees', employeeCount)

module.exports = router;
