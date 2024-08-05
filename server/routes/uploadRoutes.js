const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads'); // Adjust path if necessary
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Handle file uploads
router.post('/', upload.array('files'), (req, res) => {
  res.json({ message: 'Files uploaded successfully' });
});

module.exports = router;
