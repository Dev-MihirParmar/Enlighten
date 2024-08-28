const Content = require('../models/Content');
const fs = require('fs');
const path = require('path');

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('author', 'username').populate('comments');
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.createContent = async (req, res) => {
  const { title, body, videoUrl, tags, category, status } = req.body;

  try {
    const content = new Content({
      title,
      body,
      videoUrl,
      author: req.user.id,
      tags,
      category,
      status,
    });

    await content.save();
    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateContent = async (req, res) => {
  const { title, body, videoUrl, tags, category, status } = req.body;

  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    content = await Content.findByIdAndUpdate(
      req.params.id,
      { title, body, videoUrl, tags, category, status, updatedAt: Date.now() },
      { new: true }
    );

    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    await content.remove();

    res.json({ message: 'Content removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.likeContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.likes.includes(req.user.id)) {
      return res.status(400).json({ message: 'Content already liked' });
    }

    content.likes.push(req.user.id);

    await content.save();

    res.json(content.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const filePath = `/uploads/videos/${req.file.filename}`;
    res.json({ videoUrl: filePath });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
