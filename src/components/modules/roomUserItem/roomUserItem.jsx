import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { ItemBox, NonePaddingAvatar } from "./roomUserItem.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import Icon, { icons } from "../../atoms/icon/icon";
import theme from "../../../styles/Theme";
import { useAuth } from "../../../contexts/UserContext";
import { useRoom } from "../../../contexts/RoomContext";

const RoomUserItem = (props) => {
  const {
    handleUserReady,
    isRoomOwner,
    avatarColor,
    icon,
    score,
    nickname,
    // onClick,
    // eslint-disable-next-line camelcase
    user_id,
    // eslint-disable-next-line camelcase
  } = props;
  const [isReady, setIsReady] = useState(false);
  const { currentUser } = useAuth();
  const { currentJoinedRoom } = useRoom();

  useEffect(() => {
    if (currentJoinedRoom !== undefined) {
      console.log("roomUserItem/currentJoinedRoom", currentJoinedRoom);
      currentJoinedRoom.players.forEach((player) => {
        // eslint-disable-next-line camelcase
        if (player.user_id === user_id) {
          setIsReady(player.is_ready);
        }
      });
    }
  }, [currentJoinedRoom]);

  const renderCheckIcon = () => {
    return isReady ? "BUTTON_CHECK_SELECT" : "BUTTON_CHECK";
  };

  const getCheckIconColor = () => {
    if (isReady) return "green";
    // eslint-disable-next-line camelcase
    return "grey";
  };

  return (
    <ItemBox
      padding="xxsm"
      // eslint-disable-next-line camelcase
      bgColor={user_id === currentUser.uid ? "lightGrey" : "white"}
      border
      radius="rounded3Xl"
      boxShadow="shadowMd"
      onClick={() => {
        // eslint-disable-next-line camelcase
        if (user_id === currentUser.uid) {
          setIsReady(!isReady);
          handleUserReady();
        }
        // onClick(isReady);
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
            text={isRoomOwner ? `👑  ${nickname}` : nickname}
            // eslint-disable-next-line camelcase
            color="navy"
            size="base"
            weight="bold"
          />
        </div>
      </div>
      <div className="m-left m-right">
        <Paragraph
          text={`${score}`}
          // eslint-disable-next-line camelcase
          color="grey"
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
  // onClick: propTypes.func,
  handleUserReady: propTypes.func,
  user_id: propTypes.string,
};

RoomUserItem.defaultProps = {
  isRoomOwner: false,
};

export default RoomUserItem;
