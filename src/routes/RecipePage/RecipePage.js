import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import { findRecipe } from "../../function-helpers";
import "./RecipePage.css";

export default class RecipePage extends Component {
  static contextType = AppContext;

  handleClickBack = () => {
    this.props.history.push("/recipes");
  };

  handleClickDelete = event => {
    event.preventDefault();

    const { recipeId } = this.props.match.params;

    this.context.deleteRecipe(parseInt(recipeId));

    this.props.history.push("/recipes");
  };

  render() {
    const Fraction = require("fraction.js");
    const { recipes } = this.context;
    const { recipeId } = this.props.match.params;
    const recipe = findRecipe(recipes, recipeId) || {};
    const recipeDescription = recipe.description || "";
    const recipeInstructions = recipe.instructions || "";
    const ingredients = recipe.ingredients || [];

    return (
      <section className="recipe_section">
        <h1 className="recipe_name">{recipe.name}</h1>
        <h3>Description:</h3>
        <div className="recipe_description">
          {recipeDescription.split("\n").map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
        <h3>Ingredients:</h3>
        <ul className="ingredients_list">
          {ingredients.map((ingredient, i) => (
            <li key={i}>
              {new Fraction(ingredient.quantity).simplify().toFraction(true)}{" "}
              {ingredient.unit} {ingredient.name}
              {ingredient.special_instructions ? ", " : ""}
              {ingredient.special_instructions}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <div className="recipe_instructions">
          {recipeInstructions.split("\n").map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
        <div className="recipe_buttons">
          {this.context.user.id === recipe.owner_id ? (
            <Link className="edit_recipe_link" to={`/edit-recipe/${recipe.id}`}>
              Edit Recipe
            </Link>
          ) : (
            <></>
          )}
          {this.context.user.id === recipe.owner_id ? (
            <button className="recipe_button" onClick={this.handleClickDelete}>
              Delete Recipe
            </button>
          ) : (
            <></>
          )}
          <button
            className="recipe_button back_to_recipes"
            onClick={this.handleClickBack}
          >
            Back to Recipes
          </button>
        </div>
      </section>
    );
  }
}
