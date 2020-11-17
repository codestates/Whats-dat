import React from "react";
import propTypes, { shape } from "prop-types";
import { Link } from "react-router-dom";
import ButtonListBox from "./buttonList.style";
import SquareButton from "../../atoms/squareButton/squareButton";
import theme from "../../../styles/Theme";

const ButtonList = ({ items, size }) => {
  const renderButtons = () => {
    return items.map(({ text, onClick, link, color }) => {
      if (link) {
        return (
          <Link to={link} key={text}>
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
  items: propTypes.arrayOf(
    propTypes.shape({
      text: propTypes.string,
      onClick: propTypes.func,
      link: propTypes.string,
      color: propTypes.oneOf(Object.keys(theme.colors)),
    })
  ),
};

export default ButtonList;
