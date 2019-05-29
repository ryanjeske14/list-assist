export default {
  recipes: [
    {
      id: 1,
      name: "First Recipe",
      instructions: "Recipe 1 instructions... First cook this, then cook that."
    },
    {
      id: 2,
      name: "Second Recipe",
      instructions: "Recipe 2 instructions... First cook this, then cook that."
    },
    {
      id: 3,
      name: "Third Recipe",
      instructions: "Recipe 3 instructions... First cook this, then cook that."
    }
  ],
  recipeIngredients: [
    {
      id: 1,
      name: "cheese",
      unitOfMeasurement: "cups",
      quantity: 1 / 4,
      recipeId: 3
    },
    {
      id: 2,
      name: "bread",
      unitOfMeasurement: "slices",
      quantity: 2,
      recipeId: 3
    },
    {
      id: 3,
      name: "salt",
      unitOfMeasurement: "tsp",
      quantity: 2,
      recipeId: 3
    },
    {
      id: 4,
      name: "salt",
      unitOfMeasurement: "tsp",
      quantity: 1,
      recipeId: 2
    },
    {
      id: 1,
      name: "milk",
      unitOfMeasurement: "cups",
      quantity: 2,
      recipeId: 2
    },
    {
      id: 5,
      name: "eggs",
      unitOfMeasurement: "",
      quantity: 2,
      recipeId: 1
    },
    {
      id: 6,
      name: "oregano",
      unitOfMeasurement: "TBSP",
      quantity: 1 / 4,
      recipeId: 1
    },
    {
      id: 7,
      name: "cheese",
      unitOfMeasurement: "cups",
      quantity: 1 / 4,
      recipeId: 1
    }
  ]
};
