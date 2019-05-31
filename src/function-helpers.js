export const findSelected = (recipes = [], selected) => {
  const selectedRecipeInfo = [];

  for (const recipe of recipes) {
    if (selected[recipe.id] != null) {
      selectedRecipeInfo.push({ ...recipe, quantity: selected[recipe.id] });
    }
  }

  return selectedRecipeInfo;
};

export const findRecipe = (recipes = [], recipeId) => {
  return recipes.find(recipe => recipe.id === Number(recipeId));
};

export const findIngredients = (recipeIngredients, recipeId) => {
  return recipeIngredients.filter(
    ingredient => ingredient.recipeId === Number(recipeId)
  );
};

export const convertFraction = num => {
  if (num.includes("/")) {
    let splitNum = num.split("/").map(num => parseInt(num));
    return splitNum[0] / splitNum[1];
  } else {
    return Number(num);
  }
};
