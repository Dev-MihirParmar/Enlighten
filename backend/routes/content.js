const express = require('express');
const { getContentById, createContent, updateContent, deleteContent, likeContent, uploadVideo } = require('../controllers/contentController');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Fetch a single piece of content by ID
router.get('/:id', getContentById);

// Create new content
router.post('/', auth, createContent);

// Update existing content
router.put('/:id', auth, updateContent);

// Delete content
router.delete('/:id', auth, deleteContent);

// Like content
router.post('/:id/like', auth, likeContent);

// Upload video file
router.post('/upload-video', auth, upload.single('video'), uploadVideo);

module.exports = router;
