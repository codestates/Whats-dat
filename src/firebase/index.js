import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

// 유저가 로그아웃 했을때
// 1. Room에서 접종 했을때 > 로그아웃 한 유저, 멤버리스트에서 삭제
// 마지막 유저였다면 방 자체를 삭제
// 2. Game에서 접종 했을때 > 방 삭제시키고 모달로 안내창 띄워주기

// 1. function에 snapshot 걸어두고
// Client. user가 방에 입장할 시 roomId를 Update함(joinRoom, createRoom)
// Functions. disconnect시 roomId로 Room을 찾아서 PlayerList에서 삭제함

const firebaseConfig = {
  apiKey: "AIzaSyCRLiQKZrFAy1vuNLRPYVUYEKT962gKW5c",
  authDomain: "whats-dat-dev.firebaseapp.com",
  databaseURL: "https://whats-dat-dev.firebaseio.com",
  projectId: "whats-dat-dev",
  storageBucket: "whats-dat-dev.appspot.com",
  messagingSenderId: "345442775108",
  appId: "1:345442775108:web:59c68a70d634cbf7a58c11",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const db = app.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();

export default app;
