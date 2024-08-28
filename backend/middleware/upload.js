const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only video files
const fileFilter = (req, file, cb) => {
  const fileTypes = /mp4|mkv|mov/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Videos Only!');
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000 }, // 100MB limit
});

module.exports = upload;
