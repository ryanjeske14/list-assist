import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//import AppContext from "../AppContext";
//import ErrorBoundary from "../ErrorBoundary";
import LandingPage from "../../routes/LandingPage/LandingPage";
import RecipesPage from "../../routes/RecipesPage/RecipesPage";
import RecipePage from "../../routes/RecipePage/RecipePage";
import GroceryListPage from "../../routes/GroceryListPage/GroceryListPage";
import AddRecipePage from "../../routes/AddRecipePage/AddRecipePage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import AppContext from "../../AppContext";
import STORE from "../../STORE";

class App extends Component {
  state = {
    recipes: [],
    selected: {}
  };

  handleAddToSelected = recipeId => {
    const selected = { ...this.state.selected };
    selected[recipeId] = selected[recipeId] + 1 || 1;
    this.setState({
      selected
    });
  };

  componentDidMount() {
    this.setState({
      recipes: STORE.recipes
    });
  }

  render() {
    const contextValue = {
      recipes: this.state.recipes,
      selected: this.state.selected,

      addToSelected: this.handleAddToSelected
    };

    return (
      <AppContext.Provider value={contextValue}>
        <main className="App">
          <Switch>
            <Route exact path={"/"} component={LandingPage} />
            <Route path={"/recipes/:recipeId"} component={RecipePage} />
            <Route path={"/recipes"} component={RecipesPage} />
            <Route path={"/grocery-list"} component={GroceryListPage} />
            <Route path={"/add-recipe"} component={AddRecipePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </AppContext.Provider>
    );
  }
}

export default App;
