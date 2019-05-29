import React, { Component } from "react";
import App from "../App/App";
import AppContext from "../../AppContext";
import { findSelected } from "../../function-helpers";

export default class SelectedRecipes extends Component {
  static contextType = AppContext;

  render() {
    const { recipes, selected } = this.context;
    const selectedRecipes = findSelected(recipes, selected);

    return (
      <ul>
        {selectedRecipes.map(recipe => (
          <li>
            {recipe.name} x {recipe.quantity}
          </li>
        ))}
      </ul>
    );
  }
}
