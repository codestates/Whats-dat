import React, { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const GameContextProvider = ({ children }) => {
  const value = {};
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

GameContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default GameContextProvider;
