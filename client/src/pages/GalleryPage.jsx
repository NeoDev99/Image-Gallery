import React from 'react';
import ImageGallery from '../components/ImageGallery';

const GalleryPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl mb-4">Welcome to your Gallery Page!</h1>
      <p className="text-center">Uploaded Images are displayed here, and you can categorise your gallery page how you desire.</p>
      <ImageGallery />
    </div>
  );
};

export default GalleryPage;
