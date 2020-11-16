import React from "react";
import propTypes from "prop-types";
import SelectWordTemplate from "../../components/templates/SelectWord/SelectWord";

const SelectWord = ({ wordList, handleTimeOut }) => {
  return (
    <SelectWordTemplate wordList={wordList} handleTimeOut={handleTimeOut} />
  );
};

SelectWord.propTypes = {
  wordList: propTypes.arrayOf,
  handleTimeOut: propTypes.func,
};

export default SelectWord;
