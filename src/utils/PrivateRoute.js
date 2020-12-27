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
  const { HOME, NEWGAME, SETTING, LOBBY } = ROUTES;
  const { currentUser, userGameProfile } = useAuth();
  const { currentJoinedRoom, isGameStarted } = useRoom();

  // global Context중 하나에 Error state를 만든다.
  // 만약 Error가 잇다면 ErrorPage로 redirect 시키기
  // x를 눌러야 setError를 null로 만들 수 있음

  const currentRoom = !!(
    currentJoinedRoom && currentJoinedRoom.is_started === false
  );

  const currentGame = currentJoinedRoom;
  // isGameStared가 false인데.. 게임 status destroy인 경우

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
      return generateRoute(currentGame, LOBBY); // 원래 HOME이었으나, 제천시민과 광주시민이 힘을 합쳐 수정...
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
