import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
          <Link to="/">LOGO</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/gallery" className="text-white">Gallery</Link>
          <Link to="/upload" className="text-white">Upload</Link>
        </div>

        {/* Authentication Links */}
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white hover:text-green-500">Profile</Link>
              <div 
                onClick={signOut} 
                className="text-red-500 cursor-pointer"
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-white">Sign In</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
