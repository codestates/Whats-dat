import React from "react";
import { useHistory } from "react-router-dom";
import AvatarModal from "../components/templates/avatarModal/avatarModal";
import Background from "../components/atoms/background/Background";
import { useAuth } from "../contexts/UserContext";

const Setting = () => {
  const { currentUser, updateNickNameAndAvatar } = useAuth();
  const history = useHistory();

  const handleUpdateUserInfo = async (profile) => {
    const userProfile = {
      displayName: profile.nickname,
      photoURL: JSON.stringify({
        avatar: profile.radioOption,
        avatarColor: profile.color,
      }),
    };

    try {
      await updateNickNameAndAvatar(userProfile);
      history.push("/new-game");
    } catch (err) {
      console.log(err);
    }
  };

  const options = [
    { key: "AVATAR_SKULL", value: "option1", color: "red" },
    { key: "AVATAR_KIWI", value: "option2", color: "yellow" },
    { key: "AVATAR_ICECREAM", value: "option3", color: "green" },
    { key: "AVATAR_WIZARD", value: "option4", color: "blue" },
    { key: "AVATAR_HORSE", value: "option5", color: "grey" },
    { key: "AVATAR_SMILE", value: "option6", color: "danger" },
  ];

  return (
    <>
      <Background />
      <AvatarModal
        options={options}
        method={handleUpdateUserInfo}
        currentUser={currentUser}
      />
    </>
  );
};

export default Setting;
