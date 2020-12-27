import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import { firestore } from "../firebase";
import { useRoom } from "./RoomContext";
import { useAuth } from "./UserContext";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const [gameLog, setGameLog] = useState();
  const [loading, setLoading] = useState(false);
  const { currentJoinedRoom } = useRoom();
  const { currentUser } = useAuth();

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
          const gameData = doc.data();
          const gameRoundIndex = Object.keys(gameData.rounds).length - 1;
          const lastRound = gameData.rounds[gameRoundIndex];
          const isSubmit = Object.keys(lastRound).includes(currentUser.uid);
          const { status } = gameData;
          const isNewRound = !Object.keys(lastRound).length;
          // 1. game status가 playing, closed이고 내가 submit상태라면 setState
          // (가장 최신 라운드에 내 아이디가 있다면 submit상태임)
          // 2. game status가 destroy라면 setState
          if (status === "destroy" || isSubmit || isNewRound)
            setGameLog(gameData);
        });
      setLoading(false);
    };
    getGameLog();
  }, []);

  const submitResult = async ({ roundIndex, value }) => {
    const onCallSubmitResult = await firebase
      .functions()
      .httpsCallable("handleGameSubmit");
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
