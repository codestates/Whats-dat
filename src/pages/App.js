import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import { PrivateRoute as Route } from "../utils/PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import MyPage from "./MyPage";
import LeaderBoard from "./LeaderBoard";
import Lobby from "./Lobby";
// import NewGame from "./NewGame";
import SelectWord from "./SelectWord";
import Drawing from "./Drawing";
// import GuessWord from "./GuessWord";
// import GameResults from "./GameResults";

// FIXME : 여긴 푸시하지 마세요

const App = () => {
  return (
    <Router>
      <Switch>
        {/* 로그인을 안 한 경우에만 보이는 페이지 */}
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        {/* 로그인 했을 때만 보이는 페이지 */}
        <Route path="/login" component={Login} />
        <Route path="/my-page" component={MyPage} />
        <Route path="/leaderboard" component={LeaderBoard} />
        {/* <Route path="/new-game" component={NewGame} /> */}
        {/* 방에 속해있어야 접속할 수 있는 경로  */}
        <Route path="/lobby/:id" component={Lobby} />
        <Route path="/game/:id/select-word" component={SelectWord} />
        <Route path="/game/:id/drawing" component={Drawing} />
        {/* <Route path="/game/:id/guess-word" component={GuessWord} /> */}
        {/* <Route path="/game:id/game-results" component={GameResults} /> */}
      </Switch>
    </Router>
  );
};

export default App;
