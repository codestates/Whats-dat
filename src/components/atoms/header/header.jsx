import React from "react";
import propTypes from "prop-types";
import { H1, H2, H3, H4, H5, H6 } from "./header.style";
import theme from "../../../styles/Theme";

const Header = ({
  color,
  variant,
  text,
  weight,
  textShadow,
  padding,
  marginBottom,
  className,
}) => {
  const config = {
    color,
    weight,
    textShadow,
    padding,
    marginBottom,
    className,
  };
  switch (variant) {
    case "h1":
      return <H1 {...config}>{text}</H1>;
    case "h2":
      return <H2 {...config}>{text}</H2>;
    case "h3":
      return <H3 {...config}>{text}</H3>;
    case "h4":
      return <H4 {...config}>{text}</H4>;
    case "h5":
      return <H5 {...config}>{text}</H5>;
    case "h6":
      return <H6 {...config}>{text}</H6>;
    default:
      return <H1 {...config}>{text}</H1>;
  }
};

Header.propTypes = {
  color: propTypes.oneOf(Object.keys(theme.colors)),
  variant: propTypes.string.isRequired,
  text: propTypes.string,
  weight: propTypes.oneOf(Object.keys(theme.fonts.weight)),
  textShadow: propTypes.oneOf(Object.keys(theme.textShadow)),
  padding: propTypes.oneOf(Object.keys(theme.paddings)),
  marginBottom: propTypes.oneOf(Object.keys(theme.margins)),
  className: propTypes.string,
};

Header.defaultProps = {
  weight: "bold",
  textShadow: "none",
};

export default Header;
