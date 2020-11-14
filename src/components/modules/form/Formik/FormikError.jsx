import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  color: #ffaeae;
  font-size: 1rem;
  font-weight: normal;
  text-align: left;
  margin-left: 1.6rem;
`;

const FormikError = ({ children }) => {
  return <Wrapper className="error__message">{children}</Wrapper>;
};

FormikError.propTypes = {
  children: propTypes.node,
};

export default FormikError;
