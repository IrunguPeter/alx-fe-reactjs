import React, { useState, useEffect } from 'react';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load the data from the imported JSON file
    setRecipes(recipeData);
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Recipe Sharing Platform
      </h1>
      
      {/* The grid uses:
        - justify-items-center: centers cards within their grid cells
        - gap-8: adds spacious breathing room between cards
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{recipe.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {recipe.summary}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;