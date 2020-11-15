import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import {
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
} from "../firebase";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
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

  const logOut = () => {
    return auth.signOut();
  };

  const updateNickNameAndAvatar = (userProfile) => {
    return currentUser.updateProfile(userProfile);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logOut,
    updateNickNameAndAvatar,
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
