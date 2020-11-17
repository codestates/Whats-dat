const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

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

// TODO: 게임 생성시 플레이 순서 랜덤 생성
// const shufflePlayers = function (players) {
//     const copy = players.slice();
//     for (let i = players.length - 1; i > 0; i -= 1) {
//       const j = Math.floor(Math.random() * i);
//       [copy[i], copy[j]] = [copy[j], copy[i]];
//     }
//     return copy;
//   };

// playOrder = [ user_id, user_id, user_id, user_id, user_id, user_id ]

// collection('game_log').doc("0").update({
//   playOrder : [user_id, user_id, user_id, user_id],
//   rounds: {
//     "0": {}
//   },
//   status: "standBy"
// })
