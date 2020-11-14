import React from "react";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Icon from "../../atoms/icon/icon";
import UserList from "../../modules/list/list";

import {
  LobbyHeader,
  Settingbutton,
  ExitButton,
  GameSecond,
  RoomCode,
  RoomTitle,
  GameMode,
  CurrentUserNum,
  SettingBox,
} from "./Lobby.style";

const Lobby = () => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <LobbyHeader>
          <SettingBox>
            <Settingbutton size="3">
              <Icon variant="BUTTON_SETTING" color="secondary" />
            </Settingbutton>
            <GameSecond text="30s" color="secondary" />
            <GameMode text="Free Mode" color="secondary" />
          </SettingBox>
          <ExitButton size="3">
            <Icon variant="BUTTON_EXIT" color="secondary" />
          </ExitButton>
          <RoomCode text="ABCD" color="navy" size="xl" weight="bold" />
          <RoomTitle text="Room Title" color="navy" variant="h2" />
          <CurrentUserNum text="6/6" color="navy" size="lg" weight="bold" />
        </LobbyHeader>
        <UserList
          listItemName="RoomUserItem"
          listItemData={[
            {
              avatarColor: "blue",
              icon: "AVATAR_HORSE",
              isRoomOwner: true,
              nickname: "판교불닭",
              onClick: () => {},
              score: 3003,
            },
            {
              avatarColor: "green",
              icon: "AVATAR_KIWI",
              isRoomOwner: false,
              nickname: "리트리버",
              onClick: function noRefCheck() {},
              score: 1004,
            },
            {
              avatarColor: "green",
              icon: "AVATAR_KIWI",
              isRoomOwner: false,
              nickname: "리트리버",
              onClick: function noRefCheck() {},
              score: 1004,
            },
            {
              avatarColor: "green",
              icon: "AVATAR_KIWI",
              isRoomOwner: false,
              nickname: "리트리버",
              onClick: function noRefCheck() {},
              score: 1004,
            },
            {
              avatarColor: "green",
              icon: "AVATAR_KIWI",
              isRoomOwner: false,
              nickname: "리트리버",
              onClick: function noRefCheck() {},
              score: 1004,
            },
            {
              avatarColor: "green",
              icon: "AVATAR_KIWI",
              isRoomOwner: false,
              nickname: "리트리버",
              onClick: function noRefCheck() {},
              score: 1004,
            },
          ]}
        />
      </ResponsiveContainer>
    </>
  );
};

export default Lobby;
