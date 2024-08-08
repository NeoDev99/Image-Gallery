import React from 'react';

function ImageModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="flex bg-white rounded-lg shadow-lg max-w-4xl">
        {/* Image */}
        <img src={image.url} alt={image.description} className="w-1/2 h-auto object-cover rounded-l-lg" />

        {/* Description */}
        <div className="w-1/2 p-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-3xl font-bold focus:outline-none"
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-2">Image Details</h2>
          <p className="mb-4">{image.description}</p>
          <p className="mb-4"><strong>Location:</strong> {image.location}</p>
          <p className="mb-4"><strong>Updated At:</strong> {image.updatedAt}</p>
          <p className="mb-4">
            <strong>User:</strong> <a href={image.user.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{image.user.name}</a>
          </p>
          <button href={image.downloadLink} target="_blank" rel="noopener noreferrer" className="text-white">Download Image</button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;







