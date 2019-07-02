import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <section className="landing">
        <section role="banner" className="banner">
          <h2>GROCERY LISTS MADE EASY</h2>
        </section>

        <section>
          <header>
            <h2>We know you're busy. Let us help you.</h2>
          </header>
          <p>
            No more spending time figuring out which groceries you need in order
            to make your favorite recipes. With List Assist, your grocery list
            is made for you, giving you back time for the things that matter
            most.
          </p>
          <img className="landing_logo" src="img/icon-2.png" alt="icon" />
        </section>

        <section>
          <header>
            <h2>Choose your recipes.</h2>
          </header>
          <p>
            [<em>placeholder for screenshot of recipes interface</em>]
          </p>
          <p>
            Choose from a list of delicious recipes that you'd like to make. Or,
            if none of the recipes you see suit your tastes, add your own
            recipes!
          </p>
        </section>

        <section>
          <header>
            <h2>Get your grocery list.</h2>
          </header>
          <p>
            [<em>placeholder for screenshot of grocery list screen</em>]
          </p>
          <p>
            List Assist takes the list of recipes you selected and automatically
            generates a consolidated grocery list for you to take to the store.
            It's as easy as that!
          </p>
        </section>

        <section className="get_started_section">
          <h2 className="get_started">
            <Link to="/recipes">GET STARTED</Link>
          </h2>
          {/* <p>
              Register below to add and manage your own favorite recipes.
              There's no need to register if you'd just like to use the
              pre-existing recipes on our site. Happy shopping!
            </p> */}

          {/* <RegistrationForm /> */}
        </section>
        <Footer />
      </section>
    );
  }
}
