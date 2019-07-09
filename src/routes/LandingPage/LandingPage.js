import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./LandingPage.css";
const icon = require("../../img/icon-2.png");
const pastaImg = require("../../img/pasta.jpg");
const groceriesImg = require("../../img/produce.jpg");

export default class LandingPage extends Component {
  render() {
    return (
      <section className="landing">
        <section className="banner">
          <h1>GROCERY LISTS MADE EASY</h1>
        </section>

        <section className="landing_section">
          <header>
            <h2>We know you're busy. Let us help you.</h2>
          </header>
          <p>
            No more spending time figuring out which groceries you need in order
            to make your favorite recipes. With List Assist, your grocery list
            is made for you, giving you more time for the things that matter
            most.
          </p>
          <img className="landing_logo" src={icon} alt="icon" />
        </section>

        <section className="landing_section">
          <header>
            <h2>Choose your recipes.</h2>
            <p>
              Choose from a list of delicious recipes, courtesy of our friends
              over at{" "}
              <a
                href="http://www.cookingwithcocktailrings.com/"
                className="cwcr_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cooking with Cocktail Rings
              </a>
              . Or, if none of the recipes you see suit your tastes, you can
              easily add your own recipes by creating an account!
            </p>
          </header>
          <img
            src={pastaImg}
            alt="recipes_screenshot"
            className="landing_img"
          />
        </section>

        <section className="landing_section">
          <header>
            <h2>Get your grocery list.</h2>
          </header>
          <p>
            List Assist takes the list of recipes you selected and automatically
            generates a consolidated grocery list for you to take to the store.
            It's as easy as that!
          </p>
          <img
            src={groceriesImg}
            alt="grocery_list_screenshot"
            className="landing_img"
          />
        </section>

        <section className="get_started_section">
          <h2 className="get_started">
            <Link to="/recipes">GET STARTED</Link>
          </h2>
        </section>
        <Footer />
      </section>
    );
  }
}
