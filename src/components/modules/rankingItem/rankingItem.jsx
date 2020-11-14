import React from "react";
import propTypes from "prop-types";
import { ItemBox, NonePaddingAvatar } from "./rankingItem.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import Icon, { icons } from "../../atoms/icon/icon";
import theme from "../../../styles/Theme";

const nth = (d) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const RankingItem = (props) => {
  const { isCurrentUser, avatarColor, icon, ranking, score, nickname } = props;
  return (
    <ItemBox
      padding="xxsm"
      bgColor={isCurrentUser ? "secondary" : "white"}
      border
      radius="rounded2Xl"
      boxShadow="shadowMd"
    >
      <div className="row-container">
        <div className="m-left m-right">
          <NonePaddingAvatar sizes="sm" bgColor={avatarColor} logoSize="5rem">
            <Icon color="white" variant={icon} />
          </NonePaddingAvatar>
        </div>
        <div className="m-left m-right">
          <div className="col-container">
            <div className="font-size">
              <Paragraph
                text={`${ranking + nth(ranking)}`}
                color={isCurrentUser ? "white" : "grey"}
                size="sm"
                weight="bold"
              />
            </div>
            <Paragraph
              text={nickname}
              color={isCurrentUser ? "white" : "navy"}
              size="base"
              weight="bold"
            />
          </div>
        </div>
      </div>
      <div className="m-left m-right">
        <Paragraph
          text={`${score}`}
          color={isCurrentUser ? "white" : "grey"}
          size="base"
          weight="bold"
        />
      </div>
    </ItemBox>
  );
};

RankingItem.propTypes = {
  isCurrentUser: propTypes.bool,
  avatarColor: propTypes.oneOf(Object.keys(theme.colors)),
  icon: propTypes.oneOf(Object.keys(icons)),
  ranking: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
  nickname: propTypes.string.isRequired,
};

RankingItem.defaultProps = {
  isCurrentUser: false,
};

export default RankingItem;
