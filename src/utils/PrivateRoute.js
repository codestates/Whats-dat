import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import ROUTES from "./RoutePath";
import GUARDTYPE from "./GuardType";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";

export const PrivateRoute = ({ component: Component, permission, ...rest }) => {
  const { IS_SIGNED, IS_NOT_SIGNED, IS_IN_ROOM, IS_PLAYING } = GUARDTYPE;
  const { HOME, NEWGAME } = ROUTES;
  const { currentUser } = useAuth();
  const { currentJoinedRoom } = useRoom();
  // const { gameLog } = useGame();

  // [false] -> 로비 대기 중 [Room O, Game X]
  // [true, playing] -> 게임 중 [Room x, Game O]
  // [false, closed] -> result page / 끝나고 다시 로비 대기 중 [Room O, Game O]
  const currentRoom = !!(
    currentJoinedRoom && currentJoinedRoom.is_started === false
  );
  // const currentGame = true;
  // const currentGame = currentJoinedRoom && gameLog;
  const currentGame = currentJoinedRoom;

  // TODO: game이 진행중일때 진입 막기 -> joinRoom에서
  // TODO: 게임 시작할때 room의 is_started 변경

  /** playground

room is_started : true
room is_started : false
game status: playing
game status: closed

Room에 들어갈 수 있을때: is_started가 false때
Game에 들어갈 수 있을때: game doc이 존재할 때

result와 lobby의 분기점..
  1. user가 x버튼을 클릭했을 때 -> 그럼 클릭을 안하면?
  2. 시간 제한.. <이게 옳은 방안인가...??? n분 후에는 강제로 로비행
  3. 실시간 접속상태 < 지금은 구현하기 어려움
  4.
`

// 실시간 접속 상태를 알아야한다
 */

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

PrivateRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.node, propTypes.func]),
};

export default PrivateRoute;
