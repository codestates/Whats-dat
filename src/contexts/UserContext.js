import React, { createContext, useContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import app, { googleProvider, auth } from "../firebase";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

const login = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
  } catch (e) {
    throw new Error(e);
  }
};

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, login };

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
