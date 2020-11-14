import React from "react";
import LoginTemplate from "../components/templates/Login/Login";
import { useAuth } from "../contexts/UserContext";

const Login = () => {
  const { login, currentUser } = useAuth();

  const handleLogin = ({ email, password }) => {
    console.log(email, password);
    login("email", `${email}`, `${password}`)
      // TODO
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <LoginTemplate method={handleLogin} />
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
