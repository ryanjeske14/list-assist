import React from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../../services/token-service";

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  // if user is logged in, render component, otherwise redirect to login page
  return (
    <Route
      {...props}
      render={componentProps =>
        TokenService.hasAuthToken() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: componentProps.location }
            }}
          />
        )
      }
    />
  );
}
