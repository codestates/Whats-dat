import React from "react";
import propTypes from "prop-types";
import Icon from "../../atoms/icon/icon";
import Paragraph from "../../atoms/paragraph/paragraph";
import {
  StyledGameProgress,
  StyledGameProgressColumn,
  NonePaddingAvatar,
} from "./gameProgress.style";

// completed gameProgress

const GameProgressBar = ({ playersList, currentPlayer }) => {
  const renderAvatarLists = (innerPlayersList, innerCurrentPlayer) => {
    return innerPlayersList.map((player, playerIndex) => {
      const { player_id: playerId, username, avatar } = player;
      const isLastPlayer = () => innerPlayersList.length - 1 === playerIndex;

      return (
        <>
          <StyledGameProgressColumn>
            <NonePaddingAvatar
              border={playerId === innerCurrentPlayer.player_id}
              borderColor="primary"
              borderWidth="0.2rem"
              sizes="xSm"
              className="gameProgress__avatar"
            >
              <Icon variant={avatar} color="white" />
            </NonePaddingAvatar>
            <div className="gameProgress__username">
              <Paragraph
                size="xSm"
                text={
                  username.slice(0, 5).length === username.length
                    ? username
                    : `${username.slice(0, 5)}...`
                }
                color={
                  playerId === innerCurrentPlayer.player_id ? "navy" : "grey"
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
        </>
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
  playersList: propTypes.shape([
    {
      player_id: propTypes.string,
      username: propTypes.string,
      avatar: propTypes.string,
    },
  ]),
  currentPlayer: propTypes.shape({
    player_id: propTypes.string,
    username: propTypes.string,
    avatar: propTypes.string,
  }),
};

export default GameProgressBar;
