import React from "react";
import { Field, ErrorMessage } from "formik";
import propTypes from "prop-types";

import Input from "../../../../atoms/input/input";
import FormikError from "../FormikError";

const FormikSelect = ({ label, name, options, ...rest }) => {
  return (
    <div className="form-control">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <Field
        // as='select'
        component={Input}
        variant="select"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={FormikError} />
    </div>
  );
};

FormikSelect.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  options: propTypes.arrayOf,
};

export default FormikSelect;
