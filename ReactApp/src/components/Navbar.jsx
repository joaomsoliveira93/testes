import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, dotColor }) => (
  <div content={title}>
    <button
      type="button"
      onClick={() => customFunc()}
      className="relative  text-xl rounded-full ml-4 -top-2 p-3 dark:text-white hover:dark:text-black hover:text-black  hover:bg-gray-200"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </div>
);

const Navbar = () => {
  const { userProfile, setUserProfile, activeMenu, setActiveMenu, setScreenSize, screenSize, user } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className=" dark:bg-[#484B52] z-30  bg-slate-200 hover:text-black fixed top-0 flex h-12 right-0 left-0 pt-2 justify-between ">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={user.appColor} icon={<AiOutlineMenu />} />
      <div className="flex pr-3">
        <div content="Profile">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 z-50 dark:text-white hover:dark:text-black hover:bg-gray-200  rounded-lg"
            onClick={() => {
              setUserProfile(!userProfile);
              if (screenSize <= 900) {
                setActiveMenu(false);
              }
            }}
          >
            <p>
              <span className="text-14">Olá,</span>{' '}
              <span className="font-bold ml-1 text-14">
                {user.name}
              </span>
            </p>
            <MdKeyboardArrowDown className=" text-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
