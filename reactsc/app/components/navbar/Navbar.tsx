'use client'
import React, { ReactNode, useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { NavbarSvr } from './NavbarSvr';

export const Navbar = () => {
    const { userProfile, setUserProfile, activeMenu, setActiveMenu, setScreenSize, screenSize, user } = useStateContext();
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [setScreenSize]);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize, setActiveMenu]);

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    return (
        <NavbarSvr handleActiveMenu={handleActiveMenu} screenSize={screenSize} userProfile={userProfile} user={user} setUserProfile={setUserProfile} setActiveMenu={setActiveMenu}/>
    );
}
