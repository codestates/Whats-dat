import React from "react";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import ProfileCard from "../../modules/profileCard/profileCard";
import Icon from "../../atoms/icon/icon";
import {
  ProfileTitle,
  CloseButton,
  ButtonListContainer,
  HeaderContainer,
} from "./MyPage.style";
import ButtonList from "../../modules/ButtonList/buttonList";

const MyPage = ({ userGameProfile, method, handleClose }) => {
  const items = [
    // {
    //   text: "Leaderboard",
    //   color: "secondary",
    //   link: "/leaderboard",
    // },
    {
      text: "Setting",
      color: "secondary",
      link: "/setting",
    },
    {
      text: "Sign Out",
      color: "tertiary",
      onClick: () => {
        method(true);
      },
    },
  ];

  return (
    <>
      {/* TODO:Router refactor */}
      <ResponsiveContainer>
        <HeaderContainer>
          <CloseButton size={3} onClick={handleClose}>
            <Icon variant="BUTTON_X" color="navy" />
          </CloseButton>
          <ProfileTitle
            variant="h1"
            text="My Profile"
            color="navy"
            weight="normal"
          />
          <ProfileCard
            avatar={userGameProfile.avatar || "AVATAR_KIWI"}
            color={userGameProfile.avatarColor || "green"}
            // rank={123}
            // AllUsers={1234}
            name={userGameProfile.nickname}
          />
        </HeaderContainer>
        <ButtonListContainer>
          <ButtonList items={items} size="normal" />
        </ButtonListContainer>
      </ResponsiveContainer>
    </>
  );
};

MyPage.propTypes = {
  method: propTypes.func,
  userGameProfile: propTypes.shape({
    nickname: propTypes.string,
    score: propTypes.number,
    avatarColor: propTypes.string,
    avatar: propTypes.string,
  }),
  handleClose: propTypes.func,
};

export default MyPage;
