import React from "react";
import LoginTemplate from "../components/templates/Login/Login";
import { useAuth } from "../contexts";

const Login = () => {
  const { login, currentUser } = useAuth();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          login();
        }}
      >
        login
      </button>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <LoginTemplate />
    </>
  );
};

export default Login;
