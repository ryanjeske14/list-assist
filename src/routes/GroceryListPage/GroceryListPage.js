import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./GroceryListPage.css";

export default class GroceryListPage extends Component {
  static contextType = AppContext;

  handleClickBack = () => {
    this.props.history.push("/recipes");
  };

  render() {
    // used Fraction.js library to handle fraction and decimal values
    const Fraction = require("fraction.js");
    const { recipes, selected } = this.context;

    // use Map data structure to consolidate common ingredients based on ingredient name and unit
    const map = new Map();

    for (const recipe of recipes) {
      /* loop through all recipes, and for each recipe, if its ID matches a key in the selected object,
      set recipeQuantity to the value from the selected object */

      if (selected[recipe.id] != null) {
        const recipeQuantity = selected[recipe.id];
        /* loop through the ingredients of each recipe */
        for (const ingredient of recipe.ingredients) {
          // set variable 'key' equal to concatenated ingredient unit and name
          const key = `${ingredient.unit} ${ingredient.name}`.toLowerCase();
          // if key already exists in map, assign its value to oldValue, else set oldValue to 0 (initial ingredient quantity)
          const oldValue = map.get(key) || 0;
          // set newValue to recipe quantity * ingredient quantity + oldV value for that key, then convert value to rounded fraction
          const newValue = new Fraction(recipeQuantity)
            .mul(ingredient.quantity)
            .add(oldValue)
            .simplify()
            .toFraction(true);
          // set key/value pair in map for ingredient
          map.set(key, newValue);
        }
      }
    }

    let groceryList = [];

    // push key/value pairs from map into groceryList array to be rendered in <ul> element below
    for (const [key, value] of map.entries()) {
      groceryList.push(`${value} ${key}`);
    }

    return (
      <section className="grocery_list_section">
        <h1 className="grocery_list_header">Grocery List</h1>
        <ul className="grocery_list">
          {groceryList.map((grocery, i) => (
            <li className="grocery_li" key={i}>
              {grocery}
            </li>
          ))}
        </ul>
        <div>
          <button
            className="back_to_recipes_button"
            onClick={() => this.handleClickBack()}
          >
            Back to Recipes
          </button>
        </div>
      </section>
    );
  }
}
