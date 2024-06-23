import React, { createContext, useContext, useState, useMemo } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [userProfile, setUserProfile] = useState(false);
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => ({ userProfile, setUserProfile, user, setUser, activeMenu, setActiveMenu, screenSize, setScreenSize, themeSettings, setThemeSettings }), [userProfile, user, activeMenu, screenSize, themeSettings]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
