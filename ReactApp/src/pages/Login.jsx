import { React, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { sha256 } from 'js-sha256';
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
  let username = useRef();
  let password = useRef();
  const { setUser } = useStateContext();

  const validar = () => {
    const cancelToken = axios.CancelToken.source();
    if (password !== '' && username !== '') {
      const hashedPassword = sha256(password);
      axios.post(`${process.env.REACT_APP_API_URL}/login`, { userName: username, password: hashedPassword, cancelToken: cancelToken.token })
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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      validar();
    }
  });

  return (
    <div className="  mr-auto ml-auto mt-36 h-min bg-white w-full max-w-xs border-1 rounded-xl shadow-black shadow-2xl ">
      <div className="items-center text-center p-10">
        <img src={`${process.env.PUBLIC_URL}/img/companyLogo.png`} alt="" />
      </div>
      <div className="items-center text-center">
        <p className="block text-gray-700 text-xl font-bold mb-10">Licences App</p>
      </div>
      <form className="bg-white shadow-md rounded px-8  pb-8 mb-4 items-center text-center">
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Nome de Utilizador</p>
          <input
            className={`shadow appearance-none border rounded w-full ${username === '' && 'border-red-500'} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
            onChange={(event) => { username = event.target.value; }}
          />
          {username === '' && (
            <p className="text-red-500 text-xs italic">Insira o Nome de Utilizador.</p>
          )}
        </div>
        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">Palavra-Passe</p>
          <input
            className={`shadow appearance-none border rounded w-full ${password === '' && 'border-red-500'} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={(event) => { password = event.target.value; }}
          /> {password === '' && (
            <p className="text-red-500 text-xs italic">Insira a Palavra-Passe.</p>
          )}

        </div>
        <div className="mr-auto ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => validar()}
          >
            Iniciar Sessão
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs mb-5">
        &copy;2023 Todos os Direitos Reservados.
      </p>
    </div>
  );
};
export default Login;
