import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MyPageTemplage from "../components/templates/MyPage/MyPage";
import LogOutModal from "../components/templates/logoutModal/logoutModal";
import { useAuth } from "../contexts/UserContext";

const MyPage = () => {
  const { userGameProfile, logOut } = useAuth();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <MyPageTemplage
        userGameProfile={userGameProfile}
        method={setIsModalOpen}
        handleClose={() => history.push("/new-game")}
      />
    </>
  );
};

export default MyPage;
