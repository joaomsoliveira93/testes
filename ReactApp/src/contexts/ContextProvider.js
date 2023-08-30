import React, { createContext, useContext, useState, useMemo } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [userProfile, setUserProfile] = useState(false);
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => ({ userProfile, setUserProfile, user, setUser, currentColor, setCurrentColor, currentMode, setCurrentMode, activeMenu, setActiveMenu, screenSize, setScreenSize, themeSettings, setThemeSettings }), [userProfile, user, currentColor, currentMode, activeMenu, screenSize, themeSettings]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
