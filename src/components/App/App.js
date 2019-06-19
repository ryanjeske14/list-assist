import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//import ErrorBoundary from "../ErrorBoundary";
import LandingPage from "../../routes/LandingPage/LandingPage";
import RecipesPage from "../../routes/RecipesPage/RecipesPage";
import RecipePage from "../../routes/RecipePage/RecipePage";
import GroceryListPage from "../../routes/GroceryListPage/GroceryListPage";
import AddRecipePage from "../../routes/AddRecipePage/AddRecipePage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import AppContext from "../../AppContext";
import STORE from "../../STORE";
import Header from "../Header/Header";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import RecipesApiService from "../../services/recipes-api-service";

class App extends Component {
  state = {
    recipes: [],
    selected: {},
    units: []
    //recipeIngredients: []
  };

  handleAddToSelected = recipeId => {
    const selected = { ...this.state.selected };
    selected[recipeId] = selected[recipeId] + 1 || 1;
    this.setState({
      selected
    });
  };

  handleRemoveFromSelected = recipeId => {
    const selected = { ...this.state.selected };
    if (selected[recipeId]) {
      if (selected[recipeId] >= 2) {
        selected[recipeId]--;
      } else {
        delete selected[recipeId];
      }
    }
    this.setState({
      selected
    });
  };

  handleAddRecipe = recipe => {
    console.log(recipe);
    RecipesApiService.postRecipe(recipe).then(recipe =>
      this.setState({
        recipes: [...this.state.recipes, recipe]
      })
    );
  };

  // handleAddIngredients = ingredients => {
  //   console.log(ingredients);
  //   const recipeIngredients = [...this.state.recipeIngredients];
  //   console.log(recipeIngredients);
  //   for (const ingredient of ingredients) {
  //     recipeIngredients.push(ingredient);
  //   }
  //   this.setState({
  //     recipeIngredients
  //   });
  // };

  componentDidMount() {
    RecipesApiService.getRecipes().then(recipes =>
      this.setState({ recipes: recipes })
    );
    RecipesApiService.getUnits().then(units => this.setState({ units: units }));
  }

  render() {
    const contextValue = {
      recipes: this.state.recipes,
      selected: this.state.selected,
      units: this.state.units,
      recipeIngredients: this.state.recipeIngredients,
      addToSelected: this.handleAddToSelected,
      removeFromSelected: this.handleRemoveFromSelected,
      addRecipe: this.handleAddRecipe,
      addIngredients: this.handleAddIngredients
    };

    return (
      <AppContext.Provider value={contextValue}>
        <div className="App">
          <header className="App__header">
            <Header />
          </header>
          <main className="App">
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route path={"/recipes/:recipeId"} component={RecipePage} />
              <Route path={"/recipes"} component={RecipesPage} />
              <Route path={"/grocery-list"} component={GroceryListPage} />
              <PrivateRoute path={"/add-recipe"} component={AddRecipePage} />
              <PublicOnlyRoute path={"/login"} component={LoginPage} />
              <PublicOnlyRoute
                path={"/register"}
                component={RegistrationPage}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
