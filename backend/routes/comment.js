const express = require('express');
const { addComment, getCommentsByContentId } = require('../controllers/commentController');
const router = express.Router();

router.post('/', addComment);
router.get('/:id', getCommentsByContentId);

module.exports = router;