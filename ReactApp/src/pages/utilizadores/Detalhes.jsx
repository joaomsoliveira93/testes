import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import config from '../../config.json';

const Detalhes = () => {
  const { activeMenu, user, currentMode, currentColor, screenSize } = useStateContext();
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();

  useEffect(async () => {
    if (!(user.userType.includes('Administradores') || (user.userType.includes('Gestão') && !user.userType.inclues('Gestão Limitado')))) {
      window.location.href = '/paletes';
    }
    Swal.fire({
      title: 'A Carregar...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: currentMode === 'Dark' ? '#a1a6ad' : '#FFFFFF',
      iconColor: currentColor,
    });
    try {
      const res = await axios.get(`${config.server.apiurl}/getUtilizador/${id}`);
      setNome(res.data[0][0].name);
      setTipo(res.data[0][0].tipo);
      setEstado(res.data[0][0].estado);
      setEmail(res.data[0][0].email);
    } catch (err) {
      console.log(err);
    }
    Swal.close();
  }, []);

  return (

    <>
      <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
        <div className="flex">
          <Link
            type="button"
            to="/Utilizadores"
            style={{ backgroundColor: currentColor, borderColor: currentColor }}
            className="ml-2 h-10 w-12 pt-1.5 pl-2.5 mr-3 text-white rounded-lg hover:drop-shadow-xl hover:text-black"
          >
            <ArrowBackIcon />
          </Link>
          <Header category="Page" title="Detalhes do Utilizador" />
        </div>
      </div>

      <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-14 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md overflow-y-scroll`}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nome</p>
            <input
              className={`edit appearance-none block w-full bg-gray-200 text-gray-700 border${nome === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-name"
              type="text"
              placeholder="Nome"
              disabled="true"
              value={nome}
              onChange={(e) => { setNome(e.target.value); }}
            />
            {nome === '' && (
              <p className="text-red-500 text-xs italic">
                Este campo é obrigatório
              </p>
            )}
          </div>

        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</p>
            <input
              className={`edit appearance-none block w-full bg-gray-200 text-gray-700 border${email === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-name"
              type="text"
              placeholder="Email"
              disabled="true"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </div>

        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-12 md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Grupo do Utilizador</p>
            <div className="relative">
              <p className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2">{tipo}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-12 md:mb-0">
            <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Estado</p>
            <div className="relative">
              <p className={`block uppercase tracking-wide ${estado === 0 ? 'text-green-900' : 'text-red-700'} pt-1 text-3xl font-bold mb-2`}>{estado === 0 ? 'Ativado' : 'Inativo'}</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalhes;
