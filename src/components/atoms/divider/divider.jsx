import React from "react";
import propTypes from "prop-types";
import { DefaultDivider } from "./divider.style";
import theme from "../../../styles/Theme";

const Divider = ({ width, borderColor, className }) => {
  return (
    <DefaultDivider
      width={width}
      borderColor={borderColor}
      className={className}
    />
  );
};

Divider.propTypes = {
  width: propTypes.number,
  borderColor: propTypes.oneOf(Object.keys(theme.colors)),
  className: propTypes.string,
};

Divider.defaultProps = {
  width: 100,
  borderColor: "grey",
};

export default Divider;
