import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../../routes/LandingPage/LandingPage";
import RecipesPage from "../../routes/RecipesPage/RecipesPage";
import RecipePage from "../../routes/RecipePage/RecipePage";
import GroceryListPage from "../../routes/GroceryListPage/GroceryListPage";
import AddRecipePage from "../../routes/AddRecipePage/AddRecipePage";
import EditRecipePage from "../../routes/EditRecipePage/EditRecipePage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import AppContext from "../../AppContext";
import Header from "../Header/Header";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import RecipesApiService from "../../services/recipes-api-service";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";

class App extends Component {
  state = {
    recipes: [],
    selected: {},
    units: [],
    loggedIn: false,
    user: {}
  };

  // callback function to track selected recipes and associated quantities and update state accordingly
  handleAddToSelected = recipeId => {
    const selected = { ...this.state.selected };
    selected[recipeId] = selected[recipeId] + 1 || 1;
    this.setState({
      selected
    });
  };

  // callback function to decrement/remove selected recipe quantity and update state accordingly
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

  // callback function for AddRecipePage form submission that initiates post request and updates state with new recipe if successful
  handleAddRecipe = recipe => {
    RecipesApiService.postRecipe(recipe).then(recipe =>
      this.setState({
        recipes: [...this.state.recipes, recipe]
      })
    );
  };

  // callback function to delete recipe that initiates delete request and updates state if successful
  handleDeleteRecipe = recipeId => {
    RecipesApiService.deleteRecipe(recipeId).then(
      this.setState({
        recipes: this.state.recipes.filter(recipe => recipe.id !== recipeId)
      })
    );
  };

  // callback function for EditRecipePage form submission that initiates update request and updates state with new recipe if successful
  handleEditRecipe = (updatedRecipe, ingredientsToDelete) => {
    RecipesApiService.editRecipe(updatedRecipe, ingredientsToDelete).then(
      this.setState({
        recipes: this.state.recipes.map(recipe =>
          recipe.id !== updatedRecipe.id ? recipe : updatedRecipe
        )
      })
    );
  };

  //
  async componentDidMount() {
    // check if user is currently logged in, and if so, call setUser function to store user credentials
    await this.setState({
      loggedIn: TokenService.hasAuthToken()
    });

    if (this.state.loggedIn) {
      const jwtPayload = TokenService.parseAuthToken();
      await this.setUser({
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub
      });
    }

    // if user is not logged in, set user ID to 0 (guest)
    const userId = this.state.user.id || 0;

    // retrieves recipes data and updates state
    RecipesApiService.getRecipes(userId).then(recipes =>
      this.setState({ recipes })
    );

    // gets units data and stores in state
    RecipesApiService.getUnits().then(units => this.setState({ units: units }));

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

  // check if user is logged in and update state accordingly
  setLoggedIn = () => {
    this.setState({
      loggedIn: TokenService.hasAuthToken()
    });
  };

  // store user credentials in state
  setUser = user => {
    this.setState({
      user
    });
  };

  // retrieve recipes for current user
  loadUserRecipes = () => {
    const userId = this.state.user.id || 0;

    RecipesApiService.getRecipes(userId).then(recipes =>
      this.setState({ recipes })
    );
  };

  render() {
    const contextValue = {
      recipes: this.state.recipes,
      selected: this.state.selected,
      units: this.state.units,
      recipeIngredients: this.state.recipeIngredients,
      addToSelected: this.handleAddToSelected,
      removeFromSelected: this.handleRemoveFromSelected,
      addRecipe: this.handleAddRecipe,
      loggedIn: this.state.loggedIn,
      setLoggedIn: this.setLoggedIn,
      user: this.state.user,
      setUser: this.setUser,
      loadUserRecipes: this.loadUserRecipes,
      deleteRecipe: this.handleDeleteRecipe,
      editRecipe: this.handleEditRecipe
    };

    return (
      <AppContext.Provider value={contextValue}>
        <div className="App">
          <header>
            <Header />
          </header>
          <main className="App">
            <Switch>
              <Route exact path={"/"} component={LandingPage} />
              <Route path={"/recipes/:recipeId"} component={RecipePage} />
              <Route path={"/recipes"} component={RecipesPage} />
              <Route path={"/grocery-list"} component={GroceryListPage} />
              <PrivateRoute path={"/add-recipe"} component={AddRecipePage} />
              <PrivateRoute
                path={"/edit-recipe/:recipeId"}
                component={EditRecipePage}
              />
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
