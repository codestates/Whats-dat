import React, { useEffect } from "react";
import propTypes from "prop-types";
import DrawingTemplate from "../../components/templates/Drawing/Drawing";

const Drawing = (props) => {
  useEffect(() => {
    props.setIsSubmitFalse();
  }, []);
  return <DrawingTemplate {...props} />;
};

Drawing.propTypes = {
  setIsSubmitFalse: propTypes.func,
};

export default Drawing;
