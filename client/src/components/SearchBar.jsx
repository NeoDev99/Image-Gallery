import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="container mx-auto p-4">
        <form onSubmit={handleSearchSubmit} className="mb-6 flex items-center space-x-4">
            <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={handleSearchQueryChange}
                className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="p-2 bg-gray-800 text-white rounded font-semibold">Search</button>
        </form>
    </div>
  );
};

export default SearchBar;
