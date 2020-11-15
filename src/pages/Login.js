import React from "react";
import { useHistory } from "react-router-dom";
import LoginTemplate from "../components/templates/Login/Login";
import { useAuth } from "../contexts/UserContext";

// FIXME : facebook
const Login = () => {
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async ({ email, password }) => {
    await login(email, password);
    history.push("/new-game");
  };

  const googleLogin = async () => {
    await login("google");
    history.push("/new-game");
  };

  const twitterLogin = async () => {
    await login("twitter");
    history.push("/new-game");
  };

  const facebookLogin = async () => {
    await login("facebook");
    history.push("/new-game");
  };

  return (
    <>
      <LoginTemplate
        method={handleLogin}
        googleLogin={googleLogin}
        twitterLogin={twitterLogin}
        facebookLogin={facebookLogin}
      />
    </>
  );
};

export default Login;

/* TODO : 주석 지우기
 <button
        type="button"
        onClick={() => {
          login('email', email, password);
        }}
      >
        Email Sign Up
      </button>
*/
