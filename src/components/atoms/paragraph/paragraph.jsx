import React from "react";
import propTypes from "prop-types";
import { StyledParagraph } from "./paragraph.style";
import theme from "../../../styles/Theme";

const Paragraph = ({
  text,
  size,
  color,
  weight,
  textShadow,
  padding,
  marginBottom,
  className,
}) => {
  const config = {
    size,
    color,
    weight,
    textShadow,
    padding,
    marginBottom,
    className,
  };
  return <StyledParagraph {...config}>{text}</StyledParagraph>;
};

Paragraph.propTypes = {
  text: propTypes.string,
  size: propTypes.oneOf(Object.keys(theme.fonts.size)),
  color: propTypes.oneOf(Object.keys(theme.colors)),
  weight: propTypes.oneOf(Object.keys(theme.fonts.weight)),
  textShadow: propTypes.oneOf(Object.keys(theme.textShadow)),
  padding: propTypes.oneOf(Object.keys(theme.paddings)),
  marginBottom: propTypes.oneOf(Object.keys(theme.margins)),
  className: propTypes.string,
};

Paragraph.defaultProps = {
  weight: "normal",
  textShadow: "none",
};

export default Paragraph;
