import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import LoginTemplate from "../components/templates/Login/Login";
import { useAuth } from "../contexts/UserContext";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";

const Login = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageObj = {
    title: errorMessage,
    paragraph: "",
  };

  const handleLogin = async ({ email, password }) => {
    try {
      await login("email", email, password);
      history.push("/new-game");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      await login("google");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const twitterLogin = async () => {
    try {
      await login("twitter");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const facebookLogin = async () => {
    try {
      await login("facebook");
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
