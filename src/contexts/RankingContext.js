import React, { createContext, useContext } from "react";
import propTypes from "prop-types";

const RankContext = createContext();

export const useRank = () => {
  return useContext(RankContext);
};

const RankContextProvider = ({ children }) => {
  const value = {};
  return <RankContext.Provider value={value}>{children}</RankContext.Provider>;
};

RankContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RankContextProvider;
