import React, { useState, useEffect } from 'react';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipe data from data.json into state
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Delicious Recipes
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Find your next favorite meal from our curated collection.
        </p>
      </header>

      {/* Step 4: Responsive Grid Layout */}
      {/* - grid-cols-1: Mobile (1 card)
          - sm:grid-cols-2: Small screens/Tablets (2 cards)
          - lg:grid-cols-3: Desktops (3 cards)
          - justify-items-center: Aligns cards to the center
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {recipes.map((recipe) => (
          /* Step 3: Styled Recipe Card */
          <div 
            key={recipe.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer w-full max-w-sm"
          >
            {/* Recipe Image */}
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-48 object-cover"
            />
            
            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {recipe.summary}
              </p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                  View Details
                </span>
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;