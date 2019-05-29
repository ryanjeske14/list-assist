import React, { Component } from "react";
import AppContext from "../../AppContext";

export default class RecipesList extends Component {
  static contextType = AppContext;

  handleClick = recipeId => {
    this.context.addToSelected(recipeId);
  };

  render() {
    const { recipes } = this.context;
    return (
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            {recipe.name}
            <button onClick={() => this.handleClick(recipe.id)}>
              Add to List
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
