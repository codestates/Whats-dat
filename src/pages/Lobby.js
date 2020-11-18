import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LobbyTemplate from "../components/templates/Lobby/Lobby";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";

import NewGameModal from "../components/templates/newGameModal/newGameModal";

const Lobby = () => {
  const { getUser, currentUser, setUserGameProfile } = useAuth();
  const {
    setCurrentRoomSetting,
    updateRoomSetting,
    currentJoinedRoom,
    getLobbySnapshot,
    updatePlayerReady,
    leaveRoom,
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

  const history = useHistory();

  useEffect(() => {
    // getLobbySnapshot(currentJoinedRoom.roomUid);
    getUser(currentUser.uid).then((user) => {
      setUserGameProfile(user.data());
    });
  }, []);

  useEffect(() => {
    const playersData = currentJoinedRoom.players.map((player) => {
      return {
        user_id: player.user_id,
        avatarColor: player.avatarColor,
        icon: player.avatar,
        isRoomOwner: player.user_id === currentJoinedRoom.host,
        nickname: player.nickname,
        is_ready: false,
        onClick: () => {
          // updatePlayerReady;
        },
        score: player.score,
      };
    });
    setListItemData(playersData);
  }, [currentJoinedRoom]);

  const handleUserReady = () => {
    updatePlayerReady(currentJoinedRoom.roomUid, currentUser.uid);
  };

  const handleLeaveRoom = async () => {
    await leaveRoom(currentJoinedRoom.roomUid, currentUser.uid);
    history.push("/new-game");
  };

  /*
/ TODO: 게임 생성시 플레이 순서 랜덤 생성
// const shufflePlayers = function (players) {
//     const copy = players.slice();
//     for (let i = players.length - 1; i > 0; i -= 1) {
//       const j = Math.floor(Math.random() * i);
//       [copy[i], copy[j]] = [copy[j], copy[i]];
//     }
//     return copy;
//   };

// playOrder = [ user_id, user_id, user_id, user_id, user_id, user_id ]


    collection('game_log').doc("0").update({
      playOrder : [user_id, user_id, user_id, user_id],
      rounds: {
        "0": {}
      },
      status: "standBy"
})
  */
  const handleSubmit = (values) => {
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
      />
    </>
  );
};

export default Lobby;
