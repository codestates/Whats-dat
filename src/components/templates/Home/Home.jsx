import React from "react";
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
      <Background />
      <HomeContainer>
        <RpqButton color="white">
          <RpqIcon />
        </RpqButton>
        <div>
          <Title />
        </div>
        <LoginButton text="Log In" color="primary" bold />
        <SignUpButton text="Sign Up" color="secondary" bold />
        <HomeLink colors="white" textShadow="sm">
          HOW TO PLAY
        </HomeLink>
      </HomeContainer>
    </>
  );
};

export default Home;
