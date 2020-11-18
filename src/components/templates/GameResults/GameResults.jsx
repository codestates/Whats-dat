import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer, CloseButton } from "./GameResults.style";
import Box from "../../atoms/box/box";
import Paragraph from "../../atoms/paragraph/paragraph";
import List from "../../modules/list/list";
import Slider from "../../modules/slider/slider";
import Icon from "../../atoms/icon/icon";

const GameResults = ({ listItemData }) => {
  const [currentGameListIndex, setCurrentGameListIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const history = useHistory();

  const setNewSlide = (i) => {
    setCurrentGameListIndex(i);
    setCurrentSlide(0);
  };

  return (
    <>
      <Background />
      <ResponsiveContainer>
        <CustomContainer>
          <CloseButton size="3" onClick={() => history.push("/lobby")}>
            <Icon variant="BUTTON_X" color="navy" />
          </CloseButton>
          <div className="col-container m-top">
            <Paragraph
              text={listItemData[currentGameListIndex][0].username}
              color="darkGrey"
              size="base"
              marginBottom="sm"
              className="gameResults__header"
            />
            <Box
              className="gameResults__startWord"
              bgColor="primary"
              radius="rounded3Xl"
              boxShadow="shadowMd"
            >
              <Paragraph
                text={listItemData[currentGameListIndex][0].start_word}
                color="white"
                size="lg"
              />
            </Box>
          </div>
          <div className="m-top m-bottom">
            <Slider
              slideItems={listItemData[currentGameListIndex]}
              slideWidth={30}
              variant="gameResultsPagination"
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </div>
          <Container size={30} className="gameResults__btnContainer">
            <List
              listItemName="GameResultItem"
              listItemData={listItemData}
              onClick={setNewSlide}
            />
          </Container>
        </CustomContainer>
      </ResponsiveContainer>
    </>
  );
};

GameResults.propTypes = {
  listItemData: propTypes.arrayOf(propTypes.any),
};

export default GameResults;
