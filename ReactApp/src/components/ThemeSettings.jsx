import React, { useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import axios from 'axios';
import { themeColors } from '../data/themeColors';
import { useStateContext } from '../contexts/ContextProvider';
import config from '../config.json';

const ThemeSettings = () => {
  const { setUser, user, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios.put(`${config.server.apiurl}/user/update`, { userId: user._id, user, cancelToken: cancelToken.token })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Operação Cancelada!")
        } else {
          console.log(err);
        }
      });
  }, [user]);

  return (
    <>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <div className={`${themeSettings ? 'block' : 'hidden'} z-50 bg-half-transparent w-screen h-screen fixed top-0 right-0`} onClick={() => setThemeSettings(false)} />
      <div className={`${themeSettings ? 'mr-0' : '-mr-96'} shadow-black shadow-xl fixed z-50 right-0 rounded-l-2xl float-right h-screen nav-bar dark:text-gray-200 dark:bg-[#484B52]  bg-slate-200`}>
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Definições</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Tema</p>
          {/*<div className="mt-4">
            <input
              type="radio"
              id="system"
              name="theme"
              value="system"
              className="cursor-pointer"
              onChange={(e) => setUser({
                ...user,
                appMode: e.target.value,
              })}
              checked={user.appMode === 'system'}
            />
            <label htmlFor="system" className="ml-2 text-md cursor-pointer">
              Sistema
            </label>
            </div>*/}
          <div className="mt-2">
            <input
              type="radio"
              id="light"
              name="theme"
              value="light"
              className="cursor-pointer"
              onChange={(e) => setUser({
                ...user,
                appMode: e.target.value,
              })}
              checked={user.appMode === 'light'}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Claro
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="dark"
              onChange={(e) => setUser({
                ...user,
                appMode: e.target.value,
              })}
              className="cursor-pointer"
              checked={user.appMode === 'dark'}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Escuro
            </label>
          </div>
        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Cores</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <div key={index} content={item.name}>
                <div
                  className="relative mt-2 cursor-pointer flex gap-5 items-center"
                  key={item.name}
                >
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setUser({
                      ...user,
                      appColor: item.color,
                    })}
                  >
                    <BsCheck className={`ml-2 text-2xl text-white ${item.color === user.appColor ? 'block' : 'hidden'}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSettings;
