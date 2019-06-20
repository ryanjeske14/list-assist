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
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";

class App extends Component {
  state = {
    recipes: [],
    selected: {},
    recipeIngredients: [],
    loggedIn: false
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
    this.setState({
      recipes: [...this.state.recipes, recipe]
    });
  };

  handleAddIngredients = ingredients => {
    console.log(ingredients);
    const recipeIngredients = [...this.state.recipeIngredients];
    console.log(recipeIngredients);
    for (const ingredient of ingredients) {
      recipeIngredients.push(ingredient);
    }
    this.setState({
      recipeIngredients
    });
  };

  componentDidMount() {
    this.setState({
      recipes: STORE.recipes,
      recipeIngredients: STORE.recipeIngredients,
      loggedIn: TokenService.hasAuthToken()
    });

    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
      tell the idle service to register event listeners
      the event listeners are fired when a user does something, e.g. move their mouse
      if the user doesn't trigger one of these event listeners,
        the idleCallback (logout) will be invoked
    */
      IdleService.regiserIdleTimerResets();

      /*
      Tell the token service to read the JWT, looking at the exp value
      and queue a timeout just before the token expires
    */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
    when the app unmounts,
    stop the event listeners that auto logout (clear the token from storage)
  */
    IdleService.unRegisterIdleResets();
    /*
    and remove the refresh endpoint request
  */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
    react won't know the token has been removed from local storage,
    so we need to tell React to rerender
  */
    this.setState({
      loggedIn: false
    });
  };

  setLoggedIn = () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    });
  };

  render() {
    const contextValue = {
      recipes: this.state.recipes,
      selected: this.state.selected,
      recipeIngredients: this.state.recipeIngredients,
      addToSelected: this.handleAddToSelected,
      removeFromSelected: this.handleRemoveFromSelected,
      addRecipe: this.handleAddRecipe,
      addIngredients: this.handleAddIngredients,
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn
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
