import React, { Component } from "react";
import "./RegistrationForm.css";

export default class RegistrationForm extends Component {
  render() {
    return (
      <form class="signup-form">
        <div>
          <label for="full-name">Full name</label>
          <input
            placeholder="e.g., John Doe"
            type="text"
            name="full-name"
            id="full-name"
          />
        </div>
        <div>
          <label for="username">User name</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}
