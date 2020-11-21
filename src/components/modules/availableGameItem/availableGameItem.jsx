import React from "react";
import propTypes from "prop-types";
import { ItemBox } from "./availableGameItem.style";
import Paragraph from "../../atoms/paragraph/paragraph";

const AvailableGameItem = ({
  roomCode,
  roomName,
  curNumPlayers,
  maxNumPlayers,
  className,
  onClick,
}) => {
  return (
    <ItemBox
      padding="base"
      bgColor="white"
      border
      radius="rounded3Xl"
      boxShadow="shadowMd"
      className={className}
      onClick={onClick}
    >
      <div className="row-container">
        <div className="m-left">
          <Paragraph
            text={roomCode}
            color="darkGrey"
            size="sm"
            weight="exbold"
          />
        </div>
        <div className="m-left m-right">
          <Paragraph
            text={
              roomName.length > 23 ? `${roomName.slice(0, 23)}...` : roomName
            }
            color="darkGrey"
            size="sm"
            weight="normal"
            className="gameItem__roomname"
          />
        </div>
      </div>
      <div className="row-container">
        <Paragraph
          text={`${curNumPlayers}`}
          color="grey"
          size="sm"
          weight="normal"
        />
        <Paragraph text="/" color="grey" size="sm" weight="normal" />
        <Paragraph
          text={`${maxNumPlayers}`}
          color="grey"
          size="sm"
          weight="normal"
        />
      </div>
    </ItemBox>
  );
};

AvailableGameItem.propTypes = {
  roomCode: propTypes.string.isRequired,
  roomName: propTypes.string.isRequired,
  curNumPlayers: propTypes.number.isRequired,
  maxNumPlayers: propTypes.number.isRequired,
  className: propTypes.string,
  onClick: propTypes.func,
};

export default AvailableGameItem;
