import React, { Component } from "react";
import AppContext from "../../AppContext";
import { findRecipe, findIngredients } from "../../function-helpers";

export default class RecipePage extends Component {
  static contextType = AppContext;

  render() {
    const { recipes, recipeIngredients } = this.context;
    const { recipeId } = this.props.match.params;
    const recipe = findRecipe(recipes, recipeId) || {};
    const ingredients = findIngredients(recipeIngredients, recipeId);

    return (
      <section>
        <h2>{recipe.name}</h2>
        <h3>Description:</h3>
        <p>{recipe.description}</p>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}{" "}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
      </section>
    );
  }
}
