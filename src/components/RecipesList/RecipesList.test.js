import React from "react";
import ReactDOM from "react-dom";
import RecipesList from "./RecipesList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RecipesList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
