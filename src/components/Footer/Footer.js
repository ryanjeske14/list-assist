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
              aria-label="github profile link"
            >
              <i className="fab fa-github" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/ryanjeske/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin profile link"
            >
              <i className="fab fa-linkedin" aria-hidden="true" />
            </a>
            <a href="mailto:ryanjeske@gmail.com" aria-label="email_link">
              <i className="far fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
