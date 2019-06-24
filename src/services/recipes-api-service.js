import TokenService from "./token-service";
import config from "../config";

const RecipesApiService = {
  getRecipes(userId) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      headers: { userId: userId }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getRecipe(recipeId) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
      headers: {}
    }).then(res => {
      if (!res.ok) return res.json().then(error => Promise.reject(error));

      return res.json();
    });
  },

  getUnits() {
    return fetch(`${config.API_ENDPOINT}/units`, {
      headers: {}
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

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

  deleteRecipe(id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  },

  editRecipe(recipe) {
    return fetch(`${config.API_ENDPOINT}/recipes/${recipe.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        recipe
      })
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default RecipesApiService;
