import React from "react";
import propTypes from "prop-types";
import { StyledSpan } from "./span.style";
import theme from "../../../styles/Theme";

const Span = ({
  weight,
  text,
  textShadow,
  textDecoration,
  color,
  padding,
  margin,
  className,
}) => {
  const config = {
    weight,
    textShadow,
    textDecoration,
    color,
    padding,
    margin,
    className,
  };
  return <StyledSpan {...config}>{text}</StyledSpan>;
};

Span.propTypes = {
  weight: propTypes.oneOf(Object.keys(theme.fonts.weight)),
  text: propTypes.string,
  textShadow: propTypes.oneOf(Object.keys(theme.textShadow)),
  textDecoration: propTypes.string,
  color: propTypes.oneOf(Object.keys(theme.colors)),
  padding: propTypes.oneOf(Object.keys(theme.paddings)),
  margin: propTypes.oneOf(Object.keys(theme.margins)),
  className: propTypes.string,
};

Span.defaultProps = {
  weight: "normal",
  textShadow: "none",
};

export default Span;
