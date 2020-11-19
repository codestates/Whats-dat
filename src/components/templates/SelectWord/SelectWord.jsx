/* eslint consistent-return: "off" */
import React, { useState, useEffect, useRef } from "react";
import propTypes from "prop-types";
import { useField } from "formik";
import * as Yup from "yup";

import ResponsiveContainer from "../../modules/responsiveContainer/responsiveContainer";
import Container from "../../atoms/container/container";
import { CustomContainer, ButtonLists, AuthForm } from "./SelectWord.style";
import Header from "../../atoms/header/header";
import SquareButton from "../../atoms/squareButton/squareButton";
import { DefaultInput } from "../../atoms/input/input.style";
import SeletWordTimer from "./SelectWordTimer";
import FormikContainer from "../../modules/form/Formik/FormikContainer";

const SelectWord = ({ onSubmit, wordList }) => {
  const limitTime = 20;
  const inputRef = useRef();
  const [selectedWord, setSelectedWord] = useState("");
  const handleTimeOut = () => {
    onSubmit({ word: inputRef.current.value });
  };

  const formConfig = {
    formInfo: {
      formTitle: null,
      formSubtitle: null,
      buttonName: "Submit",
    },

    initialValues: {
      word: "",
    },

    validationSchema: Yup.object({
      word: Yup.string().max(20, "Can't exceed 20 characters"),
    }),
  };

  const CustomField = ({ name, type }) => {
    // Meta, field 는 폼 기능을 유지 시키기 위해 필요합니다.
    // eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    useEffect(() => {
      inputRef.current.value = selectedWord;
      setValue(selectedWord);
    }, [selectedWord]);

    useEffect(() => {
      inputRef.current.focus();
    }, []);

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

  const renderButtons = () => {
    return wordList.map((word) => {
      return (
        <SquareButton
          onClick={() => {
            onSubmit({ word });
          }}
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
            <AuthForm>
              <FormikContainer
                formInfo={formConfig.formInfo}
                initialValues={formConfig.initialValues}
                validationSchema={formConfig.validationSchema}
                method={onSubmit}
                btncolor="danger"
              >
                <CustomField name="word" type="text" />
              </FormikContainer>
            </AuthForm>
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
