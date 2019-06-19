import React from "react";

const AppContext = React.createContext({
  recipes: [],
  selected: [],
  units: [],
  addToSelected: () => {},
  removeFromSelected: () => {},
  addRecipe: () => {},
  addIngredients: () => {}
});

export default AppContext;
