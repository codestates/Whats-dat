import React from "react";
import propTypes from "prop-types";
import { BasicRoundButton, BorderRoundButton } from "./roundButton.style";
import theme from "../../../styles/Theme";

const RoundButton = ({
  children,
  color,
  size,
  shadow,
  variant,
  onClick,
  className,
}) => {
  const config = { color, size, shadow, variant, onClick, className };
  if (variant === "border") {
    return <BorderRoundButton {...config}>{children}</BorderRoundButton>;
  }
  return <BasicRoundButton {...config}>{children}</BasicRoundButton>;
};

RoundButton.propTypes = {
  variant: propTypes.string,
  onClick: propTypes.func,
  children: propTypes.node,
  color: propTypes.oneOf(Object.keys(theme.colors)).isRequired,
  size: propTypes.string,
  shadow: propTypes.bool,
  className: propTypes.string,
};

export default RoundButton;
