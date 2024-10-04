const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// POST route for user registration
router.post('/login', loginUser);

module.exports = router;
