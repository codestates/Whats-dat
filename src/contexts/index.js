import React from "react";
import { ThemeProvider } from "styled-components";
import propTypes from "prop-types";
import theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";
import UserContextProvider from "./UserContext";
import RankContextProvider from "./RankingContext";
import RoomListContextProvider from "./RoomListContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserContextProvider>
        <RankContextProvider>
          <RoomListContextProvider>{children}</RoomListContextProvider>
        </RankContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
};

GlobalContextProvider.propTypes = {
  children: propTypes.node,
};

export default GlobalContextProvider;
