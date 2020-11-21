import React, { useEffect, useState, useMemo } from "react";
import Drawing from "./Drawing";
import GuessWord from "./GuessWord";
import SelectWord from "./SelectWord";
import GameResults from "./GameResults";
import { useGame } from "../../contexts/GameContext";
import { useRoom } from "../../contexts/RoomContext";
import { useAuth } from "../../contexts/UserContext";
import WaitingModal from "../../components/templates/waitingModal/waitingModal";
import DisconnectMessageModal from "../../components/templates/disconnectMessageModal/disconnectMessageModal";

import wordList from "./fakeWordDB";

import {
  createGameResultList,
  getPreviousRoundData,
  calculateTotalRound,
  getUnSubmitPlayer,
  mapProgressPlayers,
} from "./gameUtils";

const index = () => {
  const { gameLog, submitResult } = useGame();
  const [currentRound, setCurrentRound] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const { currentJoinedRoom, setIsGameStarted } = useRoom();
  const { currentUser } = useAuth();

  // TODO: 실시간 데이터 연결
  const [isAllConnect] = useState(true);
  const { nickname, avatar, uid } = currentUser;
  const [totalRound, setTotalRound] = useState(0);
  const [waitingItems, setWaitingItems] = useState([]);

  const randomWordList = useMemo(() => {
    const copyWordList = [...wordList.eng];
    const result = [];
    for (let i = 1; i <= 3; i += 1) {
      const randomIdx = Math.floor(Math.random() * copyWordList.length);
      result.push(copyWordList.splice(randomIdx, 1)[0]);
    }
    return result;
  }, []);

  const setIsSubmitFalse = () => {
    setIsSubmit(false);
  };

  const checkValue = (values) => {
    let value = values;
    if (typeof value === "object") {
      value = values.word;
      if (value.length === 0 && currentRound === 0) {
        [value] = randomWordList;
      } else if (value.length === 0) {
        value = ``;
      }
    }
    return value;
  };

  const onSubmit = async (values) => {
    if (isSubmit) return;
    setIsSubmit(true);
    const value = checkValue(values);

    try {
      await submitResult({
        roundIndex: currentRound,
        value,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!gameLog || !currentJoinedRoom) return;

    if (gameLog.rounds) {
      setCurrentRound(Object.keys(gameLog.rounds).length - 1);
    }
    if (
      Object.keys(gameLog.rounds[Object.keys(gameLog.rounds).length - 1])
        .length === 0
    ) {
      setIsSubmit(false);
    }

    if (gameLog.status === "closed") {
      setIsGameStarted(false);
      setIsSubmit(false);
    }
    setTotalRound(calculateTotalRound(currentJoinedRoom.players.length) - 1);
    setWaitingItems(getUnSubmitPlayer(currentJoinedRoom, gameLog));
  }, [gameLog]);

  const renderCurrentRound = () => {
    if (currentRound === undefined) {
      return null;
    }

    if (gameLog && gameLog.status === "closed") {
      const listItemData = createGameResultList(gameLog, currentJoinedRoom);
      return <GameResults listItemData={listItemData} />;
    }

    if (currentRound === 0) {
      return <SelectWord wordList={randomWordList} onSubmit={onSubmit} />;
    }

    if (currentRound % 2 === 1) {
      // TODO: 캔버스 터치시 스크롤 이벤트 방지
      return (
        <Drawing
          onSubmit={onSubmit}
          preGuessWord={getPreviousRoundData(
            gameLog,
            currentUser,
            currentRound
          )}
          curRound={currentRound}
          totalRound={totalRound}
          limitTime={Number(currentJoinedRoom.settings.limit_time)}
          setIsSubmitFalse={setIsSubmitFalse}
          currentPlayer={{
            user_id: uid,
            username: nickname,
            avatar,
          }}
          playersList={mapProgressPlayers(
            gameLog.playOrder,
            currentJoinedRoom.players
          )}
        />
      );
    }

    if (currentRound % 2 === 0) {
      return (
        <GuessWord
          onSubmit={onSubmit}
          imageUrl={getPreviousRoundData(gameLog, currentUser, currentRound)}
          curRound={currentRound}
          totalRound={totalRound}
          limitTime={Number(currentJoinedRoom.settings.limit_time)}
          setIsSubmitFalse={setIsSubmitFalse}
          currentPlayer={{
            user_id: uid,
            username: nickname,
            avatar,
          }}
          playersList={mapProgressPlayers(
            gameLog.playOrder,
            currentJoinedRoom.players
          )}
        />
      );
    }

    return new Error("invalid round count");
  };

  return (
    <>
      {isAllConnect ? null : <DisconnectMessageModal />}
      {isSubmit && isAllConnect ? (
        <WaitingModal waitingItems={waitingItems} />
      ) : null}
      {renderCurrentRound()}
    </>
  );
};

export default index;
