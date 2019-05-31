import React, { Component } from "react";
import RecipesList from "../../components/RecipesList/RecipesList";
import SelectedRecipes from "../../components/SelectedRecipes/SelectedRecipes";
import { Link } from "react-router-dom";

export default class RecipesPage extends Component {
  render() {
    return (
      <section>
        <h2>Select your recipes!</h2>
        <RecipesList />
        <Link to={`/add-recipe`}>Add Your Own Recipe!</Link>

        <h2>Your Recipes</h2>
        <SelectedRecipes />
      </section>
    );
  }
}
