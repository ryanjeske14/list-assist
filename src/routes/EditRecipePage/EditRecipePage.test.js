import React from "react";
import ReactDOM from "react-dom";
import EditRecipePage from "./EditRecipePage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    }
  };

  ReactDOM.render(<EditRecipePage {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
