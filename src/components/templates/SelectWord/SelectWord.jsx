/* eslint consistent-return: "off" */
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
  // FIXME : leftTime: 20초
  const [leftTime, setLeftTime] = useState(10);
  const [selectedWord, setSelectedWord] = useState("");
  const inputRef = useRef();

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

    const renderInput = useMemo(
      () => (
        <input
          ref={inputRef}
          name={name}
          type={type}
          placeholder="Enter your word..."
          value={selectedWord}
          onChange={(e) => setSelectedWord(e.target.value)}
        />
      ),
      []
    );

    return (
      <>
        <DefaultInput>
          <input
            ref={inputRef}
            name={name}
            type={type}
            placeholder="Enter your word..."
            value={selectedWord}
            onChange={(e) => setSelectedWord(e.target.value)}
          />
          {renderInput}
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
      handleTimeOut({ word: inputRef.current.value });
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
            <ModuleForm
              type="selectWord"
              btncolor="danger"
              method={handleTimeOut}
            >
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
