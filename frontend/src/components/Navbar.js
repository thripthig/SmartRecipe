// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            🧠 CookSmart
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`hover:text-orange-200 transition duration-200 ${
                isActive('/') ? 'text-orange-200 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generate" 
              className={`hover:text-orange-200 transition duration-200 ${
                isActive('/generate') ? 'text-orange-200 font-semibold' : ''
              }`}
            >
              Generate Recipe
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/my-recipes" 
                  className={`hover:text-orange-200 transition duration-200 ${
                    isActive('/my-recipes') ? 'text-orange-200 font-semibold' : ''
                  }`}
                >
                  My Recipes
                </Link>
                <Link 
                  to="/profile" 
                  className={`hover:text-orange-200 transition duration-200 ${
                    isActive('/profile') ? 'text-orange-200 font-semibold' : ''
                  }`}
                >
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="hover:text-orange-200 transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`hover:text-orange-200 transition duration-200 ${
                    isActive('/login') ? 'text-orange-200 font-semibold' : ''
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`hover:text-orange-200 transition duration-200 ${
                    isActive('/register') ? 'text-orange-200 font-semibold' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;