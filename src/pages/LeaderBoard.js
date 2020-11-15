import React from "react";
import { useHistory } from "react-router-dom";
import LeaderBoardTemplate from "../components/templates/LeaderBoard/LeaderBoard";

const LeaderBoard = () => {
  const history = useHistory();

  const handleClose = () => {
    history.push("/my-page");
  };

  return <LeaderBoardTemplate handleClose={handleClose} />;
};

export default LeaderBoard;
