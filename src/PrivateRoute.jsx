import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/Auth";

function PrivateRoute({ component: Component, render, props, ...rest }) {
  const { existingTokens } = useAuth();
  console.log('existingTokens', existingTokens);

  function NewRoute() {
    if (existingTokens && existingTokens !== "") {
      console.log('render', render);
      if (render !== undefined) {
        return <Route {...rest} render={render} />
      } else {
        return <Route {...rest} render={(propsRoute) => <Component {...propsRoute} {...rest} /> } />
      }
    } else {
      return <Route render={(propsRoute) => <Redirect to="/login" />} />
    }
  }

  return (
    <NewRoute />
  );
}

export default PrivateRoute;
