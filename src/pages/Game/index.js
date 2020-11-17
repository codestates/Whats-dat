import React, { useEffect, useState } from "react";
import Drawing from "./Drawing";
import GuessWord from "./GuessWord";
import SelectWord from "./SelectWord";
// import GameResults from "./GameResults";
import { useGame } from "../../contexts/GameContext";
import WaitingModal from "../../components/templates/waitingModal/waitingModal";
import DisconnectMessageModal from "../../components/templates/disconnectMessageModal/disconnectMessageModal";

// eslint-disable-next-line no-var
var dummyData = [
  {
    nickname: "시나본",
    icon: "AVATAR_HORSE",
    avatarColor: "primary",
    isDrawing: false,
  },
  {
    nickname: "죠르디",
    icon: "AVATAR_KIWI",
    avatarColor: "green",
    isDrawing: true,
  },
  {
    nickname: "리트리버",
    icon: "AVATAR_KIWI",
    avatarColor: "green",
    isDrawing: true,
  },
  {
    nickname: "판교불닭",
    icon: "AVATAR_KIWI",
    avatarColor: "green",
    isDrawing: true,
  },
  {
    nickname: "풀프리7기최시용",
    icon: "AVATAR_KIWI",
    avatarColor: "green",
    isDrawing: true,
  },
  {
    nickname: "썬크림",
    icon: "AVATAR_KIWI",
    avatarColor: "green",
    isDrawing: true,
  },
  {
    nickname: "죠르디",
    icon: "AVATAR_KIWI",
    avatarColor: "green",
    isDrawing: true,
  },
];

const index = () => {
  const { gameLog, submitResult } = useGame();
  const [currentRound, setCurrentRound] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  // TODO: 실시간 데이터 연결
  const [isAllConnect, setIsAllConnect] = useState(true);
  const wordList = ["원할머니 보쌈", "아련한 강아지", "포카칩"];

  const setIsSubmitFalse = () => {
    setIsSubmit(false);
  };

  // TODO: 빈 단어가 들어왔을때 처리 로직

  const onSubmit = async (values) => {
    if (isSubmit) return;
    setIsSubmit(true);
    let value = values;
    try {
      if (typeof value === "object") {
        value = value.word;
      }
      const res = await submitResult({
        roomId: 0,
        roundIndex: currentRound,
        value,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (!gameLog) return;
    if (gameLog.rounds) {
      setCurrentRound(Object.keys(gameLog.rounds).length - 1);
    }
    if (gameLog.rounds[Object.keys(gameLog.rounds).length - 1].length === 0) {
      setIsSubmit(false);
    }
  }, [gameLog]);

  const renderCurrentRound = () => {
    if (currentRound === undefined) {
      return null;
    }

    if (currentRound === 0) {
      return (
        <SelectWord
          wordList={wordList}
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
          preGuessWord="망고 프라푸치노"
          curRound={currentRound}
          totalRound={3}
          limitTime={15}
          setIsSubmitFalse={setIsSubmitFalse}
          currentPlayer={{
            player_id: "siDaBest",
            username: "Si",
            avatar: "AVATAR_KIWI",
          }}
          playersList={[
            { player_id: "kjeDaBest", username: "kje", avatar: "AVATAR_KIWI" },
            {
              player_id: "dongocDaBest",
              username: "dongoc",
              avatar: "AVATAR_KIWI",
            },
            {
              player_id: "paulDaBest",
              username: "paul",
              avatar: "AVATAR_KIWI",
            },
          ]}
        />
      );
    }

    if (currentRound % 2 === 0) {
      return (
        <GuessWord
          onSubmit={onSubmit}
          imageUrl="imageUrl"
          curRound={currentRound}
          totalRound={3}
          limitTime={15}
          setIsSubmitFalse={setIsSubmitFalse}
          currentPlayer={{
            player_id: "siDaBest",
            username: "Si",
            avatar: "AVATAR_KIWI",
          }}
          playersList={[
            { player_id: "kjeDaBest", username: "kje", avatar: "AVATAR_KIWI" },
            {
              player_id: "dongocDaBest",
              username: "dongoc",
              avatar: "AVATAR_KIWI",
            },
            {
              player_id: "paulDaBest",
              username: "paul",
              avatar: "AVATAR_KIWI",
            },
          ]}
        />
      );
    }

    return new Error("invalid round count");
  };

  return (
    <>
      {isAllConnect ? null : <DisconnectMessageModal />}
      {isSubmit && isAllConnect ? (
        <WaitingModal waitingItems={dummyData} />
      ) : null}
      {renderCurrentRound()}
    </>
  );
};

export default index;
