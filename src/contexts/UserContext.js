import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  firestore,
  db,
} from "../firebase";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const userGameProfileSchema = {
    nickname: "",
    avatar: "",
    avatarColor: "",
    score: 0,
  };

  const [currentUser, setCurrentUser] = useState();
  const [userGameProfile, setUserGameProfile] = useState(userGameProfileSchema);
  const [loading, setLoading] = useState(true);

  const login = (type, email, password) => {
    switch (type) {
      case "email":
        return auth.signInWithEmailAndPassword(email, password);
      case "google":
        return auth.signInWithPopup(googleProvider);
      case "facebook":
        return auth.signInWithPopup(facebookProvider);
      case "twitter":
        return auth.signInWithPopup(twitterProvider);
      default:
        return null;
    }
  };

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const createUserGameProfile = (uid) => {
    return firestore.collection("users").doc(uid).set({
      nickname: "",
      avatar: "",
      avatarColor: "",
      roomId: "",
      score: 0,
    });
  };

  const logOut = () => {
    localStorage.clear();
    return auth.signOut();
  };

  const updateUserGameProfile = (userProfile) => {
    return firestore
      .collection("users")
      .doc(currentUser.uid)
      .update(userProfile);
  };

  const getUser = (userId) => {
    return firestore.collection("users").doc(userId).get();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (!user) {
        setUserGameProfile(userGameProfileSchema);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((user) => {
          const currentUserGameProfile = user.data();
          if (!currentUserGameProfile) return;
          setUserGameProfile(currentUserGameProfile);
        })
        .catch((err) => {
          throw new Error(err.message);
        });

      const usersRef = firestore.collection("users");
      const onlineRef = db.ref(".info/connected");

      onlineRef.on("value", (snapshot) => {
        db.ref(`/status/${currentUser.uid}`)
          .onDisconnect()
          .set("offline")
          .then(() => {
            usersRef.doc(`${currentUser.uid}`).set(
              {
                online: true,
              },
              { merge: true }
            );

            db.ref(`/status/${currentUser.uid}`).set("online");
          });
      });
    }
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    register,
    logOut,
    userGameProfile,
    createUserGameProfile,
    updateUserGameProfile,
    setUserGameProfile,
    getUser,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default UserContextProvider;
