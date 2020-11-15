import React from "react";
import { useHistory } from "react-router-dom";
import LeaderBoardTemplate from "../components/templates/LeaderBoard/LeaderBoard";
import { useAuth } from "../contexts/UserContext";

const LeaderBoard = () => {
  const { userGameProfile } = useAuth();
  const history = useHistory();

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
