import React from "react";
import propTypes from "prop-types";
import { DefaultImage } from "./image.style";

const Image = ({ url, size, border, className }) => {
  return (
    <DefaultImage url={url} size={size} border={border} className={className} />
  );
};

Image.propTypes = {
  url: propTypes.string,
  size: propTypes.number,
  border: propTypes.bool,
  className: propTypes.string,
};

Image.defaultProps = {
  size: 50,
  border: true,
};

export default Image;
