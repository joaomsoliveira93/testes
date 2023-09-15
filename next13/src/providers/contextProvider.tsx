'use client'
import React, { createContext, useContext, useState, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for your context value
type ContextValueType = {
  userProfile: boolean;
  setUserProfile: Dispatch<SetStateAction<boolean>>;
  user: any; // Replace 'any' with the actual type of your 'user' state
  setUser: Dispatch<SetStateAction<any>>; // Replace 'any' with the actual type of your 'user' state
  activemenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  screenSize: number; // Replace 'string' with the actual type of 'screenSize'
  setScreenSize: Dispatch<SetStateAction<number>>; // Replace 'string' with the actual type of 'screenSize'
  themeSettings: boolean;
  setThemeSettings: Dispatch<SetStateAction<boolean>>;
};

const StateContext = createContext<ContextValueType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [screenSize, setScreenSize] = useState<number>(0);
  const [themeSettings, setThemeSettings] = useState<boolean>(false);
  const [activemenu, setActiveMenu] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Replace 'any' with the actual type of your 'user' state

  const contextValue = useMemo(
    () => ({
      userProfile,
      setUserProfile,
      user,
      setUser,
      activemenu,
      setActiveMenu,
      screenSize,
      setScreenSize,
      themeSettings,
      setThemeSettings,
    }),
    [userProfile, user, activemenu, screenSize, themeSettings]
  );

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a ContextProvider');
  }
  return context;
};