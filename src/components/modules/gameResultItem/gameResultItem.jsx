import React from "react";
import propTypes from "prop-types";
import { ItemBox } from "./gameResultItem.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import Icon from "../../atoms/icon/icon";

const GameResultItem = ({ isWinner, startWord, nickname, handleCardClick }) => {
  return (
    <ItemBox
      padding="sm"
      bgColor={isWinner ? "secondary" : "white"}
      border
      radius="roundedFull"
      boxShadow="shadowMd"
      isWinnerStatus={isWinner}
      onClick={handleCardClick}
    >
      <div className="m-left m-right width">
        <Paragraph
          text={startWord}
          color={isWinner ? "white" : "navy"}
          size="sm"
          weight="bold"
        />
      </div>
      <div className="row-container">
        {isWinner ? (
          <div className="m-left small">
            <Icon color="white" variant="MEDAL" />
          </div>
        ) : null}
        <div className="m-left m-right">
          <Paragraph
            text={nickname}
            color={isWinner ? "white" : "grey"}
            size="sm"
            weight="normal"
          />
        </div>
      </div>
    </ItemBox>
  );
};

GameResultItem.propTypes = {
  isWinner: propTypes.bool,
  startWord: propTypes.string.isRequired,
  nickname: propTypes.string.isRequired,
  handleCardClick: propTypes.func,
};

GameResultItem.defaultProps = {
  isWinner: false,
};

export default GameResultItem;
