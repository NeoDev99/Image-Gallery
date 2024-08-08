import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user can be null, 'regular', or 'admin'

  // Example function to log in as an admin
  const loginAsAdmin = () => {
    setUser('admin');
  };

  // Example function to log in as a regular user
  const loginAsUser = () => {
    setUser('regular');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
