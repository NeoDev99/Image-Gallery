const Image = require('../models/Image');

// Handle file upload
const uploadImage = async (req, res) => {
  try {
    const { url, cloudinary_id, filename, user_id } = req.body;
    console.log('Uploading image with details:', { url, cloudinary_id, filename, user_id });
    const newImage = new Image({
      url,
      cloudinary_id,
      filename,
      uploaded_at: new Date(),
      user_id
    });
    await newImage.save();
    console.log('Image saved:', newImage);
    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadImage,
  getAllImages
};
