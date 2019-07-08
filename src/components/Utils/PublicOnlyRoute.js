import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  // if user is logged in, redirect to home page, otherwise render component
  return (
    <Route
      {...props}
      render={componentProps =>
        TokenService.hasAuthToken() ? (
          <Redirect to={"/"} />
        ) : (
          <Component {...componentProps} />
        )
      }
    />
  );
}
