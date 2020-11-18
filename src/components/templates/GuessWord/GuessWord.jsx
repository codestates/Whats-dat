import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import { useField } from "formik";
import * as Yup from "yup";

import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer, SimpleForm } from "./GuessWord.style";
import Header from "../../atoms/header/header";
import Paragraph from "../../atoms/paragraph/paragraph";
import GameProgressBar from "../../modules/gameProgress/gameProgress";
import Image from "../../atoms/image/image";
import GuessWordTimer from "./GuessWordTimer";
import FormikContainer from "../../modules/form/Formik/FormikContainer";
import { DefaultInput } from "../../atoms/input/input.style";

const GuessWord = (props) => {
  const {
    curRound,
    totalRound,
    limitTime,
    onSubmit,
    currentPlayer,
    playersList,
    imageUrl,
  } = props;

  const inputRef = useRef();

  const handleTimeOut = () => {
    onSubmit({ word: inputRef.current.value });
  };

  // 상황 정리
  // 다른 사람이 제출하면 재랜더링이 됨
  // 그런데 버튼으로 클릭한 내용은 기억하고 있음
  // 인풋으로 입력한 내용은 리셋 됨

  const enterGuessConfig = {
    formInfo: {
      formTitle: null,
      formSubtitle: null,
      buttonName: "Submit",
    },

    initialValues: {
      word: "",
    },

    validationSchema: Yup.string().max(20, "Can't exceed 20 characters"),
  };

  const CustomField = ({ name, type }) => {
    // Meta, field 는 폼 기능을 유지 시키기 위해 필요합니다.
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(name);

    return (
      <>
        <DefaultInput>
          <input
            {...field}
            ref={inputRef}
            key={name}
            name={name}
            type={type}
            placeholder="Enter your word..."
          />
        </DefaultInput>
      </>
    );
  };

  CustomField.propTypes = {
    name: propTypes.string,
    type: propTypes.string,
  };

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
            <GuessWordTimer
              limitTime={limitTime}
              handleTimeOut={handleTimeOut}
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
            <SimpleForm>
              <FormikContainer
                formInfo={enterGuessConfig.formInfo}
                initialValues={enterGuessConfig.initialValues}
                validationSchema={enterGuessConfig.validationSchema}
                method={onSubmit}
                btncolor="danger"
              >
                <CustomField name="word" type="text" />
              </FormikContainer>
            </SimpleForm>
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
  onSubmit: propTypes.func,
  currentPlayer: propTypes.objectOf,
  playersList: propTypes.arrayOf,
  imageUrl: propTypes.string,
};

export default GuessWord;
