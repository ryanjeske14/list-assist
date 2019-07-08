import TokenService from "./token-service";
import config from "../config";

const RecipesApiService = {
  // fetch request to get default recipes and recipes for current user
  getRecipes(userId) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      headers: { userId: userId }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  // fetch request to get recipe data for specific recipe
  getRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      headers: {}
    }).then(res => {
      if (!res.ok) return res.json().then(error => Promise.reject(error));

      return res.json();
    });
  },

  // fetch request to get list of units
  getUnits() {
    return fetch(`${config.API_ENDPOINT}/units`, {
      headers: {}
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  // post request to insert new recipe in database
  postRecipe(recipe) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        recipe
      })
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  // delete request to delete recipe from database
  deleteRecipe(id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  },

  // patch request to edit recipe in database
  editRecipe(recipe, ingredientsToDelete) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        recipe,
        ingredientsToDelete
      })
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default RecipesApiService;
