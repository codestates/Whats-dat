import React from "react";
import propTypes from "prop-types";
import { StyledHomeBackground } from "./Background.style";
import Cloud from "./Cloud";

const BackgroundPage = ({ maxWidth, className }) => {
  return (
    <StyledHomeBackground maxWidth={maxWidth} className={className}>
      <Cloud
        top="20"
        scale="0.5"
        opacity="0.5"
        seconds="15s"
        delaySeconds="4s"
      />
      <Cloud top="90" scale="1" opacity="0.7" seconds="8s" delaySeconds="4s" />
      <Cloud
        top="0"
        scale="0.8"
        opacity="0.5"
        seconds="15s"
        delaySeconds="4s"
      />
      <Cloud
        top="50"
        scale="0.7"
        opacity="0.6"
        seconds="20s"
        delaySeconds="10s"
      />
      <Cloud
        top="30"
        scale="0.9"
        opacity="0.5"
        seconds="12s"
        delaySeconds="20s"
      />
      <Cloud
        top="70"
        scale="0.5"
        opacity="0.6"
        seconds="17s"
        delaySeconds="1s"
      />
      <Cloud
        top="60"
        scale="0.7"
        opacity="0.7"
        seconds="11s"
        delaySeconds="1s"
      />
    </StyledHomeBackground>
  );
};

BackgroundPage.propTypes = {
  maxWidth: propTypes.number,
  className: propTypes.string,
};

export default BackgroundPage;
