import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import config from '../config.json';

const Profile = () => {
  const { activeMenu, screenSize } = useStateContext();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();

  useEffect(async () => {
    Swal.fire({
      title: 'A Carregar...',
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
    try {
      const res = await axios.get(`${config.server.apiurl}/getUtilizador/${id}`);
      setNome(res.data[0][0].name);
      setEmail(res.data[0][0].email);
    } catch (err) {
      console.log(err);
    }
    Swal.close();
  }, []);

  return (
    <>
      <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
        <Header category="Page" title="Perfil" />
      </div>
      <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-14 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md overflow-y-scroll`}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nome</p>
            <input
              className={`edit appearance-none block w-full bg-gray-200 text-gray-700 border ${nome === '' && 'border-red-500'}  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-name"
              type="text"
              placeholder="Nome"
              disabled="true"
              value={nome}
              onChange={(e) => { setNome(e.target.value); }}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</p>
            <input
              className={`edit appearance-none block w-full bg-gray-200 text-gray-700 border ${email === '' && 'border-red-500'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-name"
              type="text"
              placeholder="Email"
              disabled="true"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
