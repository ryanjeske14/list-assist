import React, { Component } from "react";
import "./Footer.css";

export default class RecipesList extends Component {
  render() {
    return (
      <footer className="footer">
        {" "}
        <div className="footer_author">
          <p className="footer_author_text">
            Created by{" "}
            <a
              className="name"
              href="https://ryanjeske.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ryan Jeske
            </a>
          </p>
          <div className="footer_social_media">
            <a
              href="https://github.com/ryanjeske14"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/ryanjeske/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
