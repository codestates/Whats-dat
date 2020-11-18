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
  Settingbutton,
} from "./Lobby.style";

const Lobby = ({
  listItemData,
  currentJoinedRoom,
  setIsNewGameModalOpen,
  handleUserReady,
  handleLeaveRoom,
}) => {
  const history = useHistory();
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <LobbyHeader>
          <SettingBox>
            <Settingbutton size={3}>
              <Icon
                onClick={() => setIsNewGameModalOpen(true)}
                variant="BUTTON_SETTING"
                color="secondary"
              />
            </Settingbutton>
            {currentJoinedRoom ? (
              <GameSecond
                text={
                  currentJoinedRoom.settings &&
                  currentJoinedRoom.settings.limit_time
                }
                color="secondary"
              />
            ) : null}
          </SettingBox>
          <ExitButton size={3}>
            <Icon
              variant="BUTTON_EXIT"
              color="secondary"
              onClick={() => handleLeaveRoom()}
            />
          </ExitButton>
          {currentJoinedRoom ? (
            <RoomCode
              text={currentJoinedRoom.roomUid}
              color="navy"
              size="xl"
              weight="bold"
            />
          ) : null}
          {currentJoinedRoom ? (
            <RoomTitle
              text={
                currentJoinedRoom.settings &&
                currentJoinedRoom.settings.room_name
              }
              color="navy"
              variant="h2"
            />
          ) : null}
          {currentJoinedRoom ? (
            <CurrentUserNum
              text={
                currentJoinedRoom.players &&
                `${currentJoinedRoom.players.length}/${currentJoinedRoom.settings.max_players}`
              }
              color="navy"
              size="lg"
              weight="bold"
            />
          ) : null}
        </LobbyHeader>
        <UserList
          listItemName="RoomUserItem"
          listItemData={listItemData}
          handleUserReady={handleUserReady}
        />
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
  currentJoinedRoom: propTypes.objectOf(propTypes.any),
  setIsNewGameModalOpen: propTypes.func,
  handleUserReady: propTypes.func,
  handleLeaveRoom: propTypes.func,
};
export default Lobby;
