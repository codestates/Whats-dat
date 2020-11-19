import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import { firestore } from "../firebase";
import { useRoom } from "./RoomContext";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const [gameLog, setGameLog] = useState();
  const [loading, setLoading] = useState(false);
  const { currentJoinedRoom } = useRoom();

  useEffect(() => {
    if (!currentJoinedRoom) return;

    const getGameLog = async () => {
      setLoading(true);
      await firestore
        .collection("roomDev")
        .doc(currentJoinedRoom.roomUid)
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
      roomId: currentJoinedRoom.roomUid,
      roundIndex,
      value,
      totalPlayers: currentJoinedRoom.players.length,
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
