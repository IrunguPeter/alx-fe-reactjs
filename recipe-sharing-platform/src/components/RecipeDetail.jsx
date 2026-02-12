import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the specific recipe by ID from the data.json
    const foundRecipe = recipeData.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <div className="text-center mt-20 text-xl font-semibold">Recipe not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="relative h-64 sm:h-96">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Link to="/" className="bg-white/90 hover:bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium transition-all shadow-md">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-8 italic">{recipe.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Ingredients Section */}
            <section className="bg-indigo-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {/* Check if ingredients exist in your JSON, otherwise use placeholders */}
                {(recipe.ingredients || ["Ingredient 1", "Ingredient 2", "Ingredient 3"]).map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions Section */}
            <section className="bg-white">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="space-y-6">
                {(recipe.instructions || ["Step 1: Prep", "Step 2: Cook", "Step 3: Serve"]).map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;