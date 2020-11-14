import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import { round } from "lodash";
import { useAuth } from "../contexts/UserContext";
import GuessWord from "../components/templates/GuessWord/GuessWord";
import SelectWord from "../components/templates/SelectWord/SelectWord";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: propTypes.node,
};

export default PrivateRoute;
