const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadFiles = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No file part' });
  }

  const files = req.files;

  res.status(200).json({
    message: 'Files uploaded successfully',
    files: files.map((file) => ({ filename: file.filename, path: file.path })),
  });
};

exports.uploadMiddleware = upload.array('files');
