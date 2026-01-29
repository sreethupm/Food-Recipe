import React from 'react';
import Card from './Card';
import './RecipeList.css';

function RecipeList({ recipes, search }) {
  if (!recipes || recipes.length === 0)
    return <p className="loading-text">Loading recipes...</p>;

  // If search is empty, show all recipes
  const filteredRecipes = search
    ? recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase())
      )
    : recipes;

  if (filteredRecipes.length === 0)
    return <p className="loading-text">No recipes found</p>;

  return (
    <div className="Cardbg">
  <div className="main">
    {filteredRecipes.map(recipe => (
      <Card
        key={recipe.id}
        name={recipe.name}
        image={recipe.image}
        time={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`}
        description={`Serves ${recipe.servings} • ${recipe.cuisine}`}
        recipeId={recipe.id}
      />
    ))}
  </div>
</div>

  );
}

export default RecipeList;
