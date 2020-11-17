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

// {"roomUid":"ZS10","is_started":false,"host":"TAmVZvPdAmQSHyVZgVSI4FEfWah1","settings":{"room_name":"최시영만 들어와라","limit_time":"30","max_players":6},"players":[{"user_id":"TAmVZvPdAmQSHyVZgVSI4FEfWah1","nickname":"엥???","avatar":"AVATAR_HORSE","avatarColor":"grey","score":0,"is_ready":false}, {"user_id":"cZBK4IFZzGh3T3Vc1gaxxwiPPPw1",avatar: "AVATAR_SMILE"
// avatarColor: "danger"
// nickname: "helloworld","score":0,"is_ready":false}],"game":{"is_started":false}}
