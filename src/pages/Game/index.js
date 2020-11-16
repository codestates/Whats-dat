import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import GuessWord from "./GuessWord";
import SelectWord from "./SelectWord";
import GameResults from "./GameResults";
import { useGame } from "../../contexts/GameContext";

// TODO: 라운드 진행(GameContext)에 따라 다른 컴포넌트 표시

const index = () => {
  const { gameLog } = useGame();
  const [currentRound, setCurrentRound] = useState();

  const wordList = ["원할머니 보쌈", "아련한 강아지", "포카칩"];
  const onSubmit = (values) => {
    console.log("submit!", values.word);
    // firebase
  };

  const handleTimeOut = (values) => {
    onSubmit(values);
  };

  useEffect(() => {
    // TODO
    if (!gameLog) return;
    if (gameLog.rounds.length) {
      setCurrentRound(gameLog.rounds.length - 1);
    }
  }, [gameLog]);

  const renderCurrentRound = () => {
    if (currentRound === undefined) {
      return null;
    }

    if (currentRound === 0) {
      console.log("round 0 start");
      return <SelectWord wordList={wordList} handleTimeOut={handleTimeOut} />;
    }

    if (currentRound % 2 === 1) {
      console.log("odd round start");
      return <Drawing />;
      //   curRound,
      // totalRound,
      // limitTime,
      // handleTimeOut,
      // currentPlayer,
      // playersList,
      // preGuessWord,
    }

    if (currentRound % 2 === 0) {
      console.log("even round start");
      return <GuessWord />;
      //   curRound,
      // totalRound,
      // limitTime,
      // handleTimeOut,
      // currentPlayer,
      // playersList,
      // imageUrl,
    }

    return new Error("invalid round count");
  };

  return <>{renderCurrentRound()}</>;
};

export default index;
