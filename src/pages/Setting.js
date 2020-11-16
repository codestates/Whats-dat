import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AvatarModal from "../components/templates/avatarModal/avatarModal";
import Background from "../components/atoms/background/Background";
import { useAuth } from "../contexts/UserContext";

const Setting = () => {
  const {
    getUser,
    currentUser,
    userGameProfile,
    setUserGameProfile,
    updateUserGameProfile,
    createUserGameProfile,
  } = useAuth();
  const history = useHistory();
  const [initialValues] = useState(userGameProfile);

  useEffect(() => {
    if (userGameProfile && !userGameProfile.nickname.length) {
      createUserGameProfile(currentUser.uid).then(() => {
        console.log("createUserGameProfile하고 난 후");
        getUser(currentUser.uid)
          .then((userData) => {
            console.dir(userData);
            setUserGameProfile(userData.data());
            // history.push("/my-page");
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      });
    }
  }, []);

  const handleUpdateUserInfo = async (newUserGameProfile) => {
    try {
      await updateUserGameProfile(newUserGameProfile);
      setUserGameProfile(newUserGameProfile);
      history.push("/new-game");
    } catch (err) {
      throw new Error(err);
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
        handleCloseModal={() => history.push("/my-page")}
      />
    </>
  );
};

export default Setting;

// ANCHOR
// 1. 프라이빗라우트 func => node || func
// 2. a -> link
// 3. temp profile

// TODO :
// setting을 refresh했을 때 userGameProfile 값이 초기화됨....ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
// social login시 setting -> avatar 클릭 시 avatar of undefined -> refresh하면 잘 됨...
// my profile 클릭 범위
