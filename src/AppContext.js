import React from "react";

const AppContext = React.createContext({
  recipes: [],
  selected: [],
  addToSelected: () => {},
  removeFromSelected: () => {},
  addRecipe: () => {},
  addIngredients: () => {}
});

export default AppContext;
