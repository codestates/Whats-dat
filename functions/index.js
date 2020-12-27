const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
// functions.config().firebase

exports.handleGameSubmit = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can add requests"
    );
  }

  if (!data) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "invalid submit data"
    );
  }

  const { roomId, roundIndex, value, totalPlayers } = data;
  try {
    const gameRef = admin
      .firestore()
      .collection("roomDev")
      .doc(`${roomId}`)
      .collection("game_log")
      .doc("0");

    await gameRef.update({
      [`rounds.${roundIndex}.${context.auth.uid}`]: value,
    });

    const gameData = await gameRef.get();
    const currentRoundData = gameData.data().rounds[roundIndex];

    if (Object.keys(currentRoundData).length === totalPlayers) {
      const totalRounds =
        totalPlayers % 2 === 1 ? totalPlayers - 1 : totalPlayers - 2;

      if (roundIndex === totalRounds) {
        // [playing, closed]
        await gameRef.update({
          status: "closed",
        });

        const roomRef = admin
          .firestore()
          .collection("roomDev")
          .doc(`${roomId}`);

        await roomRef.update({
          is_started: false,
        });

        return "close modal";
      }

      await gameRef.update({
        [`rounds.${roundIndex + 1}`]: {},
      });

      return "close modal";
    }

    return "submit completed";
  } catch (err) {
    throw new functions.https.HttpsError("unknown", err);
  }
});

exports.onUserStatusChange = functions.database
  .ref("/status/{userId}")
  .onUpdate(async (event, context) => {
    const db = admin.firestore();
    const usersRef = db.collection("users");
    const snapShot = event.after;
    const { userId } = context.params;

    const user = await usersRef.doc(userId).get();
    const { roomId } = user.data();
    if (!roomId) return;
    const roomRef = db.collection("roomDev").doc(roomId);

    const status = await event.after.ref
      .once("value")
      .then(() => snapShot.val());

    if (status === "online") return;

    usersRef.doc(userId).set(
      {
        online: false,
        roomId: "",
      },
      { merge: true }
    );

    const room = await roomRef.get();
    const roomData = room.data();

    if (roomData.players.length === 1) {
      await roomRef.collection("game_log").doc("0").delete();
      await roomRef.delete();
      return;
    }

    if (roomData.is_started === true) {
      await roomRef.update({
        is_started: false,
      });

      const gameRef = admin
        .firestore()
        .collection("roomDev")
        .doc(`${roomId}`)
        .collection("game_log")
        .doc("0");
      await gameRef.update({
        status: "destroy",
      });
    }

    const modifiedPlayers = roomData.players.filter(
      (player) => player.user_id !== userId
    );

    await roomRef.update({
      host:
        roomData.host === userId ? modifiedPlayers[0].user_id : roomData.host,
      players: modifiedPlayers,
    });
  });
