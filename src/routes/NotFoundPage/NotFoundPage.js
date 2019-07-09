import React, { Component } from "react";
import "./NotFoundPage.css";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1 className="not_found_header">404 - Page not found</h1>
        <p>Try going back to your previous page.</p>
      </div>
    );
  }
}
