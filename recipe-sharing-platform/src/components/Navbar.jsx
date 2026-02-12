import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Home Link */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            RecipeHub
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4 sm:space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/add-recipe" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;