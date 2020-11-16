import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { DefaultLink } from "./link.style";

// ANCHOR
const TextLink = ({
  href,
  fontSizes = "base",
  fontWeight,
  colors,
  textShadow,
  children,
  className,
}) => {
  return (
    <DefaultLink
      href={href}
      fontSizes={fontSizes}
      fontWeight={fontWeight}
      colors={colors}
      textShadow={textShadow}
      className={className}
    >
      <Link to={href}>{children}</Link>
    </DefaultLink>
  );
};

TextLink.propTypes = {
  href: propTypes.string,
  fontSizes: propTypes.string,
  fontWeight: propTypes.string,
  colors: propTypes.string,
  textShadow: propTypes.string,
  children: propTypes.node.isRequired,
  className: propTypes.string,
};

export default TextLink;
