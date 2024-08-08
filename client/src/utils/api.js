import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const setHeaders = (token = null) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` }),
});

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: setHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

// Sign-in user
export const signInUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, userData, {
      headers: setHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error signing in user:', error.message);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: setHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (token, formData) => {
  try {
    const response = await axios.put(`${API_URL}/user/update`, formData, {
      headers: setHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    throw error;
  }
};

// Delete user profile
export const deleteUserProfile = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/user/delete`, {
      headers: setHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user profile:', error.message);
    throw error;
  }
};

// Getting images
export const getImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`, {
      headers: setHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error;
  }
};

// Upload image
export const uploadImage = async (token, file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_URL}/uploads`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};
