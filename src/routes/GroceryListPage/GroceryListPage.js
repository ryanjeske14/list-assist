import React, { Component } from "react";
import AppContext from "../../AppContext";

export default class GroceryListPage extends Component {
  static contextType = AppContext;

  render() {
    return <p>GroceryListPage</p>;
  }
}
