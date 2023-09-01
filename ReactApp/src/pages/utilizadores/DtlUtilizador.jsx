import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PasswordIcon from '@mui/icons-material/Password';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import config from '../../config.json';

const DtlUtilizador = () => {
  const { activeMenu, setUser, user, screenSize } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: '',
    name: '',
    email: '',
    tipo: 'user',
    canManageClients: false,
    canManageLicences: false,
    canManageUsers: false,
    canManagePermissions: false,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (!user.canManageUsers) {
      navigate('/clientes');
    }

    Swal.fire({
      title: 'A Carregar...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF',
      iconColor: user.appColor,
    });

    axios.get(`${config.server.apiurl}/user/${id}`, { cancelToken: cancelToken.token })
      .then((res) => {
        setCurrentUser(res.data);
        Swal.close();
      }).catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Operação Cancelada!")
        } else {
          console.log(err);
        }
      });

    return () => {
      cancelToken.cancel();
      Swal.close();
    }

  }, [id, user.appColor, user.appMode, navigate, user.canManageUsers]);

  const handleSave = () => {
    const cancelToken = axios.CancelToken.source();
    if (currentUser.name !== '' && currentUser.email !== '' && currentUser.appColor !== '' && currentUser.appMode !== '') {
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
      }).then((result) => {
        if (result.isConfirmed) {

          axios.put(`${config.server.apiurl}/user/update`, { userId: user._id, user: currentUser, cancelToken: cancelToken.token })
            .then((res) => {
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
                  if (currentUser.username === user.username) {
                    setUser(currentUser);
                  }
                  setEdit(false);
                });
              }
            }).catch((err) => {
              if (axios.isCancel(err)) {
                console.log("Operação Cancelada!")
              } else {
                console.log(err);
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
            });
        }
      });
    }
  };

  const handleDelete = () => {
    const cancelToken = axios.CancelToken.source();
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'Vai apagar este Utilizador!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      iconColor: user.appColor,
      background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${config.server.apiurl}/user/delete/${id}`, { cancelToken: cancelToken.token })
          .then((res) => {
            if (res.data === 'NOK') {
              Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível apagar o utilizador!',
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
                text: 'O utilizador foi apagado!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: user.appColor,
                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
              }).then(() => {
                navigate('/Utilizadores');
              });
            }
          }).catch((err) => {
            if (axios.isCancel(err)) {
              console.log("Operação Cancelada!")
            } else {
              console.log(err);
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
          });
      }
    });
  };

  const handleReset = () => {
    const cancelToken = axios.CancelToken.source();
    Swal.fire({
      title: 'Tem a Certeza?',
      text: 'A palavra-passe vair ser restaurada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      iconColor: user.appColor,
      background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`${config.server.apiurl}/user/resetpassword`, { userId: user._id, user: currentUser, cancelToken: cancelToken.token })
          .then((res) => {
            if (res.data === 'NOK') {
              Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível restaurar a palavra-passe!',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: user.appColor,
                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
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
                text: 'A palavra-passe foi restaurada!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                allowOutsideClick: false,
                iconColor: user.appColor,
                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
              });
            }
          }).catch((err) => {
            if (axios.isCancel(err)) {
              console.log("Operação Cancelada!")
            } else {
              console.log(err);
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
          });
      }
    });
  };

  const updateEstado = async (estado) => {
    Swal.fire({
      title: 'Tem a Certeza?',
      text: `Deseja alterar o estado para ${currentUser.estado === 0 ? 'Ativo' : 'Inativo'}?!`,
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
          setCurrentUser({
            ...currentUser,
            estado,
          });
          const res = await axios.put(`${config.server.apiurl}/user/update`, { userId: user._id, user: currentUser });
          if (res.data === 'NOK') {
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível atualizar o estado deste utilizador!',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: user.appColor,
              background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
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
              text: 'O estado deste utilizador foi atualizado!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              timerProgressBar: true,
              allowOutsideClick: false,
              iconColor: user.appColor,
              background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
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
        const res = await axios.get(`${config.server.apiurl}/user/${id}`);
        setCurrentUser(res.data);
        setEdit(false);
      }
    });
  };

  return (
    <>
      <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
        <div className="flex">
          <Link
            type="button"
            to="/Utilizadores"
            style={{ backgroundColor: user.appColor, borderColor: user.appColor }}
            className="ml-2 h-10 w-12 pt-1.5 pl-2.5 mr-3 text-white rounded-lg hover:drop-shadow-xl hover:text-black"
          >
            <ArrowBackIcon />
          </Link>
          <Header category="Page" title="Detalhes do Utilizador" />
        </div>
        {!edit ? (
          <>
            <Button
              style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
              onClick={() => setEdit(true)}
            >
              <EditIcon />Editar
            </Button>
            {currentUser.username !== user.username && currentUser.username !== 'admin' && (
              <>
                {currentUser.estado === 0 ? (
                  <Button
                    style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                    onClick={() => updateEstado(1)}
                  >
                    <CheckIcon />Ativar Conta
                  </Button>
                ) : (
                  <Button
                    style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                    onClick={() => updateEstado(0)}
                  >
                    <DoDisturbIcon />Desativar Conta
                  </Button>
                )}
                <Button
                  style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                  onClick={() => handleDelete()}
                >
                  <DeleteIcon />Apagar
                </Button>
                <Button
                  style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                  onClick={() => handleReset()}
                >
                  <PasswordIcon />Restaurar Palavra-Passe
                </Button>
              </>
            )}

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
        {edit ? (
          <>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextField
                  error={currentUser.username === ''}
                  helperText={currentUser.username === '' ? 'Obrigatório' : ''}
                  autoFocus
                  margin="dense"
                  label="Nome de Utilizador"
                  type="text"
                  fullWidth
                  disabled
                  value={currentUser.username}
                  variant="standard"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextField
                  error={currentUser.name === ''}
                  helperText={currentUser.name === '' ? 'Obrigatório' : ''}
                  margin="dense"
                  label="Nome"
                  type="text"
                  fullWidth
                  disabled={!edit}
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({
                    ...currentUser,
                    name: e.target.value,
                  })}
                  variant="standard"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextField
                  error={currentUser.email === ''}
                  helperText={currentUser.email === '' ? 'Obrigatório' : ''}
                  margin="dense"
                  label="Email"
                  type="text"
                  fullWidth
                  disabled={!edit}
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({
                    ...currentUser,
                    email: e.target.value,
                  })}
                  variant="standard"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p>Tipo</p>
                <FormControl variant="standard" disabled={!edit} fullWidth>
                  <Select
                    value={currentUser.tipo}
                    fullWidth
                    margin="dense"
                    label="Tipo"
                    onChange={(e) => {
                      if (e.target.value === 'admin') {
                        setCurrentUser({
                          ...currentUser,
                          tipo: e.target.value,
                          canManageClients: true,
                          canManageLicences: true,
                          canManageUsers: true,
                          canManagePermissions: true,
                        });
                      } else {
                        setCurrentUser({
                          ...currentUser,
                          tipo: e.target.value,
                          canManageClients: false,
                          canManageLicences: false,
                          canManageUsers: false,
                          canManagePermissions: false,
                        });
                      }
                    }}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Utilizador</MenuItem>
                  </Select>
                </FormControl>
              </div>

            </div>

            {user.canManagePermissions && (
              <>
                <p className="mt-5 text-xl font-semibold">Permissões do utilizador</p>
                <FormControlLabel
                  label="Todas"
                  control={
                    (
                      <Checkbox
                        disabled={!edit}
                        checked={currentUser.canManageClients && currentUser.canManageLicences && currentUser.canManageUsers && currentUser.canManagePermissions}
                        indeterminate={
                          (!currentUser.canManageClients || !currentUser.canManageLicences || !currentUser.canManageUsers || !currentUser.canManagePermissions)
                          && !(!currentUser.canManageClients && !currentUser.canManageLicences && !currentUser.canManageUsers && !currentUser.canManagePermissions)
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            e.target.checked = true;
                            setCurrentUser({
                              ...currentUser,
                              canManageClients: true,
                              canManageLicences: true,
                              canManageUsers: true,
                              canManagePermissions: true,
                            });
                          } else {
                            setCurrentUser({
                              ...currentUser,
                              canManageClients: false,
                              canManageLicences: false,
                              canManageUsers: false,
                              canManagePermissions: false,
                            });
                          }
                        }}
                      />
                    )
                  }
                />
                <div className="flex flex-col ml-4">
                  <FormControlLabel
                    label="Gere Clientes"
                    control={
                      (
                        <Checkbox
                          disabled={!edit}
                          checked={currentUser.canManageClients}
                          onChange={(e) => setCurrentUser({
                            ...currentUser,
                            canManageClients: e.target.checked,
                          })}
                        />
                      )
                    }
                  />
                  <FormControlLabel
                    label="Gere Licenças"
                    control={
                      (
                        <Checkbox
                          disabled={!edit}
                          checked={currentUser.canManageLicences}
                          onChange={(e) => setCurrentUser({
                            ...currentUser,
                            canManageLicences: e.target.checked,
                          })}
                        />
                      )
                    }
                  />
                  <FormControlLabel
                    label="Gere Utilizadores"
                    control={
                      (
                        <Checkbox
                          disabled={!edit}
                          checked={currentUser.canManageUsers}
                          onChange={(e) => setCurrentUser({
                            ...currentUser,
                            canManageUsers: e.target.checked,
                          })}
                        />
                      )
                    }
                  />
                  <FormControlLabel
                    label="Gere Permissões"
                    control={
                      (
                        <Checkbox
                          disabled={!edit}
                          checked={currentUser.canManagePermissions}
                          onChange={(e) => setCurrentUser({
                            ...currentUser,
                            canManagePermissions: e.target.checked,
                          })}
                        />
                      )
                    }
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Nome de Utilizador:</label>
                <label className="text-xl font-extrabold break-words">{currentUser.username}</label>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Nome:</label>
                <label className="text-xl font-extrabold break-words">{currentUser.name}</label>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2 break-keep">E-mail:</label>
                <label className="text-xl font-extrabold break-words">{currentUser.email}</label>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Tipo:</label>
                <label className="text-xl font-extrabold break-words">
                  {currentUser.tipo === 'admin' ? 'Administrador' : 'Utilizador'}
                </label>
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="text-xl mr-2">Estado:</label>
                <label className="text-xl font-extrabold">{currentUser.estado === 0 ? 'Inativo' : 'Ativo'}</label>
              </div>
            </div>

            <div>
              <label className="text-xl mr-2">Permissões do Utilizador:</label>
              <div>
                <p className="text-xl font-extrabold">{currentUser.canManageClients ? 'Gere Clientes' : 'Não Gere Clientes'}</p>
                <p className="text-xl font-extrabold">{currentUser.canManageLicences ? 'Gere Licenças' : 'Não Gere Licenças'}</p>
                <p className="text-xl font-extrabold">{currentUser.canManageUsers ? 'Gere Utilizadores' : 'Não Gere Utilizadores'}</p>
                <p className="text-xl font-extrabold">{currentUser.canManagePermissions ? 'Gere Permissões' : 'Não Gere Permissões'}</p>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default DtlUtilizador;
