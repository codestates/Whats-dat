import React, { useRef } from "react";
import { Field, ErrorMessage } from "formik";
import propTypes from "prop-types";
import Input from "../../../../atoms/input/input";
import FormikError from "../FormikError";

const FormikInput = ({ label, name, getValue, ...rest }) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>
        <div className="label-alias">{name}</div>
        <Field
          component={Input}
          id={name}
          name={name}
          getValue={getValue}
          {...rest}
        />
      </label>
      <div className="formik__error">
        <ErrorMessage name={name} component={FormikError} />
      </div>
    </div>
  );
};

FormikInput.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  getValue: propTypes.func,
};

export default FormikInput;
