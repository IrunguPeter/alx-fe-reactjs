import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const { setSearchTerm, filterRecipes } = useRecipeStore();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
    />
  );
};

export default SearchBar;
