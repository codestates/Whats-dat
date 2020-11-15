import React from "react";
import { Redirect, Switch, withRouter } from "react-router-dom";
import { PrivateRoute as Route } from "../utils/PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyPage from "./MyPage";
import LeaderBoard from "./LeaderBoard";
import Lobby from "./Lobby";
import NewGame from "./NewGame";
import Game from "./Game";
import Setting from "./Setting";
import ROUTES from "../utils/RoutePath";
import GUARDTYPE from "../utils/GuardType";
import { useAuth } from "../contexts/UserContext";

const App = () => {
  const {
    HOME,
    REGISTER,
    LOGIN,
    MYPAGE,
    SETTING,
    LEADERBOARD,
    NEWGAME,
    LOBBY,
    GAME,
  } = ROUTES;
  const { IS_SIGNED, IS_NOT_SIGNED, IS_IN_ROOM, IS_PLAYING } = GUARDTYPE;
  const { currentUser } = useAuth();

  return (
    <>
      {/* {<pre>{JSON.stringify(currentUser, null, 2)}</pre>} */}
      <Switch>
        {/* 로그인을 안 한 경우에만 보이는 페이지 */}
        <Route exact path={HOME} component={Home} permission={IS_NOT_SIGNED} />
        <Route
          path={REGISTER}
          component={Register}
          permission={IS_NOT_SIGNED}
        />
        <Route path={LOGIN} component={Login} permission={IS_NOT_SIGNED} />

        {/* 로그인 했을 때만 보이는 페이지 */}
        <Route path={MYPAGE} component={MyPage} permission={IS_SIGNED} />
        <Route path={SETTING} component={Setting} permission={IS_SIGNED} />
        <Route
          path={LEADERBOARD}
          component={LeaderBoard}
          permission={IS_SIGNED}
        />
        <Route path={NEWGAME} component={NewGame} permission={IS_SIGNED} />
        {/* 방에 속해있어야 접속할 수 있는 경로  */}
        <Route path={LOBBY} component={Lobby} permission={IS_IN_ROOM} />
        {/* 속해있는 방의 게임이 진행 중 일때만 접속 가능한 경로  */}
        <Route path={GAME} component={Game} permission={IS_PLAYING} />
        <Redirect to={Home} />
      </Switch>
    </>
  );
};

export default withRouter(App);
