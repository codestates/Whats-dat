import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import propTypes from "prop-types";

import FormikError from "../FormikError";
import Avatar from "../../../../atoms/avatar/avatar";
import Icon from "../../../../atoms/icon/icon";

const FormikRadio = ({ label, name, options, ...rest }) => {
  const [selected, setSelected] = useState("");

  const handleClick = (option, form) => {
    setSelected(option.avatar);
    form.values.avatarColor = option.avatarColor;
    /* eslint no-param-reassign: "error" */
  };

  return (
    <>
      <div className="form-control radio-group">
        <Field name={name} {...rest}>
          {({ field, form }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.avatar}>
                  <Avatar
                    className="circles"
                    onClick={() => handleClick(option, form)}
                    border={selected === option.avatar}
                    bgColor={option.avatarColor}
                  >
                    <input
                      {...field}
                      type="radio"
                      id={option.avatar}
                      value={option.avatar}
                      checked={field.value === option.avatar}
                    />
                    <Icon variant={option.avatar} color="white" />
                  </Avatar>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>
      <div className="formik__error">
        <ErrorMessage name={name} component={FormikError} />
      </div>
    </>
  );
};

FormikRadio.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  options: propTypes.objectOf(propTypes.any),
};

export default FormikRadio;
