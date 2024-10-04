// backend/routes/requestsRoutes.js

const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

// Get all requests
router.get('/register', requestsController.getRequests);

// Accept a request
router.put('/register/:u_id/accept', requestsController.acceptRequest);

// Reject a request
router.delete('/register/:u_id/reject', requestsController.rejectRequest);

module.exports = router;