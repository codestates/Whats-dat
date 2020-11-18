import React from "react";
import { Link } from "react-router-dom";
import Title from "../../atoms/title/title";
import Background from "../../atoms/background/Background";

import {
  HomeContainer,
  LoginButton,
  SignUpButton,
  HomeLink,
  RpqButton,
  RpqIcon,
} from "./Home.style";

const Home = () => {
  return (
    <>
      <HomeContainer>
        <RpqButton color="white">
          <RpqIcon />
        </RpqButton>
        <div>
          <Title />
        </div>
        <Link to="/login">
          <LoginButton text="Log In" color="primary" bold />
        </Link>
        <Link to="/register">
          <SignUpButton text="Sign Up" color="secondary" bold />
        </Link>
        <HomeLink colors="white" textShadow="sm">
          HOW TO PLAY
        </HomeLink>
      </HomeContainer>
    </>
  );
};

export default Home;
