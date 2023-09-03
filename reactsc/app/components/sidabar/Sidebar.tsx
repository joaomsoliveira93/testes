'use client'
import { useStateContext } from '../../contexts/ContextProvider';
import { SidebarSvr } from './SidebarSvr';

export const Sidebar = () => {
    const { setUserProfile, activeMenu, setActiveMenu, setThemeSettings, screenSize, user } = useStateContext();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    return (
        <SidebarSvr screenSize={screenSize} activeMenu={activeMenu} user={user} setActiveMenu={setActiveMenu} handleCloseSideBar={handleCloseSideBar} setUserProfile={setUserProfile} setThemeSettings={setThemeSettings} />
    )
}
