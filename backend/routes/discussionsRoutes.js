// routes/discussionsRoutes.js
const express = require('express');
const router = express.Router();
const discussionsController = require('../controllers/discussionsController');

// Route to get all discussions
router.get('/discussions', discussionsController.getAllDiscussions);
router.get('/discussions/:c_id', discussionsController.getCourseDiscussions);

// // Route to create a new discussion
// router.post('/discussions', discussionsController.createDiscussion);

// // Route to update an existing discussion by ID
// router.put('/discussions/:id', discussionsController.updateDiscussion);

// // Route to delete a discussion by ID
// router.delete('/discussions/:id', discussionsController.deleteDiscussion);

module.exports = router;
