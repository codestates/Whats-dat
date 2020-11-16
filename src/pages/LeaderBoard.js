import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LeaderBoardTemplate from "../components/templates/LeaderBoard/LeaderBoard";
import { useAuth } from "../contexts/UserContext";

const LeaderBoard = () => {
  const { userGameProfile, getUser, currentUser } = useAuth();
  const history = useHistory();

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

  const handleClose = () => {
    history.push("/my-page");
  };

  return (
    <LeaderBoardTemplate
      handleClose={handleClose}
      userGameProfile={userGameProfile}
    />
  );
};

export default LeaderBoard;
