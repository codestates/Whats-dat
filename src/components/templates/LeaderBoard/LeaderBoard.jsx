import React from "react";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Icon from "../../atoms/icon/icon";
import InfiniteScroll from "../../modules/infiniteScroll/infiniteScroll";
import RankingItem from "../../modules/rankingItem/rankingItem";
import {
  CloseButton,
  RankingTitle,
  ListContainer,
  RankingHeaderContainer,
} from "./LeaderBoard.style";
import CustomHook from "./CustomHook";

const LeaderBoard = ({ handleClose, userGameProfile }) => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <RankingHeaderContainer>
          <CloseButton size="3" onClick={handleClose}>
            <Icon variant="BUTTON_X" color="navy" />
          </CloseButton>
          <RankingTitle text="Rankings" variant="h1" color="navy" />
        </RankingHeaderContainer>
        <RankingItem
          isCurrentUser="true"
          avatarColor={userGameProfile.avatarColor}
          icon={userGameProfile.avatar}
          ranking="244" // TODO ranking 하드코딩 한걸 바꿔줘야함
          score={userGameProfile.score}
          nickname={userGameProfile.nickname}
        />
        <ListContainer>
          <InfiniteScroll ListItem={RankingItem} CustomHook={CustomHook} />
        </ListContainer>
      </ResponsiveContainer>
    </>
  );
};
LeaderBoard.propTypes = {
  handleClose: propTypes.func,
  userGameProfile: propTypes.objectOf,
};

export default LeaderBoard;
