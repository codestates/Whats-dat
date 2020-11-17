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
    // 1. 해당 라운드에 유저의 제출 정보 추가
    // TODO : 같은 uid의 유저는 한 라운드에 한 번씩만 제출이 가능하다
    console.log("roomId:", roomId);
    console.log("roundIndex:", roundIndex);
    console.log("value:", value);

    const gameRef = admin
      .firestore()
      .collection("gameDev")
      .doc(`${roomId}`)
      .collection("game_log")
      .doc("0");

    await gameRef.update({
      [`rounds.${roundIndex}`]: admin.firestore.FieldValue.arrayUnion({
        [context.auth.uid]: value,
      }),
    });

    const gameData = await gameRef.get();
    const currentRoundData = gameData.data().rounds[roundIndex];
    console.log("currentRoundData:", currentRoundData);

    // 2. 모든 유저가 제출 했다면
    if (currentRoundData.length === totalPlayers) {
      // 1. 이게 마지막 라운드라면
      const totalRounds =
        totalPlayers % 2 === 1 ? totalPlayers - 1 : totalPlayers - 2;

      if (roundIndex === totalRounds) {
        console.log("2-1. 이게 마지막 라운드라면", roundIndex, totalRounds);
        // [standBy, playing, closed]
        gameRef.update({
          status: "closed",
        });
        return "close modal";
      }

      // 2. 다음 라운드가 있다면
      await gameRef.update({
        [`rounds.${roundIndex + 1}`]: [],
      });
      console.log("2-2. 다음 라운드가 있다면", roundIndex, totalRounds);

      return "close modal";
    }

    return "submit completed";
  } catch (err) {
    throw new functions.https.HttpsError("unknown", err);
  }
});

// 	game:
// 		status: [standBy, playing, closed]
// 		rounds:
// 			0: // 0
// 					player_id: map
// 						values: string
// 			1: // 홀수
// 					player_id
// 						values: string
// 			2: // 짝수
// 					player_id
// 						values: string
