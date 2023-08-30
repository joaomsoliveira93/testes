import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = () => {
  const { currentColor, user, setUser, userProfile, setUserProfile } = useStateContext();
  const logout = () => {
    setUser(null);
    localStorage.removeItem('User');
    setUserProfile(false);
    window.location.replace('/');
  };
  return (
    <>
      <div className={`${userProfile ? 'block' : 'hidden'} z-50 bg-half-transparent w-screen h-screen fixed top-0 right-0`} onClick={() => setUserProfile(false)} />
      <div className={`${userProfile ? 'mr-2' : '-mr-96'} user-profile fixed mt-12 right-2  shadow-black shadow-2xl dark:bg-[#484B52]  bg-slate-200 z-50 pt-2 pb-4 pr-4 pl-4 rounded-lg`}>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">Perfil</p>
          <button
            type="button"
            onClick={() => {
              setUserProfile(false);
            }}
            style={{ backgroundColor: 'light-gray', borderRadius: '50%' }}
            className="text-2xl p-3 hover:bg-gray-200 text-black dark:text-white hover:text-black dark:hover:text-black "
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">
              {user.name}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {user.userType}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
        <div>
          <Link
            to={`/perfil/${user.username}`}
            onClick={() => setUserProfile(false)}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-gray-400 cursor-pointer  text-black dark:text-white dark:hover:text-black rounded-xl"
          >
            <button
              type="button"
              style={{ backgroundColor: currentColor, borderColor: currentColor }}
              className="text-white w-11 h-12 rounded-lg border-10 border-solid"
            >
              <AccountBoxIcon />
            </button>

            <div>
              <p>Perfil</p>
              <p>
                Ver Perfil
              </p>
            </div>
          </Link>
          <div
            onClick={() => logout()}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-gray-400 cursor-pointer text-black dark:text-white dark:hover:text-black rounded-xl"
          >
            <button
              type="button"
              style={{ backgroundColor: currentColor, borderColor: currentColor }}
              className="text-white w-11 h-12 rounded-lg border-10 border-solid"
            >
              <LogoutIcon />
            </button>

            <div>
              <p>Sair</p>
              <p>
                Terminar Sessão
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
