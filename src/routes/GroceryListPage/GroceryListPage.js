import React, { Component } from "react";
import AppContext from "../../AppContext";

export default class GroceryListPage extends Component {
  static contextType = AppContext;

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
      <section>
        <h1>Grocery List</h1>
        <ul>
          {groceryList.map((grocery, i) => (
            <li key={i}>{grocery}</li>
          ))}
        </ul>
      </section>
    );
  }
}
