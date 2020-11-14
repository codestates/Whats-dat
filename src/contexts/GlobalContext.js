import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import propTypes from "prop-types";
import app, { googleProvider } from "../firebase";
import theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";

const SocialLoginContexet = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const snsLogin = () => {
    // auth.signInWithPopup();
  };

  const value = { snsLogin };

  return (
    <SocialLoginContexet.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </SocialLoginContexet.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default GlobalContextProvider;
