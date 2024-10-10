const express = require('express');
const router = express.Router();
const {enroll} = require('../controllers/enrollController');


// POST route for user registration
router.post('/enroll', enroll);

module.exports = router;
