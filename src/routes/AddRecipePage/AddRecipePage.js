import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./AddRecipePage.css";

export default class AddRecipePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      instructions: "",
      ingredients: [{ name: "", quantity: null, unit: "" }]
      // nameValid: false,
      // descriptionValid: false,
      // instructionsValid: false,
      // validationMessages: {
      //   name: "",
      //   description: "",
      //   instructions: ""
      // }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addClick() {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        { name: "", quantity: null, unit: "" }
      ]
    }));
  }

  removeClick(i) {
    let ingredients = [...this.state.ingredients];
    ingredients.splice(i, 1);
    this.setState({ ingredients });
  }

  createUI() {
    return this.state.ingredients.map((el, i) => (
      <div key={i}>
        <input
          placeholder="Ingredient"
          name="name"
          value={el.name || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          placeholder="Unit"
          name="unit"
          value={el.unit || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          placeholder="Quantity"
          name="quantity"
          value={el.quantity || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let ingredients = [...this.state.ingredients];
    ingredients[i] = { ...ingredients[i], [name]: value };
    this.setState({ ingredients });
  }

  updatename(name) {
    this.setState({ name });
  }

  updateDescription(description) {
    this.setState({ description });
  }

  updateInstructions(instructions) {
    this.setState({ instructions });
  }

  // validateName(fieldValue) {
  //   const fieldErrors = { ...this.state.validationMessages };
  //   let hasError = false;

  //   fieldValue = fieldValue.trim();
  //   if (fieldValue.length === 0) {
  //     fieldErrors.note = "Recipe name is required.";
  //     hasError = true;
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    const Fraction = require("fraction.js");
    const ingredients = this.state.ingredients;
    const recipeId = Math.floor(Math.random() * 10000000);

    ingredients.forEach(ingredient => {
      ingredient.id = Math.floor(Math.random() * 10000000);
      ingredient.quantity = new Fraction(ingredient.quantity).toFraction(true);
      ingredient.recipeId = recipeId;
    });

    const recipe = (({ name, description, instructions }) => ({
      name,
      description,
      instructions
    }))(this.state);
    recipe.id = recipeId;
    recipe.ingredients = ingredients;

    //console.log(recipe);

    this.context.addRecipe(recipe);

    //console.log(ingredients);

    //this.context.addIngredients(ingredients);

    this.props.history.push("/recipes");
  }

  render() {
    return (
      <section>
        <h2>Add your recipe using the form below:</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="recipe-name-input">Recipe Name</label>
          <input
            type="text"
            id="recipe-name-input"
            onChange={e => this.updatename(e.target.value)}
            minLength="3"
            maxLength="60"
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            onChange={e => this.updateDescription(e.target.value)}
            minLength="3"
            maxLength="400"
          />
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            onChange={e => this.updateInstructions(e.target.value)}
            minLength="3"
            maxLength="4000"
          />
          <label>Ingredients</label>
          {this.createUI()}
          <input
            type="button"
            value="Add Ingredient"
            onClick={this.addClick.bind(this)}
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}
