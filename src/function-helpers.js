// returns recipe data and quantity for selected recipes
export const findSelected = (recipes = [], selected) => {
  const selectedRecipeInfo = [];

  for (const recipe of recipes) {
    if (selected[recipe.id] != null) {
      selectedRecipeInfo.push({ ...recipe, quantity: selected[recipe.id] });
    }
  }

  return selectedRecipeInfo;
};

// returns recipe data for a specific recipe
export const findRecipe = (recipes = [], recipeId) => {
  return recipes.find(recipe => recipe.id === Number(recipeId));
};

// returns array of ingredients for a specific recipe
export const findIngredients = (recipeIngredients, recipeId) => {
  return recipeIngredients.filter(
    ingredient => ingredient.recipeId === Number(recipeId)
  );
};

// converts fractions to decimals
export const convertFraction = num => {
  if (num.includes("/")) {
    let splitNum = num.split("/").map(num => parseInt(num));
    return splitNum[0] / splitNum[1];
  } else {
    return Number(num);
  }
};
