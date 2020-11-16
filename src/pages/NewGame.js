import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";

import EnterCodeModal from "../components/templates/enterCodeModal/enterCodeModal";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";
import NewGameModal from "../components/templates/newGameModal/newGameModal";
import NewGameTemplate from "../components/templates/NewGame/NewGame";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";

const NewGame = () => {
  const { getUser, currentUser, userGameProfile } = useAuth();
  const { createRoom, setCurrentRoomSetting } = useRoom();
  const [persistentRoomInfo, setPersistentRoomInfo] = useLocalStorage(
    "roomInfo",
    ""
  );

  const history = useHistory();

  useEffect(() => {
    getUser(currentUser.uid)
      .then((userData) => {
        const user = userData.data();
        return user;
      })
      .then((user) => {
        if (
          !user ||
          user.nickname === "" ||
          user.avatar === "" ||
          user.avatarColor === ""
        ) {
          history.push("/setting");
        }
      });
  }, []);

  const generateFourDigitCode = () => {
    const char = "1234567890abcdefghijklmnopqrstuvwxyz"; // Random Generate Every Time From This Given Char
    const length = 4;
    let randomValue = "";
    for (let i = 0; i < length; i += 1) {
      const value = Math.floor(Math.random() * char.length);
      randomValue += char.substring(value, value + 1).toUpperCase();
    }
    return randomValue;
  };

  const roomUid = generateFourDigitCode();

  const initialValues = {
    is_started: false,
    host: currentUser.uid,
    settings: {
      room_name: "",
      limit_time: "",
      max_players: "",
    },
    players: [
      {
        user_id: currentUser.uid,
        nickname: userGameProfile.nickname,
        avatar: userGameProfile.avatar,
        avatarColor: userGameProfile.avatarColor,
        score: userGameProfile.score,
        is_ready: false,
      },
    ],
    game: {
      is_started: false,
    },
  };

  const handleNewGame = (values) => {
    createRoom(values, roomUid)
      .then(() => {
        setCurrentRoomSetting({ roomUid, ...values });
        setPersistentRoomInfo({ roomUid, ...values });
        history.push("/lobby");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  // const handleEnterCode = (values) => {};

  // TODO 방이 안들어가질 경우에 해당 모달을 전송
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  return (
    <>
      {isNewGameModalOpen ? (
        <NewGameModal
          handleCloseModal={() => setIsNewGameModalOpen(false)}
          method={handleNewGame}
          initialValues={initialValues}
          isNewGame
        />
      ) : null}
      {isEnterCodeModalOpen ? (
        <EnterCodeModal
          handleCloseModal={() => setIsEnterCodeModalOpen(false)}
        />
      ) : null}
      {isErrorModalOpen ? (
        <ErrorMessageModal
          handleCloseModal={() => setIsErrorModalOpen(false)}
        />
      ) : null}
      <NewGameTemplate
        setIsNewGameModalOpen={setIsNewGameModalOpen}
        setIsEnterCodeModalOpen={setIsEnterCodeModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
      />
    </>
  );
};

export default NewGame;
