import React from "react";

const AppContext = React.createContext({
  recipes: [],
  selected: [],
  addToSelected: () => {}
});

export default AppContext;
