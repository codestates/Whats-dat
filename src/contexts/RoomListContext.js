import React, { createContext, useContext } from "react";
import propTypes from "prop-types";

const RoomContext = createContext();

export const useRoom = () => {
  return useContext(RoomContext);
};

const RoomListContextProvider = ({ children }) => {
  const value = {};
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

RoomListContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RoomListContextProvider;
