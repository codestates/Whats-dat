import React from "react";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer } from "./GameResults.style";
import Box from "../../atoms/box/box";
import Paragraph from "../../atoms/paragraph/paragraph";
// import Image from "../../atoms/image/image";
import List from "../../modules/list/list";
import Slider from "../../modules/slider/slider";

const GameResults = ({ listItemData, gameResultsData }) => {
  return (
    <>
      <Background />
      <ResponsiveContainer>
        <CustomContainer>
          <div className="col-container m-top">
            <Paragraph
              text={gameResultsData[0].username}
              color="darkGrey"
              size="base"
              marginBottom="sm"
              className="gameResults__header"
            />
            <Box
              className="gameResults__startWord"
              bgColor="quaternary"
              radius="rounded3Xl"
              boxShadow="shadowMd"
            >
              <Paragraph
                text={gameResultsData[0].start_word}
                color="white"
                size="lg"
              />
              {}
            </Box>
          </div>
          <div className="m-top m-bottom">
            <Slider
              slideItems={gameResultsData}
              slideWidth={30}
              variant="gameResultsPagination"
            />
          </div>
          <Container size={30} className="gameResults__btnContainer">
            <List listItemName="GameResultItem" listItemData={listItemData} />
          </Container>
        </CustomContainer>
      </ResponsiveContainer>
    </>
  );
};

GameResults.propTypes = {
  listItemData: propTypes.arrayOf,
};

export default GameResults;
