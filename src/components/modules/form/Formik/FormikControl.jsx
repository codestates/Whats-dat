import React from "react";
import propTypes from "prop-types";
import FormikInput from "./FieldTypes/FormikInput";
import FormikRadio from "./FieldTypes/FormikRadio";
import FormikSelect from "./FieldTypes/FormikSelect";
import FormikCounter from "./FieldTypes/FormikCounter";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <FormikInput {...rest} />;
    case "radio":
      return <FormikRadio {...rest} />;
    case "select":
      return <FormikSelect {...rest} />;
    case "counter":
      return <FormikCounter {...rest} />;
    default:
      return null;
  }
};

FormikControl.propTypes = {
  control: propTypes.oneOf(["input", "radio", "select", "counter"]),
};

export default FormikControl;
