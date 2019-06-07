import React from "react";
import ReactDOM from "react-dom";
import SelectedRecipes from "./SelectedRecipes";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SelectedRecipes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
