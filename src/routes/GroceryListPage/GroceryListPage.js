import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./GroceryListPage.css";

export default class GroceryListPage extends Component {
  static contextType = AppContext;

  handleClickBack = () => {
    this.props.history.push("/recipes");
  };

  render() {
    const Fraction = require("fraction.js");
    const { recipes, selected } = this.context;

    const map = new Map();

    for (const recipe of recipes) {
      if (selected[recipe.id] != null) {
        const recipeQuantity = selected[recipe.id];
        for (const ingredient of recipe.ingredients) {
          const key = `${ingredient.unit} ${ingredient.name}`.toLowerCase();
          const oldValue = map.get(key) || 0;
          const newValue = new Fraction(recipeQuantity)
            .mul(ingredient.quantity)
            .add(oldValue)
            .toFraction(true);
          map.set(key, newValue);
        }
      }
    }

    let groceryList = [];

    for (const [key, value] of map.entries()) {
      groceryList.push(`${value} ${key}`);
    }

    console.log(map);

    return (
      <section className="grocery_list_section">
        <h1>Grocery List</h1>
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
