import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import "./RecipesList.css";

export default class RecipesList extends Component {
  static contextType = AppContext;

  handleAddToList = recipeId => {
    this.context.addToSelected(recipeId);
    // scroll to bottom  of page when recipe is added to list so users on small screens can see that the list has updated
    const element = document.querySelector(".recipes_page");
    element.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  render() {
    const { recipes } = this.context;
    return (
      <ul className="recipes_list">
        {recipes.map(recipe => (
          <li className="recipe_li" key={recipe.id}>
            <Link className="recipe_link" to={`/recipes/${recipe.id}`}>
              {recipe.name}
            </Link>

            <button
              className="add_recipe_button"
              onClick={() => this.handleAddToList(recipe.id)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
