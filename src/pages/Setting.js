import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AvatarModal from "../components/templates/avatarModal/avatarModal";
import Background from "../components/atoms/background/Background";
import { useAuth } from "../contexts/UserContext";

const Setting = () => {
  const { userGameProfile, updateUserGameProfile, getUser } = useAuth();
  const history = useHistory();

  const initialValues = {
    nickname: "",
    avatar: "",
    avatarColor: "",
  };

  const handleUpdateUserInfo = async (newUserGameProfile) => {
    try {
      await updateUserGameProfile(newUserGameProfile);
      history.push("/new-game");
    } catch (err) {
      console.log(err);
    }
  };

  const options = [
    { avatar: "AVATAR_SKULL", value: "option1", avatarColor: "red" },
    { avatar: "AVATAR_KIWI", value: "option2", avatarColor: "yellow" },
    { avatar: "AVATAR_ICECREAM", value: "option3", avatarColor: "green" },
    { avatar: "AVATAR_WIZARD", value: "option4", avatarColor: "blue" },
    { avatar: "AVATAR_HORSE", value: "option5", avatarColor: "grey" },
    { avatar: "AVATAR_SMILE", value: "option6", avatarColor: "danger" },
  ];

  return (
    <>
      <Background />
      <AvatarModal
        options={options}
        method={handleUpdateUserInfo}
        initialValues={initialValues}
        userGameProfile={userGameProfile}
        handleCloseModal={() => history.push("/my-page")}
      />
    </>
  );
};

export default Setting;
