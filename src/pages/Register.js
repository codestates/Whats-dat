import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../firebase";

import RegisterTemplate from "../components/templates/Register/Register";
import { useAuth } from "../contexts/UserContext";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";

const Register = () => {
  const { login, register, getUser } = useAuth();
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

  const checkDuplicateUser = async (newUser) => {
    const userData = await getUser();

    if (userData.data().uid === newUser.user.uid) {
      history.push("/new-game");
    } else {
      createUserGameProfile(newUser.user.uid);
      history.push("/setting");
    }
  };

  const handleRegister = async (props) => {
    const { email, password } = props;

    try {
      const newUser = await register(email, password);
      createUserGameProfile(newUser.user.uid);
      history.push("/setting");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      const newUser = await login("google");
      await checkDuplicateUser(newUser);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const twitterLogin = async () => {
    try {
      const newUser = await login("twitter");
      await checkDuplicateUser(newUser);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const facebookLogin = async () => {
    try {
      const newUser = await login("facebook");
      await checkDuplicateUser(newUser);
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
      <RegisterTemplate
        method={handleRegister}
        googleLogin={googleLogin}
        twitterLogin={twitterLogin}
        facebookLogin={facebookLogin}
        handleClose={() => history.push("/")}
      />
    </>
  );
};

export default Register;
