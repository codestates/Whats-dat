import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import ButtonListBox from "./buttonList.style";
import SquareButton from "../../atoms/squareButton/squareButton";

const ButtonList = ({ items, size }) => {
  const renderButtons = () => {
    return items.map(({ text, onClick, link, color }) => {
      if (link) {
        return (
          <Link to={link}>
            <SquareButton
              text={text}
              color={color}
              size={size}
              shadow
              key={text}
              fullWidth
            />
          </Link>
        );
      }

      return (
        <SquareButton
          onClick={onClick}
          text={text}
          color={color}
          size={size}
          shadow
          key={text}
          fullWidth
        />
      );
    });
  };

  return <ButtonListBox>{renderButtons()}</ButtonListBox>;
};

ButtonList.propTypes = {
  size: propTypes.string,
  items: propTypes.arrayOf,
};

export default ButtonList;
