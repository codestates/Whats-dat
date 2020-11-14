import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Box from "../../atoms/box/box";
import { CustomContainer } from "./Drawing.style";
import Paragraph from "../../atoms/paragraph/paragraph";
import GameProgressBar from "../../modules/gameProgress/gameProgress";
import Canvas from "../../atoms/canvas/canvas";
import LineWidthControllerBox from "../../modules/lineWidthController/lineWidthController";
import ColorPicker from "../../modules/colorPicker/colorPicker";
import Button from "../../atoms/button/button";

const Drawing = (props) => {
  const {
    curRound,
    totalRound,
    limitTime,
    handleTimeOut,
    currentPlayer,
    playersList,
    preGuessWord,
  } = props;

  const [leftTime, setLeftTime] = useState(limitTime);
  const [strokeSize, setStrokeSize] = useState(3);
  const [selectedColor, setSelectedColor] = useState("black");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (leftTime > 0) {
        setLeftTime(leftTime - 1);
        console.log(leftTime);
      }
    }, 1000);
    if (leftTime === 0) {
      handleTimeOut(); // TODO : game 종료시 fetch
      return clearTimeout(timer);
    }
    return null;
  }, [leftTime]);

  const getColorName = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Background />
      <ResponsiveContainer>
        <CustomContainer>
          <div className="row-grid m-top m-bottom">
            <Paragraph text={`${curRound}/${totalRound}`} color="darkGrey" />
            <Box bgColor="quaternary" radius="rounded2Xl" boxShadow="shadowMd">
              <Paragraph text={preGuessWord} color="white" weight="bold" />
            </Box>
            <Paragraph
              text={`${leftTime}s`}
              color={leftTime <= 5 ? "danger" : "darkGrey"}
            />
          </div>
          <div className="small">
            <GameProgressBar
              currentPlayer={currentPlayer}
              playersList={playersList}
            />
          </div>
          <div className="m-top m-bottom canvas__container">
            <Canvas
              width={36}
              lineWidth={strokeSize}
              strokeColor={selectedColor}
            />
            <ColorPicker
              direction="vertical"
              className="canvas__colorPicker"
              getColorName={getColorName}
              btnSize="3"
            />
          </div>
          <div className="row-container">
            <LineWidthControllerBox
              onClickMinus={() => {
                if (strokeSize > 2) {
                  setStrokeSize(strokeSize - 1);
                }
              }}
              onClickPlus={() => {
                if (strokeSize < 5) {
                  setStrokeSize(strokeSize + 1);
                }
              }}
              lineWidth={strokeSize}
            />
          </div>
          <div className="m-top">
            <Button text="Submit" color="danger" />
          </div>
        </CustomContainer>
      </ResponsiveContainer>
    </>
  );
};

Drawing.propTypes = {
  curRound: propTypes.number,
  totalRound: propTypes.number,
  limitTime: propTypes.number,
  handleTimeOut: propTypes.func,
  currentPlayer: propTypes.shape({
    player_id: propTypes.string,
    username: propTypes.string,
    avatar: propTypes.string,
  }),
  playersList: propTypes.shape([
    {
      player_id: propTypes.string,
      username: propTypes.string,
      avatar: propTypes.string,
    },
  ]),
  preGuessWord: propTypes.string,
};

export default Drawing;