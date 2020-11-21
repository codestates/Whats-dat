import React from "react";
import { ThemeProvider } from "styled-components";
import propTypes from "prop-types";
import theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";

const GlobalContextProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

GlobalContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default GlobalContextProvider;
