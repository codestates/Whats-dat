import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import EnterCodeModal from "../components/templates/enterCodeModal/enterCodeModal";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";
import NewGameModal from "../components/templates/newGameModal/newGameModal";
import NewGameTemplate from "../components/templates/NewGame/NewGame";
import { useAuth } from "../contexts/UserContext";

const NewGame = () => {
  const { getUser, currentUser } = useAuth();
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

  // TODO 방이 안들어가질 경우에 해당 모달을 전송
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  return (
    <>
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
