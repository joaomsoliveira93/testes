'use client'
import React, { useEffect } from 'react';
import axios from 'axios';
import config from './config.json';
import { useStateContext } from './contexts/ContextProvider';
import PageSvr from './pageSvr';

interface TokenData{
  token: string;
  tokenValidDate:string;
  tokenCreatedAt:string;
}

export default function Home() {
  const { user, setUser } = useStateContext();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const tokenData = localStorage.getItem('token');
    let temp:TokenData = {token:'',tokenCreatedAt:'',tokenValidDate:''};
    if (tokenData !== null) {
      temp = JSON.parse(tokenData);
    } 
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      console.log('dark');
    } else {
      console.log('light');
    }
    if (temp.token !== '') {
      const tokenValidDate = new Date(temp.tokenValidDate);
      const currentDateTime = new Date();
      axios.post(`${config.server.apiurl}/login`, { userName: '', password: '', token: temp.token, cancelToken: cancelToken.token })
        .then((res) => {
          if (tokenValidDate < currentDateTime) {
            localStorage.setItem('token', JSON.stringify({
              token: res.data.token,
              tokenCreatedAt: res.data.tokenCreatedAt,
              tokenValidDate: res.data.tokenValidDate,
            }));
          }
          setUser({
            _id: res.data._id,
            username: res.data.username,
            name: res.data.name,
            email: res.data.email,
            tipo: res.data.tipo,
            img: res.data.img,
            canManageClients: res.data.canManageClients,
            canManageLicences: res.data.canManageLicences,
            canManagePermissions: res.data.canManagePermissions,
            canManageUsers: res.data.canManageUsers,
            appColor: res.data.appColor,
            appMode: res.data.appMode,
          });
        }).catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Operação Cancelada!")
          } else {
            console.log(err);
          }
        });
    }
    return () => {
      cancelToken.cancel();
    }
  }, [setUser]);

  return (
    <PageSvr user={user} />
  )
}
