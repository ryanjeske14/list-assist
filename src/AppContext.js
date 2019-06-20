import React from "react";

const AppContext = React.createContext({
  recipes: [],
  selected: [],
  addToSelected: () => {},
  removeFromSelected: () => {},
  addRecipe: () => {},
  addIngredients: () => {},
  loggedIn: false,
  setLoggedIn: () => {}
});

export default AppContext;
