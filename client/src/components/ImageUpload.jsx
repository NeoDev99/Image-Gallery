import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(''); // State for upload message

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message); // Update message on success
    } catch (error) {
      setUploadMessage('Error uploading files'); // Update message on error
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="mb-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-400 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Upload
        </button>
        {uploadMessage && (
          <p className={`mt-4 text-lg ${uploadMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {uploadMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ImageUpload;
