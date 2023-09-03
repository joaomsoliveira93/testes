'use client'
import React, { useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextProvider';
import config from '../../config.json';
import { ThemeSettingsSvr } from './ThemeSettingsSvr';

export const ThemeSettings = () => {
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
    <ThemeSettingsSvr themeSettings={themeSettings} user={user} setThemeSettings={setThemeSettings} setUser={setUser} />
  )
}
