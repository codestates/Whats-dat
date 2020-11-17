/* eslint consistent-return: "off" */
import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import { useField } from "formik";

import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer, ButtonLists } from "./SelectWord.style";
import Header from "../../atoms/header/header";
import ModuleForm from "../../modules/form/moduleForm";
import SquareButton from "../../atoms/squareButton/squareButton";
import { DefaultInput } from "../../atoms/input/input.style";
import SeletWordTimer from "./SelectWordTimer";

const SelectWord = ({ onSubmit, wordList }) => {
  const limitTime = 20;
  const [selectedWord, setSelectedWord] = useState("");
  const inputRef = useRef();

  const handleClick = (word) => {
    setSelectedWord(word);
  };

  const handleTimeOut = () => {
    onSubmit({ word: inputRef.current.value });
  };

  // FIXME : lose input focus
  const CustomField = ({ name, type, value }) => {
    // Meta, field 는 폼 기능을 유지 시키기 위해 필요합니다.
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    useEffect(() => {
      inputRef.current.value = selectedWord;
    }, [selectedWord]);

    return (
      <>
        <DefaultInput>
          <input
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
    value: propTypes.string,
  };

  const renderButtons = () => {
    return wordList.map((word) => {
      return (
        <SquareButton
          onClick={() => handleClick(word)}
          text={word}
          color="secondary"
          size="sm"
          shadow
          key={word}
          fullWidth
        />
      );
    });
  };

  return (
    <>
      <Background />
      <ResponsiveContainer>
        <CustomContainer>
          <div className="row-container m-top">
            <div className="dummy" />
            <Header
              text="Select Your Word"
              variant="h2"
              color="navy"
              weight="exbold"
            />
            <SeletWordTimer
              limitTime={limitTime}
              handleTimeOut={handleTimeOut}
            />
          </div>

          <ButtonLists>{renderButtons()}</ButtonLists>

          <div className="m-top">
            <Header text="Or" variant="h3" color="navy" weight="bold" />
          </div>
          <Container size={22}>
            <ModuleForm type="selectWord" btncolor="danger" method={onSubmit}>
              <CustomField name="word" type="text" value={selectedWord} />
            </ModuleForm>
          </Container>
        </CustomContainer>
      </ResponsiveContainer>
    </>
  );
};

SelectWord.propTypes = {
  onSubmit: propTypes.func,
  wordList: propTypes.arrayOf,
};

export default SelectWord;
