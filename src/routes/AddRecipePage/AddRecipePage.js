import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./AddRecipePage.css";
import ValidationError from "../../components/ValidationError/ValidationError";
import { Required } from "../../components/Utils/Utils";

export default class AddRecipePage extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      instructions: "",
      ingredients: [
        { name: "", quantity: null, unit_id: 1, special_instructions: "" }
      ],
      nameValid: false,
      descriptionValid: false,
      instructionsValid: false,
      quantityValid: false,
      formValid: false,
      validationMessages: {
        name: "",
        description: "",
        instructions: "",
        quantity: ""
      }
    };
  }

  addClick = () => {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        { name: "", quantity: null, unit_id: 1, special_instructions: "" }
      ]
    }));
  };

  removeClick = (e, i) => {
    let ingredients = [...this.state.ingredients];
    if (ingredients.length > 1) {
      ingredients.splice(i, 1);
      this.setState({ ingredients });
    } else alert("Must have at least one ingredient.");
  };

  sortUnits = (a, b) => {
    const unitA = a.name.toUpperCase();
    const unitB = b.name.toUpperCase();

    let comparison = 0;
    if (unitA > unitB) {
      comparison = 1;
    } else if (unitA < unitB) {
      comparison = -1;
    }
    return comparison;
  };

  ingredientsInputs() {
    const { units = [] } = this.context;
    return this.state.ingredients.map((el, i) => (
      <div className="ingredient_inputs" key={i}>
        <p className="ingredient_number">Ingredient {i + 1}</p>
        <input
          placeholder="Ingredient"
          id="name"
          name="name"
          value={el.name || ""}
          onChange={e => this.handleChange(e, i)}
          required
          maxLength="60"
          className="ingredient_input"
        />
        <input
          placeholder="Quantity"
          id="quantity"
          name="quantity"
          value={el.quantity || ""}
          onChange={e => this.handleChange(e, i)}
          required
          maxLength="10"
          className="ingredient_input"
        />
        <select
          name="unit_id"
          id="unit_id"
          onChange={e => this.handleChange(e, i)}
          className="ingredient_input"
          required
        >
          <option
            className="unit_placeholder"
            value=""
            selected
            disabled
            hidden
          >
            Unit
          </option>
          {units.sort(this.sortUnits).map(unit => (
            <option className="unit_option" key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Special Instructions (e.g., minced)"
          id="special_instructions"
          name="special_instructions"
          maxLength="30"
          value={el.special_instructions || ""}
          onChange={e => this.handleChange(e, i)}
          className="ingredient_input"
        />
        <input
          type="button"
          value="Delete"
          onClick={e => this.removeClick(e, i)}
          className="remove_ingredient_button"
        />
      </div>
    ));
  }

  handleChange = (e, i) => {
    const { name, value } = e.target;
    let ingredients = [...this.state.ingredients];
    ingredients[i] = { ...ingredients[i], [name]: value };
    this.setState({ ingredients }, () => this.validateIngredients(ingredients));
  };

  updatename(name) {
    this.setState({ name }, () => this.validateName(name));
  }

  updateDescription(description) {
    this.setState({ description }, () => this.validateDescription(description));
  }

  updateInstructions(instructions) {
    this.setState({ instructions }, () =>
      this.validateInstructions(instructions)
    );
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 3) {
      fieldErrors.name = "Recipe name must be at least 3 characters long.";
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

  validateDescription(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 3) {
      fieldErrors.description =
        "Description must be at least 3 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        descriptionValid: !hasError
      },
      this.formValid
    );
  }

  validateInstructions(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length < 3) {
      fieldErrors.instructions =
        "Instructions must be at least 3 characters long.";
      hasError = true;
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        instructionsValid: !hasError
      },
      this.formValid
    );
  }

  validateIngredients(ingredients) {
    const REGEX_INTEGER_DECIMAL_FRACTION = /^[0-9]+[.]?[0-9]*([/][1-9]+[.]?[0-9]*)*$/;
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    for (let ingredient of ingredients) {
      if (
        !!ingredient.quantity &&
        !REGEX_INTEGER_DECIMAL_FRACTION.test(ingredient.quantity)
      ) {
        fieldErrors.quantity =
          "Quantity must be in the form of a postive integer, decimal, or fraction.";
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
      formValid:
        this.state.nameValid &&
        this.state.quantityValid &&
        this.state.descriptionValid &&
        this.state.instructionsValid
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

    this.context.addRecipe(recipe);

    this.props.history.push("/recipes");
  };

  render() {
    return (
      <section>
        <h2>Add your recipe using the form below:</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="recipe_inputs">
            <label htmlFor="recipe-name-input">
              Recipe Name <Required />
            </label>
            <input
              type="text"
              id="recipe-name-input"
              onChange={e => this.updatename(e.target.value)}
              minLength="3"
              maxLength="42"
              required
              className="recipe_name recipe_input"
            />{" "}
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
            <label htmlFor="description">
              Description <Required />
            </label>
            <textarea
              id="description"
              onChange={e => this.updateDescription(e.target.value)}
              minLength="3"
              maxLength="400"
              className="description recipe_input"
            />
            <ValidationError
              hasError={!this.state.descriptionValid}
              message={this.state.validationMessages.description}
            />
            <label htmlFor="instructions">
              Instructions <Required />
            </label>
            <textarea
              id="instructions"
              onChange={e => this.updateInstructions(e.target.value)}
              minLength="3"
              maxLength="4000"
              className="instructions recipe_input"
            />
            <ValidationError
              hasError={!this.state.instructionsValid}
              message={this.state.validationMessages.instructions}
            />
            <label>Ingredients</label>
            <div className="ingredients_section">
              {this.ingredientsInputs()}
              <ValidationError
                hasError={!this.state.quantityValid}
                message={this.state.validationMessages.quantity}
              />
            </div>
            <input
              type="button"
              value="Add Ingredient"
              onClick={this.addClick}
              className="add_ingredient_button"
            />
          </div>
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.formValid}
            className="submit_button"
          />
        </form>
      </section>
    );
  }
}
