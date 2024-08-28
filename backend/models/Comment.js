const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentID: { type: String, required: true, unique: true },
    contentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);