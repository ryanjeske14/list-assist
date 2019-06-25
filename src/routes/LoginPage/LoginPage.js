import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section } from "../../components/Utils/Utils";
import AppContext from "../../AppContext";
import TokenService from "../../services/token-service";

export default class LoginPage extends Component {
  static contextType = AppContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = async () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/recipes";
    history.push(destination);
    await this.context.setLoggedIn();
    const jwtPayload = await TokenService.parseAuthToken();
    await this.context.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub
    });
    this.context.loadUserRecipes();
  };

  render() {
    return (
      <Section className="LoginPage">
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </Section>
    );
  }
}
