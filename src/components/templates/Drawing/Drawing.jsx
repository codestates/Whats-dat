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
    onSubmit,
    currentPlayer,
    playersList,
    preGuessWord,
  } = props;

  const [leftTime, setLeftTime] = useState(limitTime);
  const [strokeSize, setStrokeSize] = useState(3);
  const [selectedColor, setSelectedColor] = useState("black");
  const [canvasRef, setCanvaseRef] = useState(null);

  const sendCanvasImageData = () => {
    const canvasImageData =
      canvasRef && canvasRef.current.toDataURL("image/png", 0.3);
    return onSubmit(canvasImageData);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (leftTime > 0) {
        setLeftTime(leftTime - 1);
      }
    }, 1000);
    if (leftTime === 0) {
      sendCanvasImageData();
      return clearTimeout(timer);
    }
    return null;
  }, [leftTime]);

  const getColorName = (color) => {
    setSelectedColor(color);
  };

  const onClickMinus = () => {
    if (strokeSize > 2) {
      setStrokeSize(strokeSize - 1);
    }
  };

  const onClickPlus = () => {
    if (strokeSize < 5) {
      setStrokeSize(strokeSize + 1);
    }
  };

  return (
    <>
      <ResponsiveContainer>
        <CustomContainer>
          <div className="row-grid m-top m-bottom">
            <Paragraph text={`${curRound}/${totalRound}`} color="darkGrey" />
            <Box bgColor="primary" radius="rounded2Xl" boxShadow="shadowMd">
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
          <div className="m-top canvas__container">
            <Canvas
              width={36}
              height={36}
              lineWidth={strokeSize}
              strokeColor={selectedColor}
              getCanvaseRef={setCanvaseRef}
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
              onClickMinus={onClickMinus}
              onClickPlus={onClickPlus}
              lineWidth={strokeSize}
            />
          </div>
          <div className="m-top">
            <Button
              text="Submit"
              color="danger"
              onClick={sendCanvasImageData}
            />
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
  onSubmit: propTypes.func,
  currentPlayer: propTypes.objectOf(propTypes.any),
  playersList: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
  preGuessWord: propTypes.string,
};

export default Drawing;
