import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import ROUTES from "./RoutePath";
import GUARDTYPE from "./GuardType";
import { useAuth } from "../contexts/UserContext";

export const PrivateRoute = ({ component: Component, permission, ...rest }) => {
  const { IS_SIGNED, IS_NOT_SIGNED, IS_IN_ROOM, IS_PLAYING } = GUARDTYPE;
  const { HOME, NEWGAME } = ROUTES;
  const { currentUser } = useAuth();

  const currentRoom = true;
  const currentGame = true;

  const generateRoute = (validation, redirectPath) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          return validation ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirectPath} />
          );
        }}
      />
    );
  };

  switch (permission) {
    case IS_SIGNED:
      return generateRoute(currentUser, HOME);
    case IS_NOT_SIGNED:
      return generateRoute(!currentUser, NEWGAME);
    case IS_IN_ROOM:
      return generateRoute(currentRoom, HOME);
    case IS_PLAYING:
      return generateRoute(currentGame, HOME);
    default:
      throw new Error("invalid routing");
  }
};

// ANCHOR
PrivateRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.node, propTypes.func]),
};

export default PrivateRoute;
