const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },                          // URL of the image
  cloudinary_id: { type: String, required: true },                // Cloudinary ID for the image
  filename: { type: String, required: true },                     // Original filename of the image
  uploaded_at: { type: Date, default: Date.now },                 // Timestamp of when the image was uploaded
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Reference to a user
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
