import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { recipes, favorites, addFavorite, removeFavorite } = useRecipeStore();
  const recipe = recipes.find(recipe => recipe.id === parseInt(recipeId));
  const [isEditing, setIsEditing] = useState(false);
  
  const isFavorite = favorites.includes(parseInt(recipeId));

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(parseInt(recipeId));
    } else {
      addFavorite(parseInt(recipeId));
    }
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onSave={() => setIsEditing(false)} />
      ) : (
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <DeleteRecipeButton recipeId={recipe.id} />
          <button onClick={handleToggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
