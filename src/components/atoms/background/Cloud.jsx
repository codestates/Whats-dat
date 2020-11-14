import React from "react";
import propTypes from "prop-types";
import StyledCloud from "./Cloud.style";
import Icon from "../icon/icon";

const Cloud = ({ top, scale, opacity, seconds, color, className }) => {
  const config = { top, scale, opacity, seconds, color, className };
  return (
    <StyledCloud {...config}>
      <Icon variant="CLOUD_A" color="white" />
    </StyledCloud>
  );
};

Cloud.propTypes = {
  top: propTypes.number,
  scale: propTypes.number,
  opacity: propTypes.number,
  seconds: propTypes.number,
  color: propTypes.string,
  className: propTypes.string,
};

export default Cloud;