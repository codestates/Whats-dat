import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import { firestore } from "../firebase";
import useLocalState from "../utils/useLocalStorage";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const [gameLog, setGameLog] = useState();
  const [loading, setLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useLocalState("roomInfo", "");

  useEffect(() => {
    const getGameLog = async () => {
      setLoading(true);
      console.log("roomInfo.roomUid", roomInfo.roomUid);
      await firestore
        .collection("roomDev")
        .doc(roomInfo.roomUid)
        .collection("game_log")
        .doc("0")
        .onSnapshot((doc) => {
          setGameLog(doc.data());
        });
      setLoading(false);
    };
    getGameLog();
  }, []);

  const submitResult = async ({ roundIndex, value }) => {
    const onCallSubmitResult = await firebase
      .functions()
      .httpsCallable("handleGameSubmit");
    // TODO: totalplayer 연결
    const result = await onCallSubmitResult({
      roomId: roomInfo.roomUid,
      roundIndex,
      value,
      totalPlayers: roomInfo.settings.max_players,
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
