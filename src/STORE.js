export default {
  recipes: [
    {
      id: 1,
      name: "First Recipe",
      description: "Very Tasty 1",
      instructions: "Recipe 1 instructions... First cook this, then cook that.",
      ingredients: [
        {
          id: 5,
          name: "eggs",
          unit: "",
          quantity: 2,
          recipeId: 1
        },
        {
          id: 6,
          name: "oregano",
          unit: "TBSP",
          quantity: 1 / 4,
          recipeId: 1
        },
        {
          id: 7,
          name: "cheese",
          unit: "cups",
          quantity: 1 / 4,
          recipeId: 1
        }
      ]
    },
    {
      id: 2,
      name: "Second Recipe",
      description: "Very Tasty 2",
      instructions: "Recipe 2 instructions... First cook this, then cook that.",
      ingredients: [
        {
          id: 4,
          name: "salt",
          unit: "tsp",
          quantity: 1,
          recipeId: 2
        },
        {
          id: 1,
          name: "milk",
          unit: "cups",
          quantity: 2,
          recipeId: 2
        }
      ]
    },
    {
      id: 3,
      name: "Third Recipe",
      description: "Very Tasty 3",
      instructions: "Recipe 3 instructions... First cook this, then cook that.",
      ingredients: [
        {
          id: 1,
          name: "CHEESE",
          unit: "cups",
          quantity: 1 / 4,
          recipeId: 3
        },
        {
          id: 2,
          name: "bread",
          unit: "slices",
          quantity: 2,
          recipeId: 3
        },
        {
          id: 3,
          name: "salt",
          unit: "tsp",
          quantity: 2,
          recipeId: 3
        }
      ]
    }
  ]
  // recipeIngredients: [
  //   {
  //     id: 1,
  //     name: "cheese",
  //     unit: "cups",
  //     quantity: 1 / 4,
  //     recipeId: 3
  //   },
  //   {
  //     id: 2,
  //     name: "bread",
  //     unit: "slices",
  //     quantity: 2,
  //     recipeId: 3
  //   },
  //   {
  //     id: 3,
  //     name: "salt",
  //     unit: "tsp",
  //     quantity: 2,
  //     recipeId: 3
  //   },
  //   {
  //     id: 4,
  //     name: "salt",
  //     unit: "tsp",
  //     quantity: 1,
  //     recipeId: 2
  //   },
  //   {
  //     id: 1,
  //     name: "milk",
  //     unit: "cups",
  //     quantity: 2,
  //     recipeId: 2
  //   },
  //   {
  //     id: 5,
  //     name: "eggs",
  //     unit: "",
  //     quantity: 2,
  //     recipeId: 1
  //   },
  //   {
  //     id: 6,
  //     name: "oregano",
  //     unit: "TBSP",
  //     quantity: 1 / 4,
  //     recipeId: 1
  //   },
  //   {
  //     id: 7,
  //     name: "cheese",
  //     unit: "cups",
  //     quantity: 1 / 4,
  //     recipeId: 1
  //   }
  // ]
};
