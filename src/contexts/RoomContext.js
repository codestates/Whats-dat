import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
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
  const [end, setEnd] = useState(null);
  const [roomList, setRoomList] = useState();

  const [
    persistentCurrentRoomCode,
    setPersistentCurrentRoomCode,
  ] = useLocalStorage("roomCode", "");

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
        setPersistentCurrentRoomCode(roomUid);
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

  /*
  [[6], [6], [6], [6]]
  12
  start 12 - 18
    TODO:
    1) start와 대한 전역 스테이트를 만든다
    2) getRoomList가 실행될 때마다 start를 setStart를 해줌;;
    3) getRoomNext
      3-1) start 지점부터
      3-2)
    3) Next Btn 클릭 시
      3-1)
      3-2)
      1 [[6], [6]]
      [[6], [6]]
      */

  const getRoomNext = () => {
    const nextRoomListData = [];

    if (start) {
      const roomListRef = firestore
        .collection("roomDev")
        .orderBy("created_at", "desc")
        .startAt(start)
        .endBefore(end)
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
        setEnd(start);
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

  const getJoinedRoomInfo = (code) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    firestore
      .collection("roomDev")
      .doc(`${roomCode}`)
      .get()
      .then((data) => {
        setCurrentJoinedRoom({ roomUid: roomCode, ...data.data() });
        setPersistentCurrentRoomCode(roomCode);
      })
      .then(() => {
        // history.push("/lobby");
        return "getJoinedRoomInfo done";
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const joinRoom = async (code, setErrorMessage) => {
    const roomCode = typeof code === "object" ? code.code.toUpperCase() : code;
    try {
      firestore
        .collection("roomDev")
        .doc(`${roomCode}`)
        .get()
        .then((doc) => {
          const data = doc.data();
          const currentJoinedUsers = data.players.map((player) => {
            return player.user_id;
          });
          if (currentJoinedUsers.includes(currentUser.uid)) {
            throw new Error("Already Joined User");
          }
          return { roomUid: roomCode, ...data };
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
        .then(() => {
          // TODO: 완료시 getJoinedRoomInfo 동기 실행
          // getJoinedRoomInfo(code);
        })
        .catch((error) => {
          setErrorMessage({
            title: "Enter Room False",
            paragraph: `${error.message} 😱`,
          });
        });
    } catch (error) {
      throw new Error(error.message);
    }
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

    roomRef.delete().then(() => {
      console.log("clear room success");
    });
  };

  // TODO check
  const leaveRoom = (code, userid) => {
    const newPlayerList = [];
    setPersistentCurrentRoomCode("");

    currentJoinedRoom.players.forEach((player) => {
      if (player.user_id !== userid) {
        newPlayerList.push(player);
      }
    });

    const roomHost = { host: currentJoinedRoom.host };
    if (currentJoinedRoom.host === userid) {
      if (newPlayerList.length >= 1) {
        roomHost.host = newPlayerList[0].user_id;
      } else {
        cleanRoomData(code);
        return;
      }
    }

    // eslint-disable-next-line consistent-return
    return firestore
      .collection("roomDev")
      .doc(`${code}`)
      .update({ players: newPlayerList, ...roomHost })
      .then(() => {
        setIsInRoom(false);
      });
  };

  const startGame = (code) => {
    const gameLogRef = firestore
      .collection("roomDev")
      .doc(`${code}`)
      .collection("game_log")
      .doc("0");

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

    gameLogRef.set({
      rounds: {
        0: {},
      },
      status: "standBy",
      playOrder: shufflePlayers(playerListByUid),
    });
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
    // getLobbySnapshot,
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
