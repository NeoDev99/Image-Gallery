const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Define a Mongoose schema for the image model
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  // Add more properties as needed
});

// Create a Mongoose model based on the image schema
const Image = mongoose.model('Image', imageSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/image-gallery', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define routes
app.get('/api/images', (req, res) => {
    // Fetch all images from the database
    Image.find({}, (err, images) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching images' });
        } else {
            res.json(images);
        }
    });
});

app.post('/api/images', (req, res) => {
    // Create a new image based on the request body
    const newImage = new Image({
        url: req.body.url
        // Add more properties as needed
    });
  
    // Save the new image to the database
    newImage.save((err, savedImage) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error saving image' });
        } else {
            res.json(savedImage);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
