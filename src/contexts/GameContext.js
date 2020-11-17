import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import app, { firestore } from "../firebase";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

// TODO : canvas string -> canvas image 변환

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
          setGameLog(doc.data());
        });
      setLoading(false);
    };
    getGameLog();
  }, []);

  const submitResult = async ({ roomId, roundIndex, value }) => {
    const onCallSubmitResult = await firebase
      .functions()
      .httpsCallable("handleGameSubmit");
    // TODO: totalplayer 연결
    const result = await onCallSubmitResult({
      roomId,
      roundIndex,
      value,
      totalPlayers: 3,
    });
    return result;
  };

  const value = { gameLog, submitResult };
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
