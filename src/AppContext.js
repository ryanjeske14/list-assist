import React from "react";

const AppContext = React.createContext({
  recipes: [],
  selected: [],
  units: [],
  addToSelected: () => {},
  removeFromSelected: () => {},
  addRecipe: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  user: {},
  setUser: () => {},
  loadUserRecipes: () => {},
  deleteRecipe: () => {}
});

export default AppContext;
