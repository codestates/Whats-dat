import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import GuessWord from "./GuessWord";
import SelectWord from "./SelectWord";
import GameResults from "./GameResults";
import { useGame } from "../../contexts/GameContext";
import WaitingModal from "../../components/templates/waitingModal/waitingModal";
import DisconnectMessageModal from "../../components/templates/disconnectMessageModal/disconnectMessageModal";
import useLocalState from "../../utils/useLocalStorage";
import wordList from "./fakeWordDB";
import {
  createGameResultList,
  getPreviousRoundData,
  calculateTotalRound,
  getUnSubmitPlayer,
} from "./gameUtils";

const getRandomWordList = () => {
  const copyWordList = [...wordList.eng];
  const result = [];
  for (let i = 1; i <= 3; i += 1) {
    const randomIdx = Math.floor(Math.random() * copyWordList.length);
    result.push(copyWordList.splice(randomIdx, 1)[0]);
  }
  return result;
};

const index = () => {
  const { gameLog, submitResult } = useGame();
  const [currentRound, setCurrentRound] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  // TODO: 실시간 데이터 연결
  const [isAllConnect, setIsAllConnect] = useState(true);
  const [roomInfo] = useLocalState("roomInfo", "");
  const [userInfo] = useLocalState("persistentUserGameProfile", "");
  const { nickname, avatarColor, avatar, score } = userInfo;
  const totalRound = calculateTotalRound(roomInfo.players.length);
  const [waitingItems, setWaitingItems] = useState([]);

  const setIsSubmitFalse = () => {
    setIsSubmit(false);
  };

  const checkValue = (values) => {
    let value = values;
    if (typeof value === "object") {
      value = values.word;
      if (value.length === 0 && currentRound === 0) {
        [value] = wordList;
      } else if (value.length === 0) {
        value = `${nickname} couldn't answer...`;
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
    console.log("gameLog:", gameLog);
    if (!gameLog) return;

    if (gameLog.rounds) {
      setCurrentRound(Object.keys(gameLog.rounds).length - 1);
    }
    if (gameLog.rounds[Object.keys(gameLog.rounds).length - 1].length === 0) {
      setIsSubmit(false);
    }

    if (gameLog.status === "closed") {
      setIsSubmit(false);
    }

    setWaitingItems(getUnSubmitPlayer(roomInfo, gameLog));
  }, [gameLog]);

  const renderCurrentRound = () => {
    if (currentRound === undefined) {
      return null;
    }

    if (gameLog && gameLog.status === "closed") {
      const listItemData = createGameResultList(gameLog, roomInfo);
      console.log(listItemData);
      return <GameResults listItemData={listItemData} />;
    }

    if (currentRound === 0) {
      return (
        <SelectWord
          wordList={getRandomWordList()}
          onSubmit={onSubmit}
          setIsSubmit={setIsSubmit}
        />
      );
    }

    if (currentRound % 2 === 1) {
      // TODO: 캔버스 터치시 스크롤 이벤트 방지
      return (
        <Drawing
          onSubmit={onSubmit}
          preGuessWord={getPreviousRoundData(gameLog, userInfo, currentRound)}
          curRound={currentRound}
          totalRound={3}
          limitTime={Number(roomInfo.settings.limit_time)}
          setIsSubmitFalse={setIsSubmitFalse}
          currentPlayer={{
            user_id: userInfo.user_id,
            username: userInfo.nickname,
            avatar: userInfo.avatar,
          }}
          playersList={roomInfo.players}
        />
      );
    }

    if (currentRound % 2 === 0) {
      return (
        <GuessWord
          onSubmit={onSubmit}
          imageUrl={getPreviousRoundData(gameLog, userInfo, currentRound)}
          curRound={currentRound}
          totalRound={3}
          limitTime={Number(roomInfo.settings.limit_time)}
          setIsSubmitFalse={setIsSubmitFalse}
          currentPlayer={{
            user_id: userInfo.user_id,
            username: userInfo.nickname,
            avatar: userInfo.avatar,
          }}
          playersList={roomInfo.players}
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
