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
    currentJoinedRoom,
    setCurrentJoinedRoom,
    setIsInRoom,
    getRoomNext,
  } = useRoom();
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  // TODO 방이 안들어가질 경우에 해당 모달을 전송
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  useEffect(() => {
    setIsInRoom(false);
    getRoomList();
    console.log("룸리스트");
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
      limit_time: 0,
      max_players: 0,
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
    // game: {
    //   is_started: false,
    // },
  };

  const handleNewGame = (values) => {
    console.log("handleNewGame values임", values);
    Object.assign(values, {
      settings: {
        room_name: values.settings.room_name,
        limit_time: parseInt(values.settings.limit_time, 10),
        max_players: values.settings.max_players,
      },
    });

    if (values.settings.limit_time < 1) {
      setIsErrorModalOpen(true);
      setErrorMessage({
        title: "Please select time limit 😱",
      });
      return;
    }

    if (values.settings.room_name.length < 1) {
      setIsErrorModalOpen(true);
      setErrorMessage({
        title: "You must enter room name 😱",
      });
      return;
    }

    createRoom(values, roomUid)
      .then(() => {
        setCurrentJoinedRoom({ roomUid, ...values });
        getRoomList();
        history.push("/lobby");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    console.log(currentJoinedRoom);
  };

  useEffect(() => {
    console.log("currentJoinedRoom:", currentJoinedRoom);
  }, [currentJoinedRoom]);

  const handleJoinRoom = async (code) => {
    await joinRoom(code, setErrorMessage);
    await getJoinedRoomInfo(code);

    // TODO 고쳐야함...
    setTimeout(() => {
      history.push("/lobby");
    }, 750);
  };

  useEffect(() => {
    if (!errorMessage) {
      setIsErrorModalOpen(false);
    } else {
      setIsErrorModalOpen(true);
    }
  }, [errorMessage]);

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
          errorMessage={errorMessage}
          handleCloseModal={() => setIsErrorModalOpen(false)}
        />
      ) : null}
      <NewGameTemplate
        setIsNewGameModalOpen={setIsNewGameModalOpen}
        setIsEnterCodeModalOpen={setIsEnterCodeModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
        listItemData={roomList}
        getRoomNext={getRoomNext}
        joinRoom={handleJoinRoom}
      />
    </>
  );
};

export default NewGame;
