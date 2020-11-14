import React from "react";
import propTypes from "prop-types";
import { BasicSquareButton, BorderSquareButton } from "./squareButton.style";
import theme from "../../../styles/Theme";

const SquareButton = ({
  children,
  variant,
  text,
  color,
  size,
  bold,
  shadow,
  fullWidth,
  className,
  onClick,
}) => {
  const config = {
    children,
    variant,
    text,
    color,
    size,
    bold,
    shadow,
    fullWidth,
    className,
    onClick,
  };

  if (variant === "border") {
    return (
      <BorderSquareButton {...config}>
        {children}
        {text}
      </BorderSquareButton>
    );
  }

  return (
    <BasicSquareButton {...config}>
      {children}
      {text}
    </BasicSquareButton>
  );
};

SquareButton.propTypes = {
  children: propTypes.node,
  variant: propTypes.string,
  text: propTypes.string.isRequired,
  color: propTypes.oneOf(Object.keys(theme.colors)).isRequired,
  size: propTypes.string,
  bold: propTypes.bool,
  shadow: propTypes.bool,
  fullWidth: propTypes.bool,
  className: propTypes.string,
  onClick: propTypes.func,
};

export default SquareButton;
