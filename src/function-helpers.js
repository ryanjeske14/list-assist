export const findSelected = (recipes, selected) => {
  const selectedRecipeInfo = [];

  for (const recipe of recipes) {
    if (selected[recipe.id] != null) {
      selectedRecipeInfo.push({ ...recipe, quantity: selected[recipe.id] });
    }
  }

  return selectedRecipeInfo;
};
