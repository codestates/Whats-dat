import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import { firestore } from "../firebase";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

// TODO : canvas string -> canvas image 변환
// game:
// is_started: boolean
// rounds:
//   0: // 0
//       player_id[key]
//         start_word: string
//   1: // 홀수
//       player_id
//         canvas_img:
//   2: // 짝수
//       player_id
//         guessed_word: string

const GameContextProvider = ({ children }) => {
  const [gameLog, setGameLog] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGameLog = async () => {
      setLoading(true);
      await firestore
        .collection("gameDev")
        .doc("0")
        .collection("game_log")
        .doc("0")
        .onSnapshot((doc) => {
          console.log("gameContext", doc.data());
          setGameLog(doc.data());
        });
      setLoading(false);
    };
    getGameLog();
  }, []);

  const value = { gameLog };
  return (
    <GameContext.Provider value={value}>
      {!loading && children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default GameContextProvider;
