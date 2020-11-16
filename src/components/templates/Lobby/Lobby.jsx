import React from "react";
import propTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Icon from "../../atoms/icon/icon";
import UserList from "../../modules/list/list";

import {
  LobbyHeader,
  ExitButton,
  GameSecond,
  RoomCode,
  RoomTitle,
  CurrentUserNum,
  SettingBox,
} from "./Lobby.style";

// const dummyData = [
//   {
//     avatarColor: "blue",
//     icon: "AVATAR_HORSE",
//     isRoomOwner: true,
//     nickname: "판교불닭",
//     onClick: () => {},
//     score: 3003,
//   },
// ];
//   {
//     avatarColor: "green",
//     icon: "AVATAR_KIWI",
//     isRoomOwner: false,
//     nickname: "리트리버",
//     onClick: function noRefCheck() {},
//     score: 1004,
//   },
//   {
//     avatarColor: "green",
//     icon: "AVATAR_KIWI",
//     isRoomOwner: false,
//     nickname: "리트리버",
//     onClick: function noRefCheck() {},
//     score: 1004,
//   },
//   {
//     avatarColor: "green",
//     icon: "AVATAR_KIWI",
//     isRoomOwner: false,
//     nickname: "리트리버",
//     onClick: function noRefCheck() {},
//     score: 1004,
//   },
//   {
//     avatarColor: "green",
//     icon: "AVATAR_KIWI",
//     isRoomOwner: false,
//     nickname: "리트리버",
//     onClick: function noRefCheck() {},
//     score: 1004,
//   },
//   {
//     avatarColor: "green",
//     icon: "AVATAR_KIWI",
//     isRoomOwner: false,
//     nickname: "리트리버",
//     onClick: function noRefCheck() {},
//     score: 1004,
//   },
// ];

const Lobby = ({ listItemData, room, setIsNewGameModalOpen }) => {
  const history = useHistory();

  return (
    <>
      <Background />
      <ResponsiveContainer>
        <LobbyHeader>
          <SettingBox>
            <Icon
              onClick={() => setIsNewGameModalOpen(true)}
              variant="BUTTON_SETTING"
              color="secondary"
            />
            <GameSecond text={room.settings.limit_time} color="secondary" />
          </SettingBox>
          <ExitButton size="3">
            <Icon
              variant="BUTTON_EXIT"
              color="secondary"
              onClick={() => history.push("/new-game")}
            />
          </ExitButton>
          <RoomCode text={room.roomUid} color="navy" size="xl" weight="bold" />
          <RoomTitle text={room.settings.room_name} color="navy" variant="h2" />
          <CurrentUserNum
            text={`${4}/${room.settings.max_players}`}
            color="navy"
            size="lg"
            weight="bold"
          />
        </LobbyHeader>
        <UserList listItemName="RoomUserItem" listItemData={listItemData} />
      </ResponsiveContainer>
    </>
  );
};

Lobby.propTypes = {
  listItemData: propTypes.arrayOf(
    propTypes.shape({
      avatarColor: propTypes.string,
      icon: propTypes.string,
      isRoomOwner: propTypes.boolean,
      nickname: propTypes.string,
      onClick: propTypes.func,
      score: propTypes.number,
    })
  ),
  room: propTypes.objectOf(propTypes.any),

  setIsNewGameModalOpen: propTypes.func,
};
export default Lobby;
