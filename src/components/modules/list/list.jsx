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

const List = ({ listItemName, listItemData, className, onClick }) => {
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
            onClick={onClick}
          />
        ));
      case "RankingItem":
        return listItemData.map((item) => (
          <RankingItem key={item.nickname} {...item} />
        ));
      case "RoomUserItem":
        return listItemData.map((item) => (
          <RoomUserItem key={item.nickname} {...item} />
        ));
      default:
        return null;
    }
  };
  const renderGameResultList = () => {
    return listItemData.map((item) => (
      <GameResultItem
        // eslint-disable-next-line no-console
        onClick={() => console.log(item)}
        key={item.nickname}
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
};

export default List;
