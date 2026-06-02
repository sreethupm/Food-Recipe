import React from 'react';
import Card from './Card';

function RecipeList({ recipes, search }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-sage-medium border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-charcoal-medium font-medium">Fetching culinary delights...</p>
      </div>
    );
  }

  // Filter recipes based on search query
  const filteredRecipes = search
    ? recipes.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase())
      )
    : recipes;

  if (filteredRecipes.length === 0) {
    return (
      <div className="text-center py-20 max-w-md mx-auto px-6">
        <p className="text-4xl mb-4">🍽️</p>
        <h3 className="font-serif text-lg font-bold text-charcoal-dark mb-1">No Recipes Found</h3>
        <p className="text-sm text-charcoal-light">
          We couldn't find matches for "{search}". Try searching for something else!
        </p>
      </div>
    );
  }

  // Bento layout css class assignment based on item index
  const getBentoClass = (index) => {
    const idx = index % 8;
    if (idx === 0) return 'md:col-span-2 md:row-span-2';
    if (idx === 1) return 'md:col-span-2 md:row-span-1';
    if (idx === 2) return 'md:col-span-1 md:row-span-1';
    if (idx === 3) return 'md:col-span-1 md:row-span-1';
    if (idx === 4) return 'md:col-span-1 md:row-span-1';
    if (idx === 5) return 'md:col-span-1 md:row-span-1';
    if (idx === 6) return 'md:col-span-2 md:row-span-2';
    if (idx === 7) return 'md:col-span-2 md:row-span-1';
    return '';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[220px]">
        {filteredRecipes.map((recipe, index) => (
          <Card
            key={recipe.id}
            name={recipe.name}
            image={recipe.image}
            time={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`}
            description={`${recipe.cuisine} cuisine • Serves ${recipe.servings}`}
            recipeId={recipe.id}
            bentoClass={getBentoClass(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
export { }
