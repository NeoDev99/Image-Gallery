const express = require('express');
const router = express.Router();
const { uploadImage, getAllImages } = require('../controllers/imageController');
const multer = require('multer');
const path = require('path');

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Define routes
router.post('/upload', upload.array('files'), uploadImage);
router.get('/', getAllImages);

module.exports = router;
