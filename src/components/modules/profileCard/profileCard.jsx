import React from "react";
import propTypes from "prop-types";
import ProfileCardBox from "./profileCard.style";
import Avatar from "../../atoms/avatar/avatar";
import Paragraph from "../../atoms/paragraph/paragraph";
import Icon from "../../atoms/icon/icon";

const ProfileCard = ({ name, avatar, rank, AllUsers }) => {
  return (
    <ProfileCardBox>
      <Avatar sizes="md" bgColor="primary" className="profile_avatar">
        <Icon variant={avatar} color="white" />
      </Avatar>
      <Paragraph
        text={name}
        color="navy"
        weight="exbold"
        size="xl"
        className="profile_name"
      />
      <Paragraph
        text={`${rank}/${AllUsers}`}
        color="grey"
        weight="bold"
        className="profile_rank"
      />
    </ProfileCardBox>
  );
};

ProfileCard.propTypes = {
  name: propTypes.string,
  avatar: propTypes.string,
  rank: propTypes.number,
  AllUsers: propTypes.number,
};

export default ProfileCard;
