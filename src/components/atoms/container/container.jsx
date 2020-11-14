import React from "react";
import propTypes from "prop-types";
import { DefaultContainer } from "./container.style";
import theme from "../../../styles/Theme";

const Container = (props) => {
  const {
    width,
    height,
    maxWidth,
    children,
    className,
    onClick,
    isFull,
  } = props;

  return (
    <DefaultContainer
      width={width}
      height={height}
      maxWidth={maxWidth}
      className={className}
      onClick={onClick}
      isFull={isFull}
    >
      {children}
    </DefaultContainer>
  );
};

Container.propTypes = {
  width: propTypes.number,
  height: propTypes.number,
  maxWidth: propTypes.oneOf(Object.keys(theme.device)),
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  isFull: propTypes.bool,
  className: propTypes.string,
};

export default Container;
