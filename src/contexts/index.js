import React from "react";
import { ThemeProvider } from "styled-components";
import propTypes from "prop-types";
import theme from "../styles/Theme";
import GlobalStyle from "../styles/GlobalStyle";
import UserContextProvider from "./UserContext";
import RankContextProvider from "./RankingContext";
import RoomListContextProvider from "./RoomListContext";
import GameContextProvider from "./GameContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserContextProvider>
        <RankContextProvider>
          <RoomListContextProvider>
            <GameContextProvider>{children}</GameContextProvider>
          </RoomListContextProvider>
        </RankContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
};

GlobalContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default GlobalContextProvider;
