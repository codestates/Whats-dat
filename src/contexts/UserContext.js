import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import app, {
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

  const login = (type, credentials) => {
    switch (type) {
      case "email":
        return auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
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

  // FIXME : google 등의 경우 signin만 있다
  const register = (type, credentials) => {
    return auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  };

  const logOut = (type) => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, login, register, logOut };

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
