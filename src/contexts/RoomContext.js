import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [isInRoom, setIsInRoom] = useState();

  const createRoom = (values, roomUid) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return firestore
      .collection("roomDev")
      .doc(roomUid)
      .set({
        roomUid,
        ...values,
        created_at: timestamp,
      })
      .then(() => {
        setIsInRoom(true);
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
            .update({ players: [...data] })
            .then(() => {
              setIsInRoom(true);
            });
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

  // const getLobbySnapshot = (code) => {
  //   const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
  //   const unsubscribe = firestore
  //     .collection("roomDev")
  //     .doc(`${currentJoinedRoom.roomUid}`)
  //     .onSnapshot((doc) => {
  //       setCurrentJoinedRoom(doc.data());
  //     });

  //   if (setIsInRoom === false) {
  //     unsubscribe();
  //   }
  // };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentJoinedRoom) {
      const unsubscribe = firestore
        .collection("roomDev")
        .doc(`${currentJoinedRoom.roomUid}`)
        .onSnapshot((doc) => {
          setCurrentJoinedRoom(doc.data());
        });

      if (isInRoom === false) {
        return unsubscribe;
      }
    }
  }, [isInRoom]);

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

  const enterRoom = (uid) => {
    const room = firestore.collection("roomDev").document(uid).get().data();
    if (uid === room.uid) {
      return true;
    }
    return false;
  };

  const leaveRoom = (code, userid) => {
    const newPlayerList = [];
    currentJoinedRoom.players.forEach((player) => {
      if (player.user_id !== userid) {
        newPlayerList.push(player);
      }
    }); // 유저를 제외한 어레이를 리턴해서

    return firestore
      .collection("roomDev")
      .doc(`${code}`)
      .update({ players: newPlayerList })
      .then(() => {
        setIsInRoom(false);
      });
  };

  const value = {
    currentRoomSetting,
    roomList,
    setCurrentRoomSetting,
    createRoom,
    updateRoomSetting,
    chunkBySix,
    enterRoom,
    getRoomList,
    joinRoom,
    getJoinedRoomInfo,
    currentJoinedRoom,
    setCurrentJoinedRoom,
    // getLobbySnapshot,
    updatePlayerReady,
    leaveRoom,
    isInRoom,
  };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

RoomContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RoomContextProvider;
