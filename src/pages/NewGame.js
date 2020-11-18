import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import EnterCodeModal from "../components/templates/enterCodeModal/enterCodeModal";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";
import NewGameModal from "../components/templates/newGameModal/newGameModal";
import NewGameTemplate from "../components/templates/NewGame/NewGame";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";

const NewGame = () => {
  const { getUser, currentUser, userGameProfile } = useAuth();
  const {
    createRoom,
    getRoomList,
    roomList,
    joinRoom,
    getJoinedRoomInfo,
    setCurrentJoinedRoom,
  } = useRoom();

  const history = useHistory();

  useEffect(() => {
    getRoomList();
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
    created_at: "",
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
        // setPersistentRoomInfo({ roomUid, ...values });
        console.log(
          "iam about to set current joined room, roomUid",
          roomUid,
          values
        );
        setCurrentJoinedRoom({ roomUid, ...values });
        getRoomList();
        history.push("/lobby");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleJoinRoom = (code) => {
    joinRoom(code);
    getJoinedRoomInfo(code);

    // TODO 고쳐야함...
    setTimeout(() => {
      history.push("/lobby");
    }, 750);
  };

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
          method={handleJoinRoom}
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
        listItemData={roomList}
        joinRoom={handleJoinRoom}
      />
    </>
  );
};

export default NewGame;
