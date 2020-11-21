import React from "react";
import propTypes from "prop-types";
import Icon from "../../atoms/icon/icon";
import {
  StyledGameProgress,
  StyledGameProgressColumn,
  NonePaddingAvatar,
  Nickname,
} from "./gameProgress.style";

const GameProgressBar = ({ playersList, currentPlayer }) => {
  const renderAvatarLists = (innerPlayersList, innerCurrentPlayer) => {
    return innerPlayersList.map((player, playerIndex) => {
      const { user_id: playerId, nickname, avatar } = player;
      const isLastPlayer = () => innerPlayersList.length - 1 === playerIndex;

      return (
        <React.Fragment key={`${nickname}Fragment`}>
          <StyledGameProgressColumn>
            <NonePaddingAvatar
              border={playerId === innerCurrentPlayer.user_id}
              borderColor="navy"
              borderWidth="0.2rem"
              sizes="xSm"
              bgColor={
                playerId === innerCurrentPlayer.user_id ? "navy" : "grey"
              }
              className="gameProgress__avatar"
            >
              <Icon variant={avatar} color="white" />
            </NonePaddingAvatar>
            <div className="gameProgress__username">
              <Nickname
                weight="exbold"
                size="xSm"
                text={
                  nickname.slice(0, 3).length === nickname.length
                    ? nickname
                    : `${nickname.slice(0, 3)}..`
                }
                color={
                  playerId === innerCurrentPlayer.user_id ? "navy" : "grey"
                }
              />
            </div>
          </StyledGameProgressColumn>

          {isLastPlayer() ? null : (
            <StyledGameProgressColumn>
              <div className="gameProgress__nextIcon">
                <Icon color="navy" variant="BUTTON_RIGHT" />
              </div>
            </StyledGameProgressColumn>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <StyledGameProgress>
      {renderAvatarLists(playersList, currentPlayer)}
    </StyledGameProgress>
  );
};

GameProgressBar.propTypes = {
  playersList: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  currentPlayer: propTypes.objectOf(propTypes.any),
};

export default GameProgressBar;
