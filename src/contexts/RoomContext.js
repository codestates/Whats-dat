import React, { createContext, useContext, useState } from "react";
import propTypes from "prop-types";
import firebase from "firebase/app";
import { firestore } from "../firebase";
import { useAuth } from "./UserContext";

export const RoomContext = createContext();
export const useRoom = () => {
  return useContext(RoomContext);
};
const RoomContextProvider = ({ children }) => {
  const { currentUser, userGameProfile } = useAuth();
  const [currentRoomSetting, setCurrentRoomSetting] = useState();
  const [roomList, setRoomList] = useState();
  const [currentJoinedRoom, setCurrentJoinedRoom] = useState();
  const createRoom = (values, roomUid) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return firestore
      .collection("roomDev")
      .doc(roomUid)
      .set({
        roomUid,
        ...values,
        created_at: timestamp,
      });
  };
  const updateRoomSetting = (values, roomUid) => {
    return firestore.collection("roomDev").doc(roomUid).update(values);
  };
  const chunkBySix = (roomListData) => {
    let tempArr = [];
    const listItemData = [];
    for (let i = 0; i < roomListData.length; i += 1) {
      if (tempArr.length === 6) {
        listItemData.push(tempArr);
        tempArr = [];
        tempArr.push(roomListData[i]);
      } else if (i === roomListData.length - 1 && tempArr.length) {
        listItemData.push(tempArr);
      } else {
        tempArr.push(roomListData[i]);
      }
    }
    return listItemData;
  };
  const getRoomList = () => {
    const roomListRef = firestore
      .collection("roomDev")
      .orderBy("created_at", "desc")
      .limit(13);
    const roomListData = [];
    const result = [];
    roomListRef
      .get()
      .then((querySnapShot) => {
        querySnapShot.docs.forEach((doc) => {
          const uid = doc.id;
          const roomItem = doc.data();
          const roomProcessedData = {
            roomCode: uid,
            roomName: roomItem.settings.room_name,
            curNumPlayers: roomItem.players.length,
            maxNumPlayers: roomItem.settings.max_players,
          };
          roomListData.push(roomProcessedData);
        });
        result.push(chunkBySix(roomListData));
        return result;
      })
      .then((data) => {
        setRoomList(data[0]);
      });
  };
  const joinRoom = async (code) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    try {
      firestore
        .collection("roomDev")
        .doc(`${roomCode}`)
        .get()
        .then((doc) => {
          return { roomUid: roomCode, ...doc.data() };
        })
        .then((data) => {
          const modifiedPlayersData = [];
          if (data.players.length < data.settings.max_players) {
            modifiedPlayersData.push(...data.players, {
              user_id: currentUser.uid,
              isReady: false,
              ...userGameProfile,
            });
          }
          return modifiedPlayersData;
        })
        .then((data) => {
          firestore
            .collection("roomDev")
            .doc(`${roomCode}`)
            .update({ players: [...data] });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getJoinedRoomInfo = (code) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    firestore
      .collection("roomDev")
      .doc(`${roomCode}`)
      .get()
      .then((data) => {
        setCurrentJoinedRoom({ roomUid: roomCode, ...data.data() });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };
  const getLobbySnapshot = (code) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    firestore
      .collection("roomDev")
      .doc(`${roomCode}`)
      .onSnapshot((doc) => {
        setCurrentJoinedRoom(doc.data());
      });
  };
  const updatePlayerReady = (code, userid) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    const newCurrentJoinedRoom = currentJoinedRoom.players.map((player) => {
      if (player.user_id === userid) {
        // eslint-disable-next-line no-param-reassign
        player.is_ready = !player.is_ready;
      }
      return player;
    });
    firestore
      .collection("roomDev")
      .doc(`${roomCode}`)
      .update({ players: newCurrentJoinedRoom });
  };
  const enterRoom = async (uid) => {
    const room = firestore.collection("roomDev").document(uid).get().data();
    if (uid === room.uid) {
      return true;
    }
    return false;
  };
  const updateRoom = async (uid, info) => {
    return firestore.collection("roomDev").document(uid).update(info);
  };
  const value = {
    currentRoomSetting,
    roomList,
    setCurrentRoomSetting,
    createRoom,
    updateRoomSetting,
    chunkBySix,
    enterRoom,
    updateRoom,
    getRoomList,
    joinRoom,
    getJoinedRoomInfo,
    currentJoinedRoom,
    setCurrentJoinedRoom,
    getLobbySnapshot,
    updatePlayerReady,
  };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};
RoomContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};
export default RoomContextProvider;
