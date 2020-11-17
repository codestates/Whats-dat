import React from "react";
import propTypes from "prop-types";
import SelectWordTemplate from "../../components/templates/SelectWord/SelectWord";

const SelectWord = ({ wordList, onSubmit }) => {
  return <SelectWordTemplate wordList={wordList} onSubmit={onSubmit} />;
};

SelectWord.propTypes = {
  wordList: propTypes.arrayOf,
  onSubmit: propTypes.func,
};

export default SelectWord;
