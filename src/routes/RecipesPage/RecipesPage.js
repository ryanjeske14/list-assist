import React, { Component } from "react";
import RecipesList from "../../components/RecipesList/RecipesList";
import SelectedRecipes from "../../components/SelectedRecipes/SelectedRecipes";

export default class RecipesPage extends Component {
  render() {
    return (
      <section>
        <h2>Select your recipes!</h2>
        <RecipesList />

        <h2>Your Recipes</h2>
        <SelectedRecipes />
      </section>
    );
  }
}
