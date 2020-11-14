/* eslint consistent-return: "off" */
import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { useField } from "formik";

import Background from "../../atoms/background/Background";
import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer, ButtonLists } from "./SelectWord.style";
import Header from "../../atoms/header/header";
import Paragraph from "../../atoms/paragraph/paragraph";
import ModuleForm from "../../modules/form/moduleForm";
import SquareButton from "../../atoms/squareButton/squareButton";
import { DefaultInput } from "../../atoms/input/input.style";

const SelectWord = (props) => {
  const { handleTimeOut, wordList } = props;

  const [leftTime, setLeftTime] = useState(15);
  const [selectedWord, setSelectedWord] = useState("");

  const handleClick = (word) => {
    setSelectedWord(word);
  };

  const CustomField = ({ name, type }) => {
    // Meta, field 는 폼 기능을 유지 시키기 위해 필요합니다.
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const [term, setTerm] = useState(selectedWord);
    const { setValue } = helpers;

    useEffect(() => {
      setValue(term);
    }, [term]);

    return (
      <>
        <DefaultInput>
          <input
            name={name}
            type={type}
            placeholder="Enter your word..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </DefaultInput>
      </>
    );
  };

  CustomField.propTypes = {
    name: propTypes.string,
    type: propTypes.string,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (leftTime > 0) {
        setLeftTime(leftTime - 1);
      }
    }, 1000);

    if (leftTime === 0) {
      handleTimeOut();
      return clearTimeout(timer);
    }
  }, [leftTime]);

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
            <Paragraph
              text={`${leftTime}s`}
              color={leftTime <= 5 ? "danger" : "darkGrey"}
            />
          </div>

          <ButtonLists>{renderButtons()}</ButtonLists>

          <div className="m-top">
            <Header text="Or" variant="h3" color="navy" weight="bold" />
          </div>
          <Container size={22}>
            <ModuleForm type="selectWord" btncolor="danger">
              <CustomField name="word" type="text" value={selectedWord} />
            </ModuleForm>
          </Container>
        </CustomContainer>
      </ResponsiveContainer>
    </>
  );
};

SelectWord.propTypes = {
  handleTimeOut: propTypes.func,
  wordList: propTypes.arrayOf,
};

export default SelectWord;
