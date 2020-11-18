import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AvatarModal from "../components/templates/avatarModal/avatarModal";
import Background from "../components/atoms/background/Background";
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
  });
  const [
    persistentUserGameProfile,
    setPersistentUserGameProfile,
  ] = useLocalStorage("persistentUserGameProfile", userGameProfile);

  useEffect(() => {
    // getUser(currentUser.uid).then((userData) => {
    //   if (userData) setUserGameProfile(userData.data());
    // });
    // console.log("1. useEffect가 실행된다");
    // console.log(persistentUserGameProfile);
    if (
      !persistentUserGameProfile ||
      !persistentUserGameProfile.nickname.length
    ) {
      // console.log("2. createUserGameProfile 실행 직전", currentUser.uid);

      createUserGameProfile(currentUser.uid).then(() => {
        getUser(currentUser.uid)
          .then((userData) => {
            // console.log("3. create 이후 getUser/userData", userData.data());
            const user = userData.data();
            setUserGameProfile(user);
            setPersistentUserGameProfile(user);
          })
          .catch((error) => {
            // console.log("4. create를 못했어여ㅠㅠㅠ", error);
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

// ANCHOR
// 1. 프라이빗라우트 func => node || func
// 2. a -> link
// 3. temp profile

// TODO :
// [해결] setting을 refresh했을 때 userGameProfile 값이 초기화됨....ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
// social login시 setting -> avatar 클릭 시 avatar of undefined -> refresh하면 잘 됨...
// my profile 클릭 범위
