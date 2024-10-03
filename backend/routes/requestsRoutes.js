// backend/routes/requestsRoutes.js

const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

// Get all requests
router.get('/register', requestsController.getRequests);

// Accept a request
router.put('/register/:id/accept', requestsController.acceptRequest);

// Reject a request
router.delete('/register/:id/reject', requestsController.rejectRequest);

module.exports = router;
