import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";
import Home from "../components/templates/Home/Home";
import Login from "../components/templates/Login/Login";
import Register from "../components/templates/Register/Register";
import MyPage from "../components/templates/MyPage/MyPage";
import LeaderBoard from "../components/templates/LeaderBoard/LeaderBoard";
import Lobby from "../components/templates/Lobby/Lobby";
import NewGame from "../components/templates/NewGame/NewGame";
import SelectWord from "../components/templates/SelectWord/SelectWord";
import Drawing from "../components/templates/Drawing/Drawing";
import GuessWord from "../components/templates/GuessWord/GuessWord";
import GameResults from "../components/templates/GameResults/GameResults";

// 로그인을 안 한 경우에만 보이는 페이지
// 방에 속해있어야 접속할 수 있는 경로
// 로그인 할 때만 보이는 페이지

const App = () => {
  return (
    <GlobalContext>
      <Router>
        {/* 로그인을 안 한 경우에만 보이는 페이지 */}
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        {/* 로그인 했을 때만 보이는 페이지 */}
        <Route path="/login" component={Login} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/leaderboard" component={LeaderBoard} />
        <Route path="/newGame" component={NewGame} />
        {/* 방에 속해있어야 접속할 수 있는 경로  */}
        <Route path="/lobby/:id" component={Lobby} />
        <Route path="/game/:id/selectword" component={SelectWord} />
        <Route path="/game/:id/drawing" component={Drawing} />
        <Route path="/game/:id/guessWord" component={GuessWord} />
        <Route path="/game:id/gameResults" component={GameResults} />
      </Router>
    </GlobalContext>
  );
};

export default App;
