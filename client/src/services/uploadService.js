import axios from 'axios';

const API_URL = 'http://localhost:5000/api/uploads';

export const uploadFiles = (formData, token) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
