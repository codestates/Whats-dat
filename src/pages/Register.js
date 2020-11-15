import React from "react";
import { useHistory } from "react-router-dom";
import RegisterTemplate from "../components/templates/Register/Register";
import { useAuth } from "../contexts/UserContext";

const Register = () => {
  const { login, register } = useAuth();
  const history = useHistory();

  const handleRegister = async (props) => {
    const { email, password } = props;

    await register(email, password);
    history.push("/setting");
  };

  const googleLogin = async () => {
    await login("google");
    history.push("/setting");
  };

  const twitterLogin = async () => {
    await login("twitter");
    history.push("/setting");
  };

  const facebookLogin = async () => {
    await login("facebook");
    history.push("/setting");
  };

  return (
    <>
      <RegisterTemplate
        method={handleRegister}
        googleLogin={googleLogin}
        twitterLogin={twitterLogin}
        facebookLogin={facebookLogin}
      />
    </>
  );
};

export default Register;
