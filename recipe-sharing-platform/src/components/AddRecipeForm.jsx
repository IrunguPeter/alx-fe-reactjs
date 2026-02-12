import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!title.trim()) newErrors.title = "Recipe title is required.";
    
    // Split ingredients by lines or commas and filter out empty strings
    const ingredientsList = ingredients.split(/[,\n]/).filter(item => item.trim() !== "");
    if (ingredientsList.length < 2) {
      newErrors.ingredients = "Please provide at least two ingredients.";
    }
    
    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Logic to "submit" the recipe (e.g., console log or state update)
      console.log({ title, ingredients, steps });
      alert("Recipe Submitted Successfully!");
      
      // Clear form
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg sm:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. Classic Margherita Pizza"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Ingredients (one per line or comma-separated)</label>
          <textarea 
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tomato sauce, Mozzarella, Basil..."
          ></textarea>
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Preparation Steps</label>
          <textarea 
            rows="6"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Step 1: Preheat oven..."
          ></textarea>
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 hover:shadow-md transform transition-all duration-200 active:scale-95 md:w-max md:px-12"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;