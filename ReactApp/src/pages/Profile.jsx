import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';
import { Header, UpdatePassword } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import config from '../config.json';

const Profile = () => {
  const { activeMenu, setUser, user, screenSize } = useStateContext();
  const [edit, setEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleSave = async () => {
    if (user.name !== '' && user.email !== '' && user.appColor !== '' && user.appMode !== '') {
      Swal.fire({
        title: 'Tem a Certeza?',
        text: 'Os dados deste Utilizador vão ser atualizados!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        iconColor: user.appColor,
        background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.put(`${config.server.apiurl}/user/update`, { userId: user._id, user });
            if (res.data === 'NOK') {
              Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar os dados deste utilizador!',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: user.appColor,
                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
              }).then(() => {
                setEdit(false);
              });
            } else if (res.data === null) {
              Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível realizar a ligação ao servidor. Por favor tenta mais tarde!',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: user.appColor,
                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
              });
            } else {
              Swal.fire({
                title: 'Sucesso!',
                text: 'Os dados deste utilizador foram atualizados!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: user.appColor,
                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
              }).then(() => {
                setUser(user);
                setEdit(false);
              });
            }
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível realizar a ligação ao servidor. Por favor tenta mais tarde!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: user.appColor,
              background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
            });
          }
        }
      });
    }
  };

  const closeChangePassword = async () => {
    setChangePassword(false);
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'Todas as alterações serão descartadas!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      iconColor: user.appColor,
      background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.get(`${config.server.apiurl}/user/${user._id}`);
        setUser(res.data);
        setEdit(false);
      }
    });
  };

  return (
    <>
      <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
        <div className="flex">
          <Header category="Page" title="Perfil" />
        </div>
        {!edit ? (
          <>
            <Button
              style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
              onClick={() => setEdit(true)}
            >
              <EditIcon />Editar
            </Button>

            <Button
              style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
              onClick={() => setChangePassword(true)}
            >
              <PasswordIcon />Alterar Palavra-Passe
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
              onClick={() => handleSave()}
            >
              <SaveIcon />Guardar
            </Button>
            <Button
              style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
              onClick={() => handleCancel()}
            >
              <DoDisturbIcon />Cancelar
            </Button>
          </>
        )}
      </div>

      <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-4 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md overflow-y-scroll`}>
      {changePassword && <UpdatePassword open={changePassword} setAdd={closeChangePassword} />}
        {edit ? (
          <>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextField
                  error={user.username === ''}
                  helperText={user.username === '' ? 'Obrigatório' : ''}
                  autoFocus
                  margin="dense"
                  label="Nome de Utilizador"
                  type="text"
                  fullWidth
                  disabled
                  value={user.username}
                  variant="standard"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextField
                  error={user.name === ''}
                  helperText={user.name === '' ? 'Obrigatório' : ''}
                  margin="dense"
                  label="Nome"
                  type="text"
                  fullWidth
                  disabled={!edit}
                  value={user.name}
                  onChange={(e) => setUser({
                    ...user,
                    name: e.target.value,
                  })}
                  variant="standard"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextField
                  error={user.email === ''}
                  helperText={user.email === '' ? 'Obrigatório' : ''}
                  margin="dense"
                  label="Email"
                  type="text"
                  fullWidth
                  disabled={!edit}
                  value={user.email}
                  onChange={(e) => setUser({
                    ...user,
                    email: e.target.value,
                  })}
                  variant="standard"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="text-xl mr-2">Tipo:</label>
                <label className="text-xl font-extrabold break-words">
                  {user.tipo === 'admin' ? 'Administrador' : 'Utilizador'}
                </label>
              </div>

            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Nome de Utilizador:</label>
                <label className="text-xl font-extrabold break-words">{user.username}</label>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Nome:</label>
                <label className="text-xl font-extrabold break-words">{user.name}</label>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2 break-keep">E-mail:</label>
                <label className="text-xl font-extrabold break-words">{user.email}</label>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Tipo:</label>
                <label className="text-xl font-extrabold break-words">
                  {user.tipo === 'admin' ? 'Administrador' : 'Utilizador'}
                </label>
              </div>

            </div>
          </>
        )}

      </div>
    </>
  );
};

export default Profile;
