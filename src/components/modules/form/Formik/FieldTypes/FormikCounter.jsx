import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FiPlus, FiMinus } from "react-icons/fi";
import propTypes from "prop-types";
import FormikError from "../FormikError";

const FormikCounter = ({ label, name, maxPlayers = 4, ...rest }) => {
  const [numPlayers, setNumPlayers] = useState(maxPlayers);

  /* eslint no-param-reassign: "error" */
  const incrementNumPlayers = (form) => {
    if (numPlayers < 6) {
      form.values.settings.max_players = numPlayers + 1;
      setNumPlayers(numPlayers + 1);
    }
  };

  const decrementNumPlayers = (form) => {
    if (numPlayers > 4) {
      form.values.settings.max_players = numPlayers - 1;
      setNumPlayers(numPlayers - 1);
    }
  };

  return (
    <div className="form-control counter-group">
      <Field name={name} {...rest}>
        {({ field, form }) => {
          form.values.settings.max_players = numPlayers;
          return (
            <>
              <label htmlFor={name}>{label}</label>
              <div
                className="minus-circle"
                onClick={() => decrementNumPlayers(form)}
              >
                <FiMinus />
              </div>

              <input
                {...field}
                type="number"
                name={name}
                value={numPlayers}
                readOnly="readyonly"
              />
              <div
                className="plus-circle"
                onClick={() => incrementNumPlayers(form)}
              >
                <FiPlus />
              </div>
            </>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={FormikError} />
    </div>
  );
};

FormikCounter.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  maxPlayers: propTypes.number,
};

export default FormikCounter;
