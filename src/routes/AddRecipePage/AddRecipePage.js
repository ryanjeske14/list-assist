import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./AddRecipePage.css";
import ValidationError from "../../components/ValidationError/ValidationError";

export default class AddRecipePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      instructions: "",
      ingredients: [
        { name: "", quantity: null, unit_id: "", special_instructions: "" }
      ],
      nameValid: false,
      descriptionValid: false,
      instructionsValid: false,
      quantityValid: false,
      formValid: false,
      validationMessages: {
        name: "",
        // description: "",
        // instructions: "",
        quantity: ""
      }
    };
  }

  addClick = () => {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        { name: "", quantity: null, unit_id: "" }
      ]
    }));
  };

  removeClick = i => {
    let ingredients = [...this.state.ingredients];
    ingredients.splice(i, 1);
    this.setState({ ingredients });
  };

  createUI() {
    const { units = [] } = this.context;
    return this.state.ingredients.map((el, i) => (
      <div key={i}>
        {/* <label htmlFor="name">Ingredient</label> */}
        <input
          placeholder="Ingredient"
          id="name"
          name="name"
          value={el.name || ""}
          onChange={e => this.handleChange(e, i)}
          required
        />
        {/* <label htmlFor="quantity">Quantity</label> */}
        <input
          placeholder="Quantity"
          id="quantity"
          name="quantity"
          value={el.quantity || ""}
          onChange={e => this.handleChange(e, i)}
          required
        />
        {/* <label htmlFor="unit_id">Unit</label> */}
        <select
          name="unit_id"
          id="unit_id"
          //value={el.unit || ""}
          onChange={e => this.handleChange(e, i)}
        >
          {units.map(unit => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
        {/* <label htmlFor="special_instructions">Special Instructions</label> */}
        <input
          placeholder="Special Instructions (e.g., minced)"
          id="special_instructions"
          name="special_instructions"
          value={el.special_instructions || ""}
          onChange={e => this.handleChange(e, i)}
        />
        <input type="button" value="remove" onClick={this.removeClick} />
      </div>
    ));
  }

  handleChange = (e, i) => {
    const { name, value } = e.target;
    let ingredients = [...this.state.ingredients];
    ingredients[i] = { ...ingredients[i], [name]: value };
    this.setState({ ingredients }, () => this.validateIngredients(ingredients));
  };

  // handleChangeQuantity(i, e) {
  //   const { name, value } = e.target;
  //   let ingredients = [...this.state.ingredients];
  //   ingredients[i] = { ...ingredients[i], [name]: value };
  //   this.setState({ ingredients });
  // }

  updatename(name) {
    this.setState({ name }, () => this.validateName(name));
  }

  updateDescription(description) {
    this.setState({ description });
  }

  updateInstructions(instructions) {
    this.setState({ instructions });
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = "Recipe name is required.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError
      },
      this.formValid
    );
  }

  validateIngredients(ingredients) {
    const REGEX_INTEGER_DECIMAL_FRACTION = /^[1-9]+[.]?[0-9]*([/][1-9]+[.]?[0-9]*)*$/;
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    for (let ingredient of ingredients) {
      if (
        !!ingredient.quantity &&
        !REGEX_INTEGER_DECIMAL_FRACTION.test(ingredient.quantity)
      ) {
        fieldErrors.quantity =
          "Quantity must be in the form of an integer, decimal, or fraction";
        hasError = true;
      }
      this.setState(
        {
          validationMessages: fieldErrors,
          quantityValid: !hasError
        },
        this.formValid
      );
    }
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.quantityValid
      // this.state.descriptionValid &&
      // this.state.instructionsValid
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const Fraction = require("fraction.js");
    const ingredients = this.state.ingredients;

    ingredients.forEach(ingredient => {
      ingredient.name = ingredient.name.trim();
      ingredient.unit_id = Number(ingredient.unit_id);
      ingredient.quantity = new Fraction(ingredient.quantity).toFraction(true);
      if (ingredient.special_instructions)
        ingredient.special_instructions = ingredient.special_instructions.trim();
    });

    const recipe = (({ name, description, instructions }) => ({
      name,
      description,
      instructions
    }))(this.state);
    recipe.ingredients = ingredients;

    //console.log(recipe);

    this.context.addRecipe(recipe);

    //console.log(ingredients);

    //this.context.addIngredients(ingredients);

    this.props.history.push("/recipes");
  };

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
          <ValidationError
            hasError={!this.state.nameValid}
            message={this.state.validationMessages.name}
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
          <ValidationError
            hasError={!this.state.quantityValid}
            message={this.state.validationMessages.quantity}
          />
          <input type="button" value="Add Ingredient" onClick={this.addClick} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}
