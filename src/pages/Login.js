import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../firebase";

import LoginTemplate from "../components/templates/Login/Login";
import { useAuth } from "../contexts/UserContext";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";

const Login = () => {
  const { login, getUser } = useAuth();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageObj = {
    title: errorMessage,
    paragraph: "",
  };

  const createUserGameProfile = (uid) => {
    firestore
      .collection("users")
      .doc(uid)
      .set({
        nickname: "",
        avatar: "",
        avatarColor: "",
        score: 0,
      })
      .catch((err) => setErrorMessage(err.message));
  };

  const handleLogin = async ({ email, password }) => {
    try {
      await login("email", email, password);
      history.push("/new-game");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const checkDuplicateUser = async (newUser) => {
    const userData = await getUser();

    if (userData.data().uid === newUser.user.uid) {
      history.push("/new-game");
    } else {
      try {
        await createUserGameProfile(newUser.user.uid);
        history.push("/setting");
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  };

  const googleLogin = async () => {
    try {
      const newUser = await login("google");
      checkDuplicateUser(newUser);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const twitterLogin = async () => {
    try {
      const newUser = await login("twitter");
      checkDuplicateUser(newUser);
      history.push("/new-game");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const facebookLogin = async () => {
    try {
      const newUser = await login("facebook");
      checkDuplicateUser(newUser);
      history.push("/new-game");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {errorMessage.length ? (
        <ErrorMessageModal
          handleCloseModal={() => setErrorMessage("")}
          errorMessage={errorMessageObj}
        />
      ) : null}
      <LoginTemplate
        method={handleLogin}
        googleLogin={googleLogin}
        twitterLogin={twitterLogin}
        facebookLogin={facebookLogin}
        handleClose={() => history.push("/")}
      />
    </>
  );
};

export default Login;
