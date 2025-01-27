'use client'
import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser , setCurrentUser ] = useState(null);
  const [users, setUsers] = useState([]); // Store registered users

  const addToCart = (product) => {
    // Your existing addToCart logic
  };

  const login = (user) => {
    // Your existing login logic
    setCurrentUser (user);
  };

  const logout = () => {
    setCurrentUser (null);
  };

  const register = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setCurrentUser (user); // Automatically log in the user after registration
  };

  return (
    <AuthContext.Provider value={{ currentUser , addToCart, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;