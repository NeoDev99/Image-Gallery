import React, { useState, useEffect } from 'react';
import ImageModal from '../components/ImageModal';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(18);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchImages() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.unsplash.com/photos/random?count=60&client_id=${process.env.REACT_APP_API_ACCESS_KEY}`
                );
                const data = await response.json();
                console.log('Fetched data:', data);
                if (Array.isArray(data)) {
                    const imageUrls = data.map((image) => image.urls.regular);
                    setImages(imageUrls);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                setError('Error fetching images. Please try again later.');
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, []);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(images.length / imagesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.REACT_APP_API_ACCESS_KEY}&per_page=20`
            );
            const data = await response.json();
            const imageUrls = data.results.map((image) => image.urls.regular);
            setImages(imageUrls);
            setCurrentPage(1);
        } catch (error) {
            setError('Error fetching images. Please try again later.');
            console.error('Error searching images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-4xl text-gray-700 mb-6 pt-6 text-center">Your Ultimate Image Library</h1>
            <SearchBar onSearch={handleSearch} />

            {loading && <Loader />}
            {error && <div className="text-red-500 text-center my-20">{error}</div>}

            {!loading && !error && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 my-5 mx-20 p-2.5">
                    {currentImages.map((imageUrl, index) => (
                        <a key={index} href="/" onClick={(e) => { e.preventDefault(); openModal(imageUrl); }}>
                            <img
                                src={imageUrl}
                                alt={`Unsplash ${index + 1}`}
                                className="w-[400px] h-[400px] border border-[#EFF6E0] rounded-[12px] shadow-[4px_7px_7px_0px_#00000042] cursor-pointer m-2.5 transition duration-400 transform hover:grayscale hover:scale-105"
                                onClick={() => openModal(imageUrl)}
                            />
                        </a>
                    ))}
                </div>
            )}

            {!loading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            )}

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
        </div>
    );
}

export default HomePage;


/*
import React, { useState, useEffect } from 'react';
import ImageModal from '../components/ImageModal';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(18);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([
        'Nature', 'Architecture', 'People', 'Technology', 'Food', 'Animals'
    ]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        async function fetchImages() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.unsplash.com/photos/random?count=60&client_id=${process.env.REACT_APP_API_ACCESS_KEY}`
                );
                const data = await response.json();
                console.log('Fetched data:', data);
                if (Array.isArray(data)) {
                    const imageUrls = data.map((image) => ({
                        url: image.urls.regular,
                        category: 'Nature', // Example category; update based on actual data or logic
                    }));
                    setImages(imageUrls);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                setError('Error fetching images. Please try again later.');
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, []);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images
        .filter(image => selectedCategory === 'all' || image.category === selectedCategory)
        .slice(indexOfFirstImage, indexOfLastImage);

    const totalPages = Math.ceil(images.length / imagesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.REACT_APP_API_ACCESS_KEY}&per_page=20`
            );
            const data = await response.json();
            const imageUrls = data.results.map((image) => ({
                url: image.urls.regular,
                category: 'Nature', // Example category; update based on actual data or logic
            }));
            setImages(imageUrls);
            setCurrentPage(1);
        } catch (error) {
            setError('Error fetching images. Please try again later.');
            console.error('Error searching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    return (
        <div>
            <h1 className="text-4xl text-gray-700 mb-6 pt-6 text-center">Your Ultimate Image Library</h1>
            <SearchBar onSearch={handleSearch} />

            {/* Categories UI /*}
            <div className="text-center mb-4">
                <button onClick={() => handleCategoryChange('all')} className={`px-4 py-2 ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading && <Loader />}
            {error && <div className="text-red-500 text-center my-20">{error}</div>}

            {!loading && !error && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 my-5 mx-20 p-2.5">
                    {currentImages.length > 0 ? (
                        currentImages.map((image, index) => (
                            <a key={index} href="/" onClick={(e) => { e.preventDefault(); openModal(image.url); }}>
                                <img
                                    src={image.url}
                                    alt={`Unsplash ${index + 1}`}
                                    className="w-[400px] h-[400px] border border-[#EFF6E0] rounded-[12px] shadow-[4px_7px_7px_0px_#00000042] cursor-pointer m-2.5 transition duration-400 transform hover:grayscale hover:scale-105"
                                    onClick={() => openModal(image.url)}
                                />
                            </a>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No images available</p>
                    )}
                </div>
            )}

            {!loading && !error && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            )}

            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
        </div>
    );
}

export default HomePage;
*/