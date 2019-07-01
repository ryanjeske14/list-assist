import React, { Component } from "react";
import RecipesList from "../../components/RecipesList/RecipesList";
import SelectedRecipes from "../../components/SelectedRecipes/SelectedRecipes";
import AppContext from "../../AppContext";
import { Link } from "react-router-dom";
import "./RecipesPage.css";

export default class RecipesPage extends Component {
  static contextType = AppContext;

  render() {
    const { selected } = this.context;

    return (
      <section className="recipes_page">
        <div className="select_recipes_div">
          <h2 className="recipes_page_header">
            Select recipes to add to your grocery list:
          </h2>
          <RecipesList />
          <div className="ar_link_div">
            <Link className="add_recipe_link" to={`/add-recipe`}>
              Create Your Own Recipe!
            </Link>
          </div>
        </div>

        <div className="selected_recipes_div">
          <h2 className="recipes_page_header">Selected Recipes:</h2>

          {Object.entries(selected).length !== 0 ? (
            <div>
              <SelectedRecipes className="selected" />

              <div className="gl_link_div">
                <Link className="grocery_list_link" to={`/grocery-list`}>
                  Generate Grocery List
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    );
  }
}
