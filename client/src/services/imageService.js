import axios from 'axios';

const API_URL = 'http://localhost:5000/api/images';

// Function to upload an image
export const uploadImage = async (imageData, token) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, imageData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Ensure the correct Content-Type
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Function to fetch all images
export const getImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
