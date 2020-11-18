const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

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
        // [standBy, playing, closed]
        gameRef.update({
          status: "closed",
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

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();

    const userStatusFirestoreRef = firestore.doc(
      `status/${context.params.uid}`
    );

    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    console.log(status, eventStatus);

    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed);

    return userStatusFirestoreRef.set(eventStatus);
  });
