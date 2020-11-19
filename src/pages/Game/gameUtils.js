export const getPreviousRoundData = (gameLog, currentUser, currentRound) => {
  const { playOrder } = gameLog;
  const myOrder = playOrder.indexOf(currentUser.uid);
  let prevOrder;
  if (myOrder === 0) {
    prevOrder = playOrder.length - 1;
  } else {
    prevOrder = myOrder - 1;
  }

  const prevPlayerId = playOrder[prevOrder];

  return gameLog.rounds[currentRound - 1][prevPlayerId];
};

export const calculateTotalRound = (totalPlayers) => {
  let totalRound = null;
  if (totalPlayers % 2 !== 0) {
    totalRound = totalPlayers;
  } else {
    totalRound = totalPlayers - 1;
  }
  return totalRound;
};

const mapUserIdWithNickName = (players) => {
  if (!players) return;
  // eslint-disable-next-line consistent-return
  return players.reduce((obj, { nickname, user_id: userId }) => {
    // eslint-disable-next-line no-param-reassign
    obj[userId] = nickname;
    return obj;
  }, {});
};

export const getUnSubmitPlayer = (roomInfo, gameLog) => {
  const currentRound = Object.keys(gameLog.rounds).length - 1;

  let unSubmitPlayers = roomInfo.players.filter((el) => {
    if (Object.keys(gameLog.rounds[currentRound]).includes(el.user_id)) {
      return false;
    }
    return true;
  });

  unSubmitPlayers = unSubmitPlayers.map((el) => {
    return {
      nickname: el.nickname,
      icon: el.avatar,
      avatarColor: el.avatarColor,
      is_drawing: currentRound % 2 !== 0,
    };
  });

  return unSubmitPlayers;
};

export const createUserGameResult = (gameLog, targetUserId, roomInfo) => {
  const { playOrder, rounds } = gameLog;
  const totalRounds = calculateTotalRound(playOrder.length);
  const targetIndex = playOrder.indexOf(targetUserId);
  const playersList = roomInfo.players;
  const userIdWithNickname = mapUserIdWithNickName(playersList);
  let resultList = [];

  for (let i = 0; i < totalRounds; i += 1) {
    let nextTargetIndex = targetIndex + i;
    if (nextTargetIndex >= playOrder.length) {
      nextTargetIndex -= playOrder.length;
    }
    resultList.push({ user_id: playOrder[nextTargetIndex] });
  }

  resultList = resultList.map((el, i) => {
    return { ...el, value: rounds[i][el.user_id] };
  });

  const sliderList = [
    {
      username: userIdWithNickname[targetUserId],
      start_word: resultList[0].value,
    },
  ];

  for (let i = 1; i < totalRounds; i += 1) {
    const currentRoundTarget = resultList[i].user_id;
    let item;

    if (i % 2 === 1) {
      item = {
        username: userIdWithNickname[currentRoundTarget],
        draw_word: resultList[i - 1].value,
        path_url: resultList[i].value,
      };
    } else {
      item = {
        username: userIdWithNickname[currentRoundTarget],
        guess_img: resultList[i - 1].value,
        guessed_word: resultList[i].value,
      };
    }
    sliderList.push(item);
  }
  return sliderList;
};

export const createGameResultList = (gameLog, roomInfo) => {
  const { playOrder } = gameLog;
  const resultList = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const player of playOrder) {
    const playerResult = createUserGameResult(gameLog, player, roomInfo);
    resultList.push(playerResult);
  }
  return resultList;
};

export const mapProgressPlayers = (playOrder, players) => {
  return playOrder.map((orderId) => {
    const playerData = players.filter((player) => {
      if (orderId === player.user_id) {
        return true;
      }
      return false;
    });

    return {
      user_id: orderId,
      nickname: playerData[0].nickname,
      avatar: playerData[0].avatar,
    };
  });
};
export default createGameResultList;
