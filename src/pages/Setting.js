import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AvatarModal from "../components/templates/avatarModal/avatarModal";
import { useAuth } from "../contexts/UserContext";
import useLocalStorage from "../utils/useLocalStorage";

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
  const [initialValues] = useState({
    avatar: "",
    avatarColor: "",
    nickname: "",
    score: 0,
  });
  const [
    persistentUserGameProfile,
    setPersistentUserGameProfile,
  ] = useLocalStorage("persistentUserGameProfile", userGameProfile);

  useEffect(() => {
    if (
      !persistentUserGameProfile ||
      !persistentUserGameProfile.nickname.length
    ) {
      createUserGameProfile(currentUser.uid).then(() => {
        getUser(currentUser.uid)
          .then((userData) => {
            const user = userData.data();
            setUserGameProfile(user);
            setPersistentUserGameProfile(user);
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      });
    } else if (
      persistentUserGameProfile &&
      persistentUserGameProfile.nickname.length
    ) {
      setUserGameProfile(persistentUserGameProfile);
    }
  }, []);

  const handleUpdateUserInfo = async (newUserGameProfile) => {
    try {
      await updateUserGameProfile(newUserGameProfile);
      setUserGameProfile(newUserGameProfile);
      setPersistentUserGameProfile({
        ...newUserGameProfile,
        user_id: currentUser.uid,
      });
      history.push("/my-page");
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
