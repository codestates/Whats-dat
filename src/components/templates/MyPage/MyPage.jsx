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

const MyPage = ({ currentUser, method, handleClose }) => {
  const items = [
    {
      text: "Leaderboard",
      color: "secondary",
      link: "/leaderboard",
    },
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
      <Background />
      <ResponsiveContainer>
        <HeaderContainer>
          <CloseButton size="3" onClick={handleClose}>
            <Icon variant="BUTTON_X" color="navy" />
          </CloseButton>
          <ProfileTitle
            variant="h1"
            text="My Profile"
            color="navy"
            weight="normal"
          />
          <ProfileCard
            avatar={JSON.parse(currentUser.photoURL).avatar}
            color={JSON.parse(currentUser.photoURL).avatarColor}
            rank="123"
            AllUsers="1234"
            name={currentUser.displayName}
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
  currentUser: propTypes.objectOf,
  handleClose: propTypes.func,
};

export default MyPage;
