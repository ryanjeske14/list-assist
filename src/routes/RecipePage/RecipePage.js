import React, { Component } from "react";
import AppContext from "../../AppContext";
import { findRecipe } from "../../function-helpers";

export default class RecipePage extends Component {
  static contextType = AppContext;

  handleClickBack = () => {
    this.props.history.push("/recipes");
  };

  handleClickDelete = event => {
    event.preventDefault();

    const { recipeId } = this.props.match.params;

    this.context.deleteRecipe(recipeId);
    this.props.history.push("/recipes");
  };

  render() {
    const Fraction = require("fraction.js");
    const { recipes } = this.context;
    const { recipeId } = this.props.match.params;
    const recipe = findRecipe(recipes, recipeId) || {};
    const ingredients = recipe.ingredients || [];

    return (
      <section>
        <h2>{recipe.name}</h2>
        <h3>Description:</h3>
        <p>{recipe.description}</p>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map(ingredient => (
            <li key={ingredient.id}>
              {new Fraction(ingredient.quantity).toFraction(true)}{" "}
              {ingredient.unit} {ingredient.name}
              {ingredient.special_instructions ? ", " : ""}
              {ingredient.special_instructions}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
        {this.context.user.id === recipe.owner_id ? (
          <button onClick={this.handleClickDelete}>Delete Recipe</button>
        ) : (
          <></>
        )}
        <button onClick={this.handleClickBack}>Back to Recipes</button>
      </section>
    );
  }
}
