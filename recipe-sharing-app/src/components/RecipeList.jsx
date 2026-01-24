import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const RecipeList = () => {
  const { recipes, searchTerm, filteredRecipes, filterRecipes } = useRecipeStore();

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes, filterRecipes]);

  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <h2>Recipe List</h2>
      {recipesToDisplay.length === 0 ? <p>No recipes yet!</p> : recipesToDisplay.map(recipe => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
