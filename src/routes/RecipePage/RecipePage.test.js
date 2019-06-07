import React from "react";
import ReactDOM from "react-dom";
import RecipePage from "./RecipePage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    }
  };
  ReactDOM.render(<RecipePage {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
