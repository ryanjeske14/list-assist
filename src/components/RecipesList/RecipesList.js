import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import "./RecipesList.css";

export default class RecipesList extends Component {
  static contextType = AppContext;

  handleAddToList = recipeId => {
    this.context.addToSelected(recipeId);
  };

  handleRemoveFromList = recipeId => {
    this.context.removeFromSelected(recipeId);
  };

  render() {
    const { recipes } = this.context;
    return (
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            <button onClick={() => this.handleAddToList(recipe.id)}>+</button>
            <button onClick={() => this.handleRemoveFromList(recipe.id)}>
              -
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
