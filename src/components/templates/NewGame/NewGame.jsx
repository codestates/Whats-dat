import React, { useState } from "react";
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

// import { listItemDataSample } from "../../modules/slider/sliderFakeDb";

const NewGame = ({
  joinRoom,
  setIsNewGameModalOpen,
  setIsEnterCodeModalOpen,
  listItemData,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      <ResponsiveContainer>
        <NewGameContainer>
          {/* TODO 게임에 들어갈 수 없다면 온클릭에 setIsErrorModalOpen 을
          달아줘야함. */}
          <Header
            color="primary"
            variant="h1"
            marginBottom="lg"
            text="Available Games"
            weight="normal"
            className="newGame__header"
          />
          <Slider
            joinRoom={joinRoom}
            slideItems={listItemData}
            slideWidth={30}
            variant="gamesPagination"
            className="newGame__slider"
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </NewGameContainer>
        <StyledButtonsContainer>
          <Button
            color="primary"
            onClick={() => {
              setIsNewGameModalOpen(true);
            }}
            text="New Game"
            className="newGame__btn"
          />
          <Button
            color="secondary"
            onClick={() => {
              setIsEnterCodeModalOpen(true);
            }}
            text="Enter Code"
            className="newGame__enterCodeBtn"
          />
        </StyledButtonsContainer>
        <StyledLinksContainer>
          <TextLink
            colors="grey"
            fontSizes="base"
            fontWeight="normal"
            href="/my-page"
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
  joinRoom: propTypes.func,
  setIsNewGameModalOpen: propTypes.func,
  setIsEnterCodeModalOpen: propTypes.func,
  listItemData: propTypes.arrayOf(propTypes.any),
};

export default NewGame;
