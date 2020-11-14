import React from "react";
import propTypes from "prop-types";
import StyledIconButton from "./iconButton.style";

const IconButton = ({ children, size, className, isNotVisible, onClick }) => {
  return (
    <StyledIconButton
      size={size}
      className={className}
      isNotVisible={isNotVisible}
      onClick={onClick}
    >
      {children}
    </StyledIconButton>
  );
};

IconButton.propTypes = {
  children: propTypes.node,
  size: propTypes.number,
  className: propTypes.string,
  isNotVisible: propTypes.bool,
  onClick: propTypes.func,
};

export default IconButton;
