const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure the uploads directory exists
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Ensure unique filenames
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Example: limit file size to 10 MB
  fileFilter: (req, file, cb) => {
    // Accept only certain file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

// Handle file uploads
router.post('/', upload.array('files'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  // Process and return file details
  const fileDetails = req.files.map(file => ({
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype
  }));

  res.status(200).json({
    message: 'Files uploaded successfully',
    files: fileDetails
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    res.status(400).json({ message: err.message });
  } else if (err) {
    // General errors
    res.status(500).json({ message: 'An error occurred', error: err.message });
  } else {
    next();
  }
});

module.exports = router;
