const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
// functions.config().firebase
const { firestore } = functions;

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
  .onUpdate((event, context) => {
    const db = admin.firestore();
    const usersRef = db.collection("users");
    const snapShot = event.after;

    return event.after.ref
      .once("value")
      .then(() => snapShot.val())
      .then((status) => {
        if (status === "offline") {
          usersRef.doc(context.params.userId).set(
            {
              online: false,
            },
            { merge: true }
          );
        }
        return `offline ${context.params.userId}`;
      })
      .then(() => {});
  });
