import React, { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import EnterCodeModal from "../components/templates/enterCodeModal/enterCodeModal";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";
import NewGameModal from "../components/templates/newGameModal/newGameModal";
import NewGameTemplate from "../components/templates/NewGame/NewGame";
import AvatarModal from "../components/templates/avatarModal/avatarModal";

const NewGame = () => {
  const { currentUser, updateNickNameAndAvatar } = useAuth();
  // TODO 방이 안들어가질 경우에 해당 모달을 전송
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(
    !currentUser.displayName
  );

  const options = [
    { key: "AVATAR_SKULL", value: "option1", color: "red" },
    { key: "AVATAR_KIWI", value: "option2", color: "yellow" },
    { key: "AVATAR_ICECREAM", value: "option3", color: "green" },
    { key: "AVATAR_WIZARD", value: "option4", color: "blue" },
    { key: "AVATAR_HORSE", value: "option5", color: "grey" },
    { key: "AVATAR_SMILE", value: "option6", color: "danger" },
  ];

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
      setAvatarModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAvatarModalOpen ? (
        <AvatarModal options={options} method={handleUpdateUserInfo} />
      ) : null}
      {isNewGameModalOpen ? (
        <NewGameModal
          handleCloseModal={() => setIsNewGameModalOpen(false)}
          isNewGame
        />
      ) : null}
      {isEnterCodeModalOpen ? (
        <EnterCodeModal
          handleCloseModal={() => setIsEnterCodeModalOpen(false)}
        />
      ) : null}
      {isErrorModalOpen ? (
        <ErrorMessageModal
          handleCloseModal={() => setIsErrorModalOpen(false)}
        />
      ) : null}
      <NewGameTemplate
        setIsNewGameModalOpen={setIsNewGameModalOpen}
        setIsEnterCodeModalOpen={setIsEnterCodeModalOpen}
        setIsErrorModalOpen={setIsErrorModalOpen}
      />
    </>
  );
};

export default NewGame;
