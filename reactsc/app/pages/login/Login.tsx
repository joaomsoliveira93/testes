'use client'
import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { sha256 } from 'js-sha256';
import config from '../../config.json';
import { LoginSvr } from './LoginSvr';

export const Login = () => {
  const { setUser } = useStateContext();

  const validar = (username: string, password: string) => {
    const cancelToken = axios.CancelToken.source();
    if (password !== '' && username !== '') {
      const hashedPassword = sha256(password);
      axios.post(`${config.server.apiurl}/login`, { userName: username, password: hashedPassword, cancelToken: cancelToken.token })
        .then((res) => {
          if (res.data === null) {
            Swal.fire({
              title: 'Erro!',
              text: 'Nome de utilizador ou palavra-passe Erradas!',
              icon: 'error',
              showConfirmButton: true,
              allowOutsideClick: false,
            });
          } else if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'O seu utilizador não existe ou está inativo, por favor contacte o administrador do sistema!',
              icon: 'error',
              showConfirmButton: true,
              allowOutsideClick: false,
            });
          } else {
            localStorage.setItem('token', JSON.stringify({
              token: res.data.token,
              tokenCreatedAt: res.data.tokenCreatedAt,
              tokenValidDate: res.data.tokenValidDate,
            }));
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
          }
        }).catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Operação Cancelada!")
          } else {
            console.log(err);
          }
        });
    }
  };


  return (
    <LoginSvr validar={validar} />
  )
}
