import React, { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

import { firestore } from "../firebase";

export const RoomContext = createContext();

export const useRoom = () => {
  return useContext(RoomContext);
};

const RoomContextProvider = ({ children }) => {
  const [currentRoomSetting, setCurrentRoomSetting] = useState();

  const createRoom = (values, roomUid) => {
    return firestore.collection("roomDev").doc(roomUid).set(values);
  };

  const updateRoomSetting = (values, roomUid) => {
    return firestore.collection("roomDev").doc(roomUid).update(values);
  };

  // const handlePlayersChange = () => {
  //   return firestore
  //     .collection("roomDev")
  //     .where("state", "==", "CA")
  //     .onSnapshot(function (querySnapshot) {
  //       const cities = [];
  //       querySnapshot.forEach(function (doc) {
  //         cities.push(doc.data().name);
  //       });
  //       console.log("Current cities in CA: ", cities.join(", "));
  //     });
  // };

  const value = {
    currentRoomSetting,
    setCurrentRoomSetting,
    createRoom,
    updateRoomSetting,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

RoomContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RoomContextProvider;
