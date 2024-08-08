import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const UploadPage = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure selectedFiles is not null and has files
        if (!selectedFiles || selectedFiles.length === 0) {
            toast.error('No files selected');
            return;
        }

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

            toast.success(response.data.message); // Display success message
        } catch (error) {
            toast.error('Error uploading files'); // Display error message
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#001f3f] to-gray-900 p-4">
            <div className="container mx-auto p-4">
                <h1 className="text-center text-white text-xl mb-4">Upload Image(s)</h1>
            </div>
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
            </form>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default UploadPage;
