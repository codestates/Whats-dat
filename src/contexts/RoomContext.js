import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import firebase from "firebase/app";

import { firestore } from "../firebase";
import { useAuth } from "./UserContext";
import useLocalStorage from "../utils/useLocalStorage";

export const RoomContext = createContext();
export const useRoom = () => {
  return useContext(RoomContext);
};

const RoomContextProvider = ({ children }) => {
  const { currentUser, userGameProfile } = useAuth();
  const [currentRoomSetting, setCurrentRoomSetting] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentJoinedRoom, setCurrentJoinedRoom] = useState();
  const [isInRoom, setIsInRoom] = useState();
  const [start, setStart] = useState(null);

  const [roomList, setRoomList] = useState();

  const [
    persistentCurrentRoomCode,
    setPersistentCurrentRoomCode,
  ] = useLocalStorage("roomCode", "");

  const createRoom = async (values, roomUid) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await firestore
      .collection("roomDev")
      .doc(roomUid)
      .set({
        roomUid,
        ...values,
        created_at: timestamp,
      });

    await firestore.collection("users").doc(currentUser.uid).update({
      roomId: roomUid,
    });

    setIsInRoom(true);
    setPersistentCurrentRoomCode(roomUid);

    // Client. user가 방에 입장할 시 roomId를 Update함(joinRoom, createRoom)
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

  const getRoomNext = () => {
    const nextRoomListData = [];

    if (start) {
      const roomListRef = firestore
        .collection("roomDev")
        .orderBy("created_at", "desc")
        .startAfter(start)
        .limit(6);

      roomListRef.get().then((querySnapShot) => {
        querySnapShot.docs.forEach((doc) => {
          const uid = doc.id;
          const roomItem = doc.data();
          const roomProcessedData = {
            roomCode: uid,
            roomName: roomItem.settings.room_name,
            curNumPlayers: roomItem.players.length,
            maxNumPlayers: roomItem.settings.max_players,
          };
          nextRoomListData.push(roomProcessedData);
        });
        setRoomList([...roomList, nextRoomListData]);
        setStart(querySnapShot.docs[querySnapShot.docs.length - 1]);
      });
    }
  };

  const getRoomList = () => {
    const roomListRef = firestore
      .collection("roomDev")
      .orderBy("created_at", "desc")
      .limit(19);

    roomListRef.get().then((snapshots) => {
      setStart(snapshots.docs[snapshots.docs.length - 1]);
    });

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

  const getJoinedRoomInfo = async (code) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    try {
      const roomData = await firestore
        .collection("roomDev")
        .doc(`${roomCode}`)
        .get();
      setCurrentJoinedRoom({ roomUid: roomCode, ...roomData.data() });
      setPersistentCurrentRoomCode(roomCode);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const joinRoom = async (code, setErrorMessage) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;

    try {
      const roomRef = firestore.collection("roomDev").doc(`${roomCode}`);

      const roomDoc = await roomRef.get();
      const roomData = roomDoc.data();

      if (!roomData) throw new Error("Deleted Room");

      const currentJoinedUsers = roomData.players.map(
        (player) => player.user_id
      );

      if (currentJoinedUsers.includes(currentUser.uid))
        throw new Error("Already Joined User");

      if (roomData.players.length >= roomData.settings.max_players)
        throw new Error("Full Room");

      if (roomData.is_started) throw new Error("Already Playing");

      const modifiedPlayersData = [];
      modifiedPlayersData.push(...roomData.players, {
        user_id: currentUser.uid,
        is_ready: false,
        ...userGameProfile,
      });

      await roomRef.update({ players: [...modifiedPlayersData] });
      setIsInRoom(true);

      await firestore.collection("users").doc(currentUser.uid).update({
        roomId: roomCode,
      });

      // TODO: 완료시 getJoinedRoomInfo 동기 실행
      return getJoinedRoomInfo(code);
    } catch (error) {
      setErrorMessage({
        title: `${error.message} 😱`,
      });
    }
    return null;
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isInRoom && persistentCurrentRoomCode) {
      const unsubscribe = firestore
        .collection("roomDev")
        .doc(`${persistentCurrentRoomCode}`)
        .onSnapshot((doc) => {
          setCurrentJoinedRoom(doc.data());
        });
      return () => {
        unsubscribe();
      };
    }
  }, [isInRoom, persistentCurrentRoomCode]);

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
    const room = firestore.collection("roomDev").doc(uid).get().data();
    if (uid === room.uid) {
      return true;
    }
    return false;
  };

  const cleanRoomData = (code) => {
    const roomRef = firestore.collection("roomDev").doc(`${code}`);
    roomRef.delete();
  };

  // TODO check
  const leaveRoom = async (code) => {
    const newPlayerList = [];
    setPersistentCurrentRoomCode("");

    currentJoinedRoom.players.forEach((player) => {
      if (player.user_id !== currentUser.uid) {
        newPlayerList.push(player);
      }
    });

    const roomHost = { host: currentJoinedRoom.host };
    if (currentJoinedRoom.host === currentUser.uid) {
      if (!newPlayerList.length) {
        cleanRoomData(code);
        return;
      }
      roomHost.host = newPlayerList[0].user_id;
    }

    // collection user에서 roomId 지우기
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid);

    await userRef.update({ roomId: "" });

    // eslint-disable-next-line consistent-return
    return firestore
      .collection("roomDev")
      .doc(`${code}`)
      .update({ players: newPlayerList, ...roomHost })
      .then(() => {
        setIsInRoom(false);
      });
  };

  const startGame = async (code) => {
    try {
      const playerListByUid = [];
      currentJoinedRoom.players.forEach((player) => {
        playerListByUid.push(player.user_id);
      });

      const shufflePlayers = function (players) {
        const copy = players.slice();
        for (let i = players.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * i);
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const gameLogRef = firestore
        .collection("roomDev")
        .doc(`${code}`)
        .collection("game_log")
        .doc("0");

      gameLogRef.set({
        rounds: {
          0: {},
        },
        status: "playing",
        playOrder: shufflePlayers(playerListByUid),
      });

      const roomRef = firestore.collection("roomDev").doc(`${code}`);
      const roomData = await roomRef.get();
      let { players } = roomData.data();

      players = players.map((player) => {
        return { ...player, is_ready: false };
      });

      roomRef.update({ players, is_started: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (currentJoinedRoom !== undefined) {
      if (
        currentJoinedRoom.players &&
        currentJoinedRoom.players.every((player) => {
          return player.is_ready;
        }) &&
        currentJoinedRoom.players.length >= 3
      ) {
        startGame(currentJoinedRoom.roomUid);
        setIsGameStarted(true);
      }
    }
  }, [currentJoinedRoom]);

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
    updatePlayerReady,
    leaveRoom,
    isInRoom,
    setIsInRoom,
    persistentCurrentRoomCode,
    setPersistentCurrentRoomCode,
    isGameStarted,
    setIsGameStarted,
    getRoomNext,
  };
  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

RoomContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RoomContextProvider;
