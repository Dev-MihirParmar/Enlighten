const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    const { contentID, userID, text } = req.body;
    const commentID = new mongoose.Types.ObjectId();  // Unique identifier for comment
    try {
        const newComment = new Comment({ commentID, contentID, userID, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add comment' });
    }
};

exports.getCommentsByContentId = async (req, res) => {
    try {
        const comments = await Comment.find({ contentID: req.params.id }).populate('userID');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};