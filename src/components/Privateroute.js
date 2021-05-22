import React from "react";
import { Redirect, Route } from "react-router";

export default function Privateroute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component user={user} {...rest} /> : <Redirect to="/" />
      }
    />
  );
}
