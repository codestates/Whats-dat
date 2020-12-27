import React from "react";
import { Redirect, Switch, withRouter, Route } from "react-router-dom";
import { PrivateRoute } from "../utils/PrivateRoute";
import GameContextProvider from "../contexts/GameContext";
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
import HowToPlay from "./HowToPlay";
import Background from "../components/atoms/background/Background";

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
    HOWTOPLAY,
  } = ROUTES;
  const { IS_SIGNED, IS_NOT_SIGNED, IS_IN_ROOM, IS_PLAYING } = GUARDTYPE;

  return (
    <>
      <Background />
      <Switch>
        <PrivateRoute
          exact
          path={HOME}
          component={Home}
          permission={IS_NOT_SIGNED}
        />
        <Route path={HOWTOPLAY} component={HowToPlay} />

        <PrivateRoute
          path={REGISTER}
          component={Register}
          permission={IS_NOT_SIGNED}
        />
        <PrivateRoute
          path={LOGIN}
          component={Login}
          permission={IS_NOT_SIGNED}
        />
        <PrivateRoute path={MYPAGE} component={MyPage} permission={IS_SIGNED} />
        <PrivateRoute
          path={SETTING}
          component={Setting}
          permission={IS_SIGNED}
        />
        <PrivateRoute
          path={LEADERBOARD}
          component={LeaderBoard}
          permission={IS_SIGNED}
        />
        <PrivateRoute
          path={NEWGAME}
          component={NewGame}
          permission={IS_SIGNED}
        />
        <PrivateRoute path={LOBBY} component={Lobby} permission={IS_IN_ROOM} />

        <GameContextProvider>
          <PrivateRoute path={GAME} component={Game} permission={IS_PLAYING} />
        </GameContextProvider>

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default withRouter(App);
