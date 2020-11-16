import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MyPageTemplate from "../components/templates/MyPage/MyPage";
import LogOutModal from "../components/templates/logoutModal/logoutModal";
import { useAuth } from "../contexts/UserContext";

const MyPage = () => {
  const { currentUser, userGameProfile, getUser, logOut } = useAuth();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUser(currentUser.uid)
      .then((userData) => {
        const user = userData.data();
        return user;
      })
      .then((user) => {
        if (
          !user ||
          user.nickname === "" ||
          user.avatar === "" ||
          user.avatarColor === ""
        ) {
          history.push("/setting");
        }
      });
  }, []);

  const handleLogOut = async () => {
    await logOut();
    history.push("/");
  };

  return (
    <>
      {isModalOpen ? (
        <LogOutModal
          handleCloseModal={() => setIsModalOpen(false)}
          handleNoBtn={() => setIsModalOpen(false)}
          handleYesBtn={handleLogOut}
        />
      ) : null}
      <MyPageTemplate
        userGameProfile={userGameProfile}
        method={setIsModalOpen}
        handleClose={() => history.push("/new-game")}
      />
    </>
  );
};

export default MyPage;
