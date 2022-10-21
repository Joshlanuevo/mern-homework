const express = require('express');
const router = express.Router();
const { getHomework, setHomework, updateHomework, deleteHomework } = require('../controller/homeworkController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getHomework).post(protect, setHomework);
router.route('/:id').put(protect, updateHomework).delete(protect, deleteHomework);

module.exports = router;