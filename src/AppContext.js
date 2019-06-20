import React from "react";

const AppContext = React.createContext({
  recipes: [],
  selected: [],
  units: [],
  addToSelected: () => {},
  removeFromSelected: () => {},
  addRecipe: () => {},
  addIngredients: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  user: {},
  setUser: () => {},
  loadUserRecipes: () => {}
});

export default AppContext;
