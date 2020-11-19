import React from "react";
import propTypes from "prop-types";
import { GapContainer, FlexWrapContainer } from "./list.style";

import GameResultItem from "../gameResultItem/gameResultItem";
import WaitingItem from "../waitingItem/waitingItem";
import AvailableGameItem from "../availableGameItem/availableGameItem";
import RankingItem from "../rankingItem/rankingItem";
import RoomUserItem from "../roomUserItem/roomUserItem";

export const allListItems = {
  GameResultItem: "GameResultItem",
  WaitingItem: "WaitingItem",
  AvailableGameItem: "AvailableGameItem",
  RankingItem: "RankingItem",
  RoomUserItem: "RoomUserItem",
};

const List = ({
  listItemName,
  listItemData,
  className,
  joinRoom,
  handleUserReady,
  onClick,
  persistentCurrentRoomCode,
}) => {
  const renderList = () => {
    switch (listItemName) {
      case "WaitingItem":
        return listItemData.map((item) => (
          <WaitingItem key={item.nickname} {...item} />
        ));
      case "AvailableGameItem":
        return listItemData.map((item, index) => (
          <AvailableGameItem
            key={`${item.roomName}${index}`}
            {...item}
            className={className}
            onClick={() => {
              joinRoom(item.roomCode);
            }}
          />
        ));
      case "RankingItem":
        return listItemData.map((item) => (
          <RankingItem key={item.nickname} {...item} />
        ));
      case "RoomUserItem":
        return listItemData.map((item) => (
          <RoomUserItem
            handleUserReady={handleUserReady}
            key={item.user_id}
            {...item}
          />
        ));
      default:
        return null;
    }
  };
  const renderGameResultList = () => {
    return listItemData.map((item, i) => (
      <GameResultItem
        // eslint-disable-next-line no-console
        handleCardClick={() => onClick(i)}
        key={i}
        startWord={item[0].start_word}
        nickname={item[0].username}
        persistentCurrentRoomCode={persistentCurrentRoomCode}
        {...item}
      />
    ));
  };

  return listItemName === "GameResultItem" ? (
    <FlexWrapContainer>{renderGameResultList()}</FlexWrapContainer>
  ) : (
    <GapContainer>{renderList()}</GapContainer>
  );
};

List.propTypes = {
  listItemName: propTypes.oneOf(Object.keys(allListItems)),
  listItemData: propTypes.arrayOf(propTypes.any),
  className: propTypes.string,
  onClick: propTypes.func,
  joinRoom: propTypes.func,
  handleUserReady: propTypes.func,
  persistentCurrentRoomCode: propTypes.string,
};

export default List;
