import React from "react";
import ReactDOM from "react-dom";
import GroceryListPage from "./GroceryListPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GroceryListPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
