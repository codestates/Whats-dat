import React from "react";
import propTypes from "prop-types";
import { ItemBox, NonePaddingAvatar } from "./waitingItem.style";

import Icon, { icons } from "../../atoms/icon/icon";
import Paragraph from "../../atoms/paragraph/paragraph";
import theme from "../../../styles/Theme";

const WaitingItem = (props) => {
  const { nickname, icon, avatarColor, isDrawing } = props;
  return (
    <ItemBox
      padding="xxsm"
      bgColor="white"
      border
      radius="roundedFull"
      boxShadow="shadowMd"
    >
      <div className="m-left m-right">
        <NonePaddingAvatar sizes="xSm" bgColor={avatarColor} logoSize="12rem">
          <Icon color="white" variant={icon} />
        </NonePaddingAvatar>
      </div>
      <div className="m-left m-right">
        <Paragraph
          text={
            isDrawing
              ? `${nickname} is drawing...`
              : `${nickname} is writing...`
          }
          color="grey"
          size="base"
          weight="bold"
        />
      </div>
    </ItemBox>
  );
};

WaitingItem.propTypes = {
  nickname: propTypes.string.isRequired,
  icon: propTypes.oneOf(Object.keys(icons)),
  avatarColor: propTypes.oneOf(Object.keys(theme.colors)),
  isDrawing: propTypes.bool,
};

WaitingItem.defaultProps = {
  isDrawing: false,
};

export default WaitingItem;
