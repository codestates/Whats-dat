import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import Paragraph from "../../atoms/paragraph/paragraph";

const GuessWordTimer = ({ handleTimeOut, limitTime }) => {
  const [leftTime, setLeftTime] = useState(limitTime);

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

    return null;
  }, [leftTime]);

  return (
    <Paragraph
      text={`${leftTime}s`}
      color={leftTime <= 5 ? "danger" : "darkGrey"}
    />
  );
};

GuessWordTimer.propTypes = {
  handleTimeOut: propTypes.func,
  limitTime: propTypes.number,
};

export default GuessWordTimer;
