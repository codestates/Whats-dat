import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import propTypes from "prop-types";
import app, { googleProvider, auth } from "../firebase";
import theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";

export const SocialLoginContext = createContext();

export const useAuth = () => {
  return useContext(SocialLoginContext);
};

const GlobalContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login() {
    try {
      const res = await auth.signInWithPopup(googleProvider);
    } catch (e) {
      throw new Error(e);
    }
  }

  const value = { currentUser, login };

  return (
    <SocialLoginContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {!loading && children}
      </ThemeProvider>
    </SocialLoginContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default GlobalContextProvider;
