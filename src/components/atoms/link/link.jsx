import React from "react";
import propTypes from "prop-types";
import { DefaultLink } from "./link.style";

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
      {children}
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
