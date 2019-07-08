import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Hyph } from "../Utils/Utils";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./Header.css";
const logo = require("../../img/logo-2.png");

export default class Header extends Component {
  static contextType = AppContext;

  handleLogoutClick = async () => {
    TokenService.clearAuthToken();
    // when logging out, clear the callbacks to the refresh api and idle auto logout
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    await this.context.setLoggedIn();
    await this.context.setUser({});
    // calls function to reload recipe data so that previous user's recipes are no longer accessible
    this.context.loadUserRecipes();
  };

  renderLogoutLink() {
    return (
      <div className="logged-in">
        <Link to="/recipes">Recipes</Link>
        <Hyph />
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="not-logged-in">
        <Link to="/register">Register</Link>
        <Hyph />
        <Link to="/login">Login</Link>
      </div>
    );
  }

  render() {
    return (
      <nav className="Header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {this.context.loggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    );
  }
}
