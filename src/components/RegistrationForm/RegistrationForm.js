import React, { Component } from "react";
import "./RegistrationForm.css";

export default class RegistrationForm extends Component {
  render() {
    return (
      <form className="signup-form">
        <div>
          <label htmlFor="full-name">Full name</label>
          <input
            placeholder="e.g., John Doe"
            type="text"
            name="full-name"
            id="full-name"
          />
        </div>
        <div>
          <label htmlFor="username">User name</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}
