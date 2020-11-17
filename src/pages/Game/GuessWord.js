import React, { useEffect } from "react";
import propTypes from "prop-types";
import GuessWordTemplate from "../../components/templates/GuessWord/GuessWord";

const GuessWord = (props) => {
  useEffect(() => {
    props.setIsSubmitFalse();
  }, []);
  return <GuessWordTemplate {...props} />;
};

GuessWord.propTypes = {
  setIsSubmitFalse: propTypes.func,
};

export default GuessWord;
