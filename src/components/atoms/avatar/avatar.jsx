import React from "react";
import propTypes from "prop-types";
import { DefaultAvatar } from "./avatar.style";

const Avatar = ({
  imgUrl,
  sizes = "md",
  bgColor = "grey",
  border = false,
  borderColor = "tertiary",
  borderWidth = "0.4rem",
  children,
  className,
  onClick,
}) => {
  return (
    <DefaultAvatar
      imgUrl={imgUrl}
      sizes={sizes}
      bgColor={bgColor}
      border={border}
      borderColor={borderColor}
      borderWidth={borderWidth}
      className={className}
      onClick={onClick}
    >
      {children}
    </DefaultAvatar>
  );
};

Avatar.propTypes = {
  imgUrl: propTypes.string,
  sizes: propTypes.oneOf(["lg", "md", "sm", "xSm"]),
  bgColor: propTypes.string,
  border: propTypes.bool,
  borderColor: propTypes.string,
  borderWidth: propTypes.string,
  children: propTypes.node,
  onClick: propTypes.func,
  className: propTypes.string,
};

export default Avatar;
