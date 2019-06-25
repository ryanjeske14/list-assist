import React, { Component } from "react";
import AppContext from "../../AppContext";
import "./EditRecipePage.css";
import ValidationError from "../../components/ValidationError/ValidationError";
import RecipesApiService from "../../services/recipes-api-service";

export default class EditRecipePage extends Component {
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
      ingredientsToDelete: [],
      nameValid: true,
      descriptionValid: true,
      instructionsValid: true,
      quantityValid: true,
      formValid: true,
      validationMessages: {
        name: "",
        description: "",
        instructions: "",
        quantity: ""
      }
    };
  }

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    RecipesApiService.getRecipe(recipeId).then(recipe => {
      this.setState({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients,
        ingredientsToDelete: recipe.ingredients,
        owner_id: recipe.owner_id
      });
    });
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
    const { ingredients } = this.state;
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
          maxLength="60"
        />
        {/* <label htmlFor="quantity">Quantity</label> */}
        <input
          placeholder="Quantity"
          id="quantity"
          name="quantity"
          value={el.quantity || ""}
          onChange={e => this.handleChange(e, i)}
          required
          maxLength="10"
        />
        {/* <label htmlFor="unit_id">Unit</label> */}
        <select
          name="unit_id"
          id="unit_id"
          value={el.unit_id || ""}
          onChange={e => this.handleChange(e, i)}
        >
          {units.sort(this.sortUnits).map(unit => (
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
          maxLength="30"
          value={el.special_instructions || ""}
          onChange={e => this.handleChange(e, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={e => this.removeClick(e, i)}
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
    const { ingredientsToDelete } = this.state;
    const { units } = this.context;

    ingredients.forEach(ingredient => {
      ingredient.name = ingredient.name.trim();
      ingredient.unit_id = Number(ingredient.unit_id);
      ingredient.unit = units.find(unit => unit.id === ingredient.unit_id).name;
      ingredient.quantity = new Fraction(ingredient.quantity).toFraction(true);
      if (ingredient.special_instructions)
        ingredient.special_instructions = ingredient.special_instructions.trim();
    });

    const recipe = (({ id, name, description, instructions, owner_id }) => ({
      id,
      name,
      description,
      instructions,
      owner_id
    }))(this.state);
    recipe.ingredients = ingredients;

    this.context.editRecipe(recipe, ingredientsToDelete);

    this.props.history.push("/recipes");
  };

  render() {
    const { name, description, instructions } = this.state;
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
            value={name}
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
            value={description}
          />
          <ValidationError
            hasError={!this.state.descriptionValid}
            message={this.state.validationMessages.description}
          />
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            onChange={e => this.updateInstructions(e.target.value)}
            minLength="3"
            maxLength="4000"
            value={instructions}
          />
          <ValidationError
            hasError={!this.state.instructionsValid}
            message={this.state.validationMessages.instructions}
          />
          <label>Ingredients</label>
          {this.ingredientsInputs()}
          <ValidationError
            hasError={!this.state.quantityValid}
            message={this.state.validationMessages.quantity}
          />
          <input type="button" value="Add Ingredient" onClick={this.addClick} />
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.formValid}
          />
        </form>
      </section>
    );
  }
}
