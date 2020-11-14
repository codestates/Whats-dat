import React from "react";
import propTypes from "prop-types";
import StyledContainer from "./colorPicker.style";
import RoundButton from "../../atoms/roundButton/roundButton";

const directionTypes = ["horizontal", "vertical"];

const ColorPicker = ({
  direction,
  onClick,
  className,
  getColorName,
  btnSize,
}) => {
  const paletteColors = ["red", "yellow", "green", "blue", "black", "white"];
  const config = { direction, onClick, className, btnSize };

  const renderColorButtons = () =>
    paletteColors.map((color) => {
      return (
        <RoundButton
          color={color}
          btnSize={btnSize}
          icon="test"
          className="colorPicker__btns"
          onClick={() => getColorName(color)}
        />
      );
    });
  return <StyledContainer {...config}>{renderColorButtons()}</StyledContainer>;
};

ColorPicker.propTypes = {
  direction: propTypes.oneOf(directionTypes),
  onClick: propTypes.func,
  className: propTypes.string,
  btnSize: propTypes.string,
  getColorName: propTypes.func,
};

export default ColorPicker;
