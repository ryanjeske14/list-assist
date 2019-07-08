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

  // callback function to add new set of ingredient inputs
  addClick = () => {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        { name: "", quantity: null, unit_id: 1, special_instructions: "" }
      ]
    }));
  };

  // callback function to remove ingredient from recipe form
  removeClick = (e, i) => {
    let ingredients = [...this.state.ingredients];
    if (ingredients.length > 1) {
      ingredients.splice(i, 1);
      this.setState({ ingredients });
    } else alert("Must have at least one ingredient.");
  };

  // sorts units alphabetically for <select> units dropdown
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

  // creates UI for ingredients section of recipe form
  renderIngredientsInputs() {
    const { units = [] } = this.context;
    return this.state.ingredients.map((el, i) => (
      <div className="ingredient_inputs" key={i}>
        <p className="ingredient_number">Ingredient {i + 1}</p>
        <input
          placeholder="Ingredient"
          id="name"
          name="name"
          value={el.name || ""}
          onChange={e => this.handleChangeIngredients(e, i)}
          required
          maxLength="60"
          className="ingredient_input"
        />
        <input
          placeholder="Quantity"
          id="quantity"
          name="quantity"
          value={el.quantity || ""}
          onChange={e => this.handleChangeIngredients(e, i)}
          required
          maxLength="10"
          className="ingredient_input"
        />
        <select
          name="unit_id"
          id="unit_id"
          onChange={e => this.handleChangeIngredients(e, i)}
          className="ingredient_input"
          required
        >
          <option className="unit_placeholder" value="" hidden>
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
          onChange={e => this.handleChangeIngredients(e, i)}
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

  // updates state of ingredients in controlled form whenever a value is changed
  handleChangeIngredients = (e, i) => {
    const { name, value } = e.target;
    let ingredients = [...this.state.ingredients];
    ingredients[i] = { ...ingredients[i], [name]: value };
    this.setState({ ingredients }, () => this.validateIngredients(ingredients));
  };

  // recipe name change handler that then calls validateName()
  updatename(name) {
    this.setState({ name }, () => this.validateName(name));
  }

  // recipe description change handler that then calls validateDescription()
  updateDescription(description) {
    this.setState({ description }, () => this.validateDescription(description));
  }

  // recipe instructions change handler that then calls validateInstructions()
  updateInstructions(instructions) {
    this.setState({ instructions }, () =>
      this.validateInstructions(instructions)
    );
  }

  // recipe name validation
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

  // recipe description validation
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

  // recipe instructions validation
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

  // ingredients validation
  validateIngredients(ingredients) {
    // test quantity value vs REGEX to restrict format of numbers entered
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

  // check if form is valid based on input validations
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

    // reformat ingredient inputs to ensure clean input values are passed to server to be stored in DB
    ingredients.forEach(ingredient => {
      ingredient.name = ingredient.name.trim();
      ingredient.unit_id = Number(ingredient.unit_id);
      // used Fraction.js library from NPM to handle fraction and decimal values
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
            <label htmlFor="recipe-name-input" className="form_label">
              Recipe Name <Required />
            </label>
            <input
              type="text"
              id="recipe-name-input"
              onChange={e => this.updatename(e.target.value)}
              minLength="3"
              maxLength="60"
              required
              className="recipe_name recipe_input"
            />{" "}
            {/* displays validation error if input is invalid */}
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
            <label htmlFor="description" className="form_label">
              Description <Required />
            </label>
            <textarea
              id="description"
              onChange={e => this.updateDescription(e.target.value)}
              minLength="3"
              maxLength="1500"
              className="description recipe_input"
            />
            <ValidationError
              hasError={!this.state.descriptionValid}
              message={this.state.validationMessages.description}
            />
            <label htmlFor="instructions" className="form_label">
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
            <label className="form_label">Ingredients</label>
            <div className="ingredients_section">
              {this.renderIngredientsInputs()}
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
