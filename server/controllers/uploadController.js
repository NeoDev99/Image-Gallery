const multer = require('multer');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the directory exists
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    // Prefix file with timestamp to avoid filename conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance with the defined storage
const upload = multer({ storage });

// Handle file uploads
exports.uploadFiles = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  // Process uploaded files
  const files = req.files;
  const fileDetails = files.map((file) => ({
    filename: file.filename,
    path: file.path,
  }));

  res.status(200).json({
    message: 'Files uploaded successfully.',
    files: fileDetails,
  });
};

// Middleware to handle multiple file uploads
exports.uploadMiddleware = upload.array('files');
