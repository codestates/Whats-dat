import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer } from "./GuessWord.style";
import Header from "../../atoms/header/header";
import Paragraph from "../../atoms/paragraph/paragraph";
import GameProgressBar from "../../modules/gameProgress/gameProgress";
import Image from "../../atoms/image/image";
import ModuleForm from "../../modules/form/moduleForm";

const GuessWord = (props) => {
  const {
    curRound,
    totalRound,
    limitTime,
    handleTimeOut,
    currentPlayer,
    playersList,
    imageUrl,
  } = props;

  const [leftTime, setLeftTime] = useState(limitTime);

  // useEffect(() => {
  // 	const timer = setTimeout(() => {
  // 		if (leftTime > 0) {
  // 			setLeftTime(leftTime - 1);
  // 			// console.log(leftTime);
  // 		}
  // 	}, 1000);
  // 	if (leftTime === 0) {
  // 		handleTimeOut(); // TODO : game 종료시 fetch
  // 		return clearTimeout(timer);
  // 	}
  // }, [leftTime]);

  return (
    <>
      <Background />
      <ResponsiveContainer>
        <CustomContainer>
          <div className="row-container m-top">
            <Paragraph text={`${curRound}/${totalRound}`} color="darkGrey" />
            <Header
              text="Enter Guess"
              variant="h2"
              color="navy"
              weight="exbold"
            />
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
          <div className="m-top m-bottom">
            <Image url={imageUrl} size={36} />
          </div>
          <Container size={36}>
            <ModuleForm type="enterGuess" btncolor="danger" />
          </Container>
        </CustomContainer>
      </ResponsiveContainer>
    </>
  );
};

GuessWord.propTypes = {
  curRound: propTypes.number,
  totalRound: propTypes.number,
  limitTime: propTypes.number,
  handleTimeOut: propTypes.func,
  currentPlayer: propTypes.objectOf,
  playersList: propTypes.arrayOf,
  imageUrl: propTypes.string,
};

export default GuessWord;
