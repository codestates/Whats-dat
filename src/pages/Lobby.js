import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LobbyTemplate from "../components/templates/Lobby/Lobby";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";
import NewGameModal from "../components/templates/newGameModal/newGameModal";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";

const Lobby = () => {
  const { getUser, currentUser, setUserGameProfile } = useAuth();

  const {
    isGameStarted,
    setCurrentRoomSetting,
    updateRoomSetting,
    currentJoinedRoom,
    updatePlayerReady,
    leaveRoom,
    persistentCurrentRoomCode,
    getJoinedRoomInfo,
  } = useRoom();
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  const [listItemData, setListItemData] = useState([
    {
      avatarColor: "blue",
      icon: "AVATAR_HORSE",
      isRoomOwner: true,
      nickname: "우리가 해냈어여",
      onClick: () => {},
      score: 3003,
    },
  ]);
  const dummyData = [
    {
      avatarColor: "blue",
      icon: "AVATAR_HORSE",
      isRoomOwner: true,
      nickname: "0",
      onClick: () => {},
      score: 0,
    },
  ];
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUser(currentUser.uid).then((user) => {
      setUserGameProfile(user.data());
    });
  }, [currentJoinedRoom]);

  useEffect(() => {
    if (isGameStarted) {
      history.push("/game");
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (currentJoinedRoom !== undefined) {
      const playersData = currentJoinedRoom.players.map((player) => {
        return {
          user_id: player.user_id,
          avatarColor: player.avatarColor,
          icon: player.avatar,
          isRoomOwner: player.user_id === currentJoinedRoom.host,
          nickname: player.nickname,
          is_ready: false,
          score: player.score,
        };
      });
      setListItemData(playersData);
    } else {
      getJoinedRoomInfo(persistentCurrentRoomCode);
    }
  }, [currentJoinedRoom]);

  const handleUserReady = () => {
    updatePlayerReady(currentJoinedRoom.roomUid, currentUser.uid);
  };
  const handleLeaveRoom = async () => {
    await leaveRoom(currentJoinedRoom.roomUid, currentUser.uid);

    history.push("/new-game");
  };

  const handleSubmit = (values) => {
    if (currentUser.uid !== currentJoinedRoom.host) {
      setIsErrorModalOpen(true);
      return;
    }

    if (values.settings.limit_time < 1) {
      throw new Error("제한 시간을 선택해주세요.");
    }
    updateRoomSetting(values, currentJoinedRoom.roomUid)
      .then(() => {
        setCurrentRoomSetting({
          roomUid: currentJoinedRoom.roomUid,
          ...values,
        });
        setIsNewGameModalOpen(false);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  return (
    <>
      {isErrorModalOpen ? (
        <ErrorMessageModal
          handleCloseModal={() => setIsErrorModalOpen(false)}
          errorMessage={{
            title: "You are not allowed to change the room setting",
          }}
        />
      ) : null}
      {isNewGameModalOpen ? (
        <NewGameModal
          isNewGame={false}
          handleCloseModal={() => setIsNewGameModalOpen(false)}
          initialValues={currentJoinedRoom}
          method={handleSubmit}
        />
      ) : null}
      <LobbyTemplate
        listItemData={listItemData || dummyData}
        currentJoinedRoom={currentJoinedRoom}
        setIsNewGameModalOpen={setIsNewGameModalOpen}
        method={handleSubmit}
        handleUserReady={handleUserReady}
        handleLeaveRoom={handleLeaveRoom}
        persistentCurrentRoomCode={persistentCurrentRoomCode}
      />
    </>
  );
};

export default Lobby;
