import React from "react";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Header from "../../atoms/header/header";
import Slider from "../../modules/slider/slider";
import Button from "../../atoms/button/button";
import TextLink from "../../atoms/link/link";
import {
  NewGameContainer,
  StyledButtonsContainer,
  StyledLinksContainer,
} from "./NewGame.style";
import { listItemDataSample } from "../../modules/slider/sliderFakeDb";

const NewGame = ({ buttonOnClick }) => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <NewGameContainer>
          <Header
            color="primary"
            variant="h1"
            marginBottom="lg"
            text="Available Games"
            weight="normal"
            className="newGame__header"
          />
          <Slider
            slideItems={listItemDataSample}
            slideWidth={30}
            variant="gamesPagination"
            className="newGame__slider"
          />
        </NewGameContainer>
        <StyledButtonsContainer>
          <Button
            color="primary"
            onClick={() => {}}
            text="New Game"
            className="newGame__btn"
          />
          <Button
            color="secondary"
            onClick={() => {}}
            text="Enter Code"
            className="newGame__enterCodeBtn"
          />
        </StyledButtonsContainer>
        <StyledLinksContainer>
          <TextLink
            colors="grey"
            fontSizes="base"
            fontWeight="normal"
            href=""
            textShadow="none"
            className="newGame__myProfile"
          >
            My Profile
          </TextLink>
          <TextLink
            colors="grey"
            fontSizes="base"
            fontWeight="normal"
            href=""
            textShadow="none"
            className="newGame__tutorial"
          >
            How to play
          </TextLink>
        </StyledLinksContainer>
      </ResponsiveContainer>
    </>
  );
};

NewGame.propTypes = {
  buttonOnClick: propTypes.func,
};

export default NewGame;
