const recipes = [
  {
    id: 1,
    name: "First Recipe",
    description: "Very Tasty 1",
    instructions: "Recipe 1 instructions... First cook this, then cook that."
  },
  {
    id: 2,
    name: "Second Recipe",
    description: "Very Tasty 2",
    instructions: "Recipe 2 instructions... First cook this, then cook that."
  },
  {
    id: 3,
    name: "Third Recipe",
    description: "Very Tasty 3",
    instructions: "Recipe 3 instructions... First cook this, then cook that."
  }
];

const recipeIngredients = [
  {
    id: 1,
    name: "cheese",
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
  },
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
  },
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
];

const selected = {
  1: 5,
  2: 4,
  3: 2
};

function addIngredientstoRecipe(recipes, recipeIngredients) {
  for (recipe of recipes) {
    recipe.ingredients = [];
    for (ingredient of recipeIngredients) {
      if (ingredient.recipeId === recipe.id) {
        recipe.ingredients.push(ingredient);
      }
    }
  }
}

addIngredientstoRecipe(recipes, recipeIngredients);

const map = new Map();

for (recipe of recipes) {
  if (selected[recipe.id] != null) {
    recipeQuantity = selected[recipe.id];
    for (ingredient of recipe.ingredients) {
      const key = `${ingredient.name}\n${ingredient.unit}`;
      const oldValue = map.get(key) || 0;
      map.set(key, recipeQuantity * ingredient.quantity + oldValue);
    }
  }
}

console.log(map);
