/* eslint-disable */

import React from "react";
import { Formik, Form } from "formik";
import propTypes from "prop-types";

import Button from "../../../atoms/button/button";
import Header from "../../../atoms/header/header";

const FormikContainer = ({
  formInfo,
  initialValues,
  validationSchema,
  children,
  btncolor,
  method,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={method}
    >
      {(formik) => (
        <Form>
          {/* This line is for test purpose!!:{" "}
          <pre>{JSON.stringify(formik, null, 2)}</pre> */}
          {formInfo.formTitle ? (
            <Header
              text={
                formInfo.formTitle[0].toUpperCase() +
                formInfo.formTitle.slice(1)
              }
              variant="h2"
              weight="exbold"
            />
          ) : null}
          {formInfo.formSubtitle ? (
            <Header
              text={formInfo.formSubtitle}
              variant="h4"
              weight="bold"
              color="grey"
            />
          ) : null}
          {children}
          <Button
            type="submit"
            text={formInfo.buttonName}
            color={btncolor || "secondary"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
