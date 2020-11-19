import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
// FIXME
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

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

// TODO : 권한 설정
