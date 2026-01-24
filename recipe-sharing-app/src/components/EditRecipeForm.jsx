import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe, onSave }) => {
  const { updateRecipe } = useRecipeStore();
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe({ ...recipe, title, description });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
