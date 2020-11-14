import React from "react";
import propTypes from "prop-types";
import { DefaultLineWidth } from "./linewidth.style";
import theme from "../../../styles/Theme";

const LineWidth = ({ color, size, onClick, className }) => {
  return (
    <DefaultLineWidth
      onClick={onClick}
      color={color}
      size={size}
      className={className}
    />
  );
};

LineWidth.propTypes = {
  color: propTypes.oneOf(Object.keys(theme.colors)),
  size: propTypes.number,
  onClick: propTypes.func,
  className: propTypes.string,
};

LineWidth.defaultProps = {
  color: "black",
  size: 3,
};

export default LineWidth;
