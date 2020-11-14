import React from "react";
import propTypes from "prop-types";
import { BasicButton, BorderButton } from "./button.style";
import theme from "../../../styles/Theme";

const Button = ({
  children,
  variant,
  text,
  color,
  size,
  bold,
  shadow,
  onClick,
  fullWidth,
  className,
  disable,
}) => {
  const propsConfig = {
    onClick,
    children,
    variant,
    text,
    color,
    size,
    bold,
    shadow,
    fullWidth,
    className,
    disable,
  };

  if (variant === "border") {
    return (
      <BorderButton {...propsConfig}>
        {children}
        {text}
      </BorderButton>
    );
  }

  return (
    <BasicButton {...propsConfig}>
      {children}
      {text}
    </BasicButton>
  );
};

Button.propTypes = {
  children: propTypes.node,
  onClick: propTypes.func,
  variant: propTypes.string,
  text: propTypes.string.isRequired,
  color: propTypes.oneOf(Object.keys(theme.colors)),
  size: propTypes.string,
  bold: propTypes.bool,
  shadow: propTypes.bool,
  fullWidth: propTypes.bool,
  className: propTypes.string,
  disable: propTypes.bool,
};

export default Button;
