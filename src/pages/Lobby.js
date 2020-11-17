import React, { useEffect, useState } from "react";
import LobbyTemplate from "../components/templates/Lobby/Lobby";
import { useAuth } from "../contexts/UserContext";
import { useRoom } from "../contexts/RoomContext";
import useLocalStorage from "../utils/useLocalStorage";
import NewGameModal from "../components/templates/newGameModal/newGameModal";

const Lobby = () => {
  const {
    getUser,
    currentUser,

    setUserGameProfile,
  } = useAuth();
  const { setCurrentRoomSetting, updateRoomSetting } = useRoom();
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
  const [persistentRoomInfo, setPersistentRoomInfo] = useLocalStorage(
    "roomInfo",
    ""
  );
  const [
    // eslint-disable-next-line no-unused-vars
    persistentuserGameProfile,
    setPersistentuserGameProfile,
  ] = useLocalStorage("persistentUserGameProfile", "");

  useEffect(() => {
    getUser(currentUser.uid)
      .then((user) => {
        const newUser = user.data();
        setUserGameProfile({ ...newUser, user_id: currentUser.uid });
        setPersistentuserGameProfile({ ...newUser, user_id: currentUser.uid });
        return user.data();
      })
      .then((data) => {
        setListItemData([
          {
            avatarColor: data.avatarColor,
            icon: data.avatar,
            isRoomOwner: true,
            nickname: data.nickname,
            onClick: () => {},
            score: data.score,
          },
        ]);
      });
  }, []);

  const { roomUid } = persistentRoomInfo;

  const handleSubmit = (values) => {
    updateRoomSetting(values, roomUid)
      .then(() => {
        setPersistentRoomInfo({ roomUid, ...values });
        setCurrentRoomSetting({ roomUid, ...values });
        setIsNewGameModalOpen(false);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const initialValues = {
    settings: {
      room_name: persistentRoomInfo.settings.room_name,
      limit_time: persistentRoomInfo.settings.limit_time,
      max_players: persistentRoomInfo.settings.max_players,
    },
  };

  return (
    <>
      {isNewGameModalOpen ? (
        <NewGameModal
          isNewGame={false}
          handleCloseModal={() => setIsNewGameModalOpen(false)}
          initialValues={initialValues}
          method={handleSubmit}
        />
      ) : null}
      <LobbyTemplate
        listItemData={listItemData || dummyData}
        room={persistentRoomInfo}
        initialValues={initialValues}
        setIsNewGameModalOpen={setIsNewGameModalOpen}
        method={handleSubmit}
      />
    </>
  );
};

export default Lobby;

/*
1. newGame에서 아바타 컬러, icon, isRoomOwner(컨디셔널로 만들어야함), nickname, score 를 갖고온다.
2. 이 데이터들은 [array] of {objects} 여야한다.
3. onSnapShot 으로 해당 다큐먼트에 변경사항(players항목에 대해)이 있을 때마다 다큐먼트를 fetch해 온다.
4. 이 fetch한 다큐멘터를 map으로 돌려야한다.
*/
