import React from "react";
import propTypes from "prop-types";
import { DefaultBox } from "./box.style";
import theme from "../../../styles/Theme";

const Box = ({
  children,
  padding,
  bgColor,
  border,
  radius,
  boxShadow,
  className,
}) => {
  return (
    <DefaultBox
      padding={padding}
      bgColor={bgColor}
      border={border}
      radius={radius}
      boxShadow={boxShadow}
      className={className}
    >
      {children}
    </DefaultBox>
  );
};

Box.propTypes = {
  children: propTypes.node.isRequired,
  padding: propTypes.oneOf(Object.keys(theme.paddings)),
  bgColor: propTypes.oneOf(Object.keys(theme.colors)),
  border: propTypes.bool,
  radius: propTypes.oneOf(Object.keys(theme.borderRadius)),
  boxShadow: propTypes.oneOf(Object.keys(theme.boxShadow)),
  className: propTypes.string,
};

Box.defaultProps = {
  padding: "base",
  bgColor: "lightGrey",
  border: false,
};

export default Box;
