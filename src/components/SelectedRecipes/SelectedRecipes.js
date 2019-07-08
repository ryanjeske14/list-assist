import React, { Component } from "react";
import AppContext from "../../AppContext";
import { findSelected } from "../../function-helpers";
import "./SelectedRecipes.css";

export default class SelectedRecipes extends Component {
  static contextType = AppContext;

  // calls function when + sign is clicked to update recipe quantity
  handleAddToList = recipeId => {
    this.context.addToSelected(recipeId);
  };

  // calls function when - sign is clicked to update recipe quantity
  handleRemoveFromList = recipeId => {
    this.context.removeFromSelected(recipeId);
  };

  render() {
    const { recipes, selected } = this.context;
    const selectedRecipes = findSelected(recipes, selected);

    return (
      <ul className="selected_list">
        {selectedRecipes.map(recipe => (
          <li className="selected_li" key={recipe.id}>
            <p className="recipe_name_qty">
              {recipe.name} &nbsp; x {recipe.quantity}
            </p>
            <div className="recipe_select_buttons">
              <button
                className="add_selected_button"
                onClick={() => this.handleAddToList(recipe.id)}
              >
                +
              </button>
              <button
                className="remove_selected_button"
                onClick={() => this.handleRemoveFromList(recipe.id)}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
