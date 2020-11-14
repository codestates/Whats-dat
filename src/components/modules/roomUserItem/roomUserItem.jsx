import React, { useState } from "react";
import propTypes from "prop-types";
import { ItemBox, NonePaddingAvatar } from "./roomUserItem.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import Icon, { icons } from "../../atoms/icon/icon";
import theme from "../../../styles/Theme";

const RoomUserItem = (props) => {
  const { isRoomOwner, avatarColor, icon, score, nickname, onClick } = props;
  const [isReady, setIsReady] = useState(false);

  const renderCheckIcon = () => {
    return isReady ? "BUTTON_CHECK_SELECT" : "BUTTON_CHECK";
  };

  const getCheckIconColor = () => {
    if (isReady) return "green";
    return isRoomOwner ? "lightGrey" : "grey";
  };

  return (
    <ItemBox
      padding="xxsm"
      bgColor={isRoomOwner ? "secondary" : "white"}
      border
      radius="rounded3Xl"
      boxShadow="shadowMd"
      onClick={() => {
        setIsReady(!isReady);
        onClick(isReady);
      }}
    >
      <div className="row-container">
        <div className="m-left m-right">
          <NonePaddingAvatar sizes="sm" bgColor={avatarColor} logoSize="5rem">
            <Icon color="white" variant={icon} />
          </NonePaddingAvatar>
        </div>
        <div className="m-left m-right">
          <Icon color={getCheckIconColor()} variant={renderCheckIcon()} />
        </div>
        <div className="m-right">
          <Paragraph
            text={nickname}
            color={isRoomOwner ? "white" : "navy"}
            size="base"
            weight="bold"
          />
        </div>
      </div>
      <div className="m-left m-right">
        <Paragraph
          text={`${score}`}
          color={isRoomOwner ? "white" : "grey"}
          size="base"
          weight="bold"
        />
      </div>
    </ItemBox>
  );
};

RoomUserItem.propTypes = {
  isRoomOwner: propTypes.bool,
  avatarColor: propTypes.oneOf(Object.keys(theme.colors)),
  icon: propTypes.oneOf(Object.keys(icons)),
  score: propTypes.number.isRequired,
  nickname: propTypes.string.isRequired,
  onClick: propTypes.func,
};

RoomUserItem.defaultProps = {
  isRoomOwner: false,
};

export default RoomUserItem;
