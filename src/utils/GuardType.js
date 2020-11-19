export default {
  IS_SIGNED: "IS_SIGNED",
  IS_NOT_SIGNED: "IS_NOT_SIGNED",
  IS_IN_ROOM: "IS_IN_ROOM",
  IS_PLAYING: "IS_PLAYING",
};

// roomContext //
// roomContext => roomList를 생성
// roomList 전달 newGame.js => newGame.jsx
// roomList 전달 newGame.jsx => slider.jsx
//
// roomList [[6], [6] (오른쪽)]
//

// startAt
// getMoreRoomList

//  var messages = []
//   var listeners = []    // list of listeners
//   var start = null      // start position of listener
//   var end = null        // end position of listener
//   function getMessages(chatId) {
//     // query reference for the messages we want
//     let ref = db.collection('chats').doc(chatId)
//     .collection('messages')
//     // single query to get startAt snapshot
//     ref.orderBy('createdAt', 'desc')
//     .limit(50).get()
//     .then((docs) => {

//     // save startAt snapshot
//     start = docs.docs[docs.docs.length - 1] 50번째꺼를 집는다
//     // create listener using startAt snapshot (starting boundary)
//     let listener = ref.orderBy('createdAt')
//       .startAt(start)
//       .onSnapshot((messages) => {
//         // append new messages to message array
//         messages.forEach((message) => {
//           // filter out any duplicates (from modify/delete events)
//           messages = messages.filter(x => x.id !== message.id)
//           messages.push(message.data())
//         })
//       })
//       // add listener to list
//       listeners.push(listener)
//     })
//   }
//     function getMoreMessages(chatId) {
//     let ref = db.collection('chats').doc(chatId)
//     .collection('messages')
//     // single query to get new startAt snapshot
//     ref.orderBy('createdAt', 'desc')
//     .startAt(start)
//     .limit(50).get()
//     .then((snapshots) => {
//      // previous starting boundary becomes new ending boundary
//       end = start
//       start = snapshots.docs[snapshots.docs.length - 1]
//       // create another listener using new boundaries
//       let listener = ref.orderBy('createdAt')
//       .startAt(start).endBefore(end)
//       .onSnapshot((messages) => {
//         messages.forEach((message) => {
//           messages = messages.filter(x => x.id !== message.id)
//           messages.push(message.data())
//         })
//       })
//       listeners.push(listener)
//     })
//   }
//   // call to detach all listeners
//   function detachListeners() {
//     listeners.forEach(listener => listener())
//   }
