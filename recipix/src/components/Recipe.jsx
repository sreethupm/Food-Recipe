import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Recipe.css';

function Recipe({ recipes }) {
  const { id } = useParams();

  if (!recipes || recipes.length === 0)
    return <p className="loading-text">Loading recipe...</p>;

  const recipe = recipes.find(r => r.id === Number(id));

  if (!recipe)
    return <p className="loading-text">Recipe not found</p>;

  return (
    <div className="recipe-wrapper">
      <div
        className="recipe-hero"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <Link to="/recipes" className="back-btn">
          ← Back
        </Link>
      </div>

      <div className="recipe-card">
        <h1>{recipe.name}</h1>
        <p className="meta">
          🍽 {recipe.cuisine} • ⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min • Serves {recipe.servings}
        </p>

        <div className="recipe-sections">
          <section>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
