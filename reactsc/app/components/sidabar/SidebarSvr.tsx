
import { Link, NavLink } from 'react-router-dom';
import { IoMdContacts } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import FenceIcon from '@mui/icons-material/Fence';

interface SidebarProps{
    screenSize:number;
    activeMenu:boolean;
    user:any;
    setActiveMenu:(activeMenu:boolean)=>void;
    handleCloseSideBar:()=>void;
    setUserProfile:(userProfile:boolean)=>void;
    setThemeSettings:(themeSettings:boolean)=>void;
}

export const SidebarSvr = ({ screenSize,activeMenu, user, setActiveMenu, handleCloseSideBar, setUserProfile, setThemeSettings}:SidebarProps) => {

    return (
        <>
            <div className={`${screenSize <= 900 && activeMenu ? 'block' : 'hidden'} z-30 bg-half-transparent w-screen h-screen fixed top-0 right-0`} onClick={() => setActiveMenu(false)} />
            <div className={`${activeMenu ? 'w-72 ' : 'w-0 '} fixed top-[48px] sidebar dark:bg-[#484B52] shadow-xl z-40 shadow-black bg-slate-200  bottom-0 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10`}>
                <div className="flex items-center">
                    <Link
                        to="/"
                        onClick={() => { handleCloseSideBar(); setUserProfile(false); setThemeSettings(false); }}
                        className=" mt-5 ml-7 mr-10 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                    >
                        {/*<img src={`${process.env.PUBLIC_URL}/img/companyLogo.png`} alt="" />*/}
                    </Link>
                </div>
                <div className="mt-10 ">
                    <div>
                        <NavLink
                            to="/clientes"
                            key="clientes"
                            onClick={() => { handleCloseSideBar(); setUserProfile(false); setThemeSettings(false); }}
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? user.appColor : '',
                            })}
                            className={({ isActive }) => (`flex items-center gap-5 pl-4 pt-3 pb-2.5 m-2 rounded-lg text-md ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200'}`)}
                        >
                            <FenceIcon />
                            <span className="capitalize ">Clientes</span>
                        </NavLink>
                    </div>

                    {user.canManageUsers
                        && (
                            <div>
                                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">Administração</p>

                                <NavLink
                                    to="/utilizadores"
                                    key="utilizadores"
                                    onClick={() => { handleCloseSideBar(); setUserProfile(false); setThemeSettings(false); }}
                                    style={({ isActive }) => ({
                                        backgroundColor: isActive ? user.appColor : '',
                                    })}
                                    className={({ isActive }) => (`flex items-center gap-5 pl-4 pt-3 pb-2.5 m-2 rounded-lg text-md ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200'}`)}
                                >
                                    <IoMdContacts />
                                    <span className="capitalize ">Utilizadores</span>
                                </NavLink>
                            </div>
                        )}
                    <NavLink
                        to=""
                        className="absolute left-0 w-11/12 bottom-0 gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-gray-200 m-2"
                        onClick={() => {
                            setThemeSettings(true);
                            setUserProfile(false);
                            handleCloseSideBar();
                        }}
                    >
                        <div className="flex">
                            <FiSettings className="mt-1" />{' '}
                            <span className="capitalize ml-5">Definições </span>{' '}
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}
