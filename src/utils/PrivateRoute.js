import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import ROUTES from "./RoutePath";
import GUARDTYPE from "./GuardType";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";

export const PrivateRoute = ({ component: Component, permission, ...rest }) => {
  const {
    IS_SIGNED,
    IS_NOT_SIGNED,
    IS_IN_ROOM,
    IS_PLAYING,
    HAS_PROFILE,
  } = GUARDTYPE;
  const { HOME, NEWGAME, SETTING } = ROUTES;
  const { currentUser, userGameProfile } = useAuth();
  const { currentJoinedRoom } = useRoom();

  const currentRoom = !!(
    currentJoinedRoom && currentJoinedRoom.is_started === false
  );
  const currentGame = currentJoinedRoom;
  const currentProfile = userGameProfile && userGameProfile.nickname;

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
    case HAS_PROFILE:
      return generateRoute(currentProfile, SETTING);
    default:
      throw new Error("invalid routing");
  }
};

PrivateRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.node, propTypes.func]),
};

export default PrivateRoute;
