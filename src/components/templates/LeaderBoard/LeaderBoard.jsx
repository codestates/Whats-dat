import React from "react";
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

const LeaderBoard = () => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <RankingHeaderContainer>
          <CloseButton size="3">
            <Icon variant="BUTTON_X" color="navy" />
          </CloseButton>
          <RankingTitle text="Rankings" variant="h1" color="navy" />
        </RankingHeaderContainer>
        <RankingItem
          isCurrentUser="true"
          avatarColor="red"
          icon="AVATAR_SMILE"
          ranking="244"
          score="532"
          nickname="my name"
        />
        <ListContainer>
          <InfiniteScroll ListItem={RankingItem} CustomHook={CustomHook} />
        </ListContainer>
      </ResponsiveContainer>
    </>
  );
};

export default LeaderBoard;
