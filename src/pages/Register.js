/* eslint-disable no-console */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import RegisterTemplate from "../components/templates/Register/Register";
import { useAuth } from "../contexts/UserContext";
import ErrorMessageModal from "../components/templates/errorMessageModal/errorMessageModal";

const Register = () => {
  const { login, register } = useAuth();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageObj = {
    title: errorMessage,
    paragraph: "",
  };

  const handleRegister = async (props) => {
    const { email, password } = props;
    try {
      await register(email, password);
      history.push("/setting");
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

  const facebookLogin = async () => {
    try {
      await login("facebook");
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
