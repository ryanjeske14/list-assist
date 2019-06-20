import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Hyph } from "../Utils/Utils";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import "./Header.css";

export default class Header extends Component {
  static contextType = AppContext;

  handleLogoutClick = async () => {
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    await this.context.setLoggedIn();
    await this.context.setUser({});
    this.context.loadUserRecipes();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/register">Register</Link>
        <Hyph />
        <Link to="/login">Login</Link>
      </div>
    );
  }

  render() {
    return (
      <nav className="Header">
        <h1>
          <Link to="/">List Assist</Link>
        </h1>
        {this.context.loggedIn
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    );
  }
}
