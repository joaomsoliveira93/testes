import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useStateContext } from '../contexts/ContextProvider';
import config from '../config.json';

export default function AddUser({ open, setAdd }) {
    const { user } = useStateContext();
    const [newUser, setNewUser] = useState({
        username: '',
        name: '',
        email: '',
        tipo: 'user',
        canManageClients: false,
        canManageLicences: false,
        canManageUsers: false,
        canManagePermissions: false,
    });

    const handleClose = (load) => {
        setAdd(load);
    };

    const handleSave = async () => {
        if (newUser.username !== '' && newUser.name !== '' && newUser.email !== '') {
            try {
                const res = await axios.post(`${config.server.apiurl}/user/add`, { user: newUser, userId: user._id });
                if (res.data === 'NOK') {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Não foi possível adicionar o utilizador!',
                        icon: 'error',
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        iconColor: user.appColor,
                        background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                        customClass: {
                            container: 'sweetalert-container',
                        },
                    }).then(() => {
                        handleClose(false);
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
                        customClass: {
                            container: 'sweetalert-container',
                        },
                    }).then(() => {
                        handleClose(false);
                    });
                } else if (res.data === 'exists') {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'O nome de utilizador já existe!',
                        icon: 'error',
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        iconColor: user.appColor,
                        background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                        customClass: {
                            container: 'sweetalert-container',
                        },
                    });
                } else {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'O cliente foi adicionado!',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        iconColor: user.appColor,
                        background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                        customClass: {
                            container: 'sweetalert-container',
                        },
                    }).then(() => {
                        handleClose(true);
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
                    customClass: {
                        container: 'sweetalert-container',
                    },
                });
            }
        }
    };

    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>Adicionar Utilizador</DialogTitle>
            <DialogContent style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <TextField
                    error={newUser.username === ''}
                    helperText={newUser.username === '' ? 'Obrigatório' : ''}
                    autoFocus
                    margin="dense"
                    label="Nome de Utilizador"
                    type="text"
                    fullWidth
                    value={newUser.username}
                    onChange={(e) => setNewUser({
                        ...newUser,
                        username: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={newUser.name === ''}
                    helperText={newUser.name === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={newUser.name}
                    onChange={(e) => setNewUser({
                        ...newUser,
                        name: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={newUser.email === ''}
                    helperText={newUser.email === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={newUser.email}
                    onChange={(e) => setNewUser({
                        ...newUser,
                        email: e.target.value,
                    })}
                    variant="standard"
                />
                <p>Tipo</p>
                <FormControl variant="standard" fullWidth>
                    <Select
                        value={newUser.tipo}
                        fullWidth
                        margin="dense"
                        label="Tipo"
                        onChange={(e) => {
                            if (e.target.value === 'admin') {
                                setNewUser({
                                    ...newUser,
                                    tipo: e.target.value,
                                    canManageClients: true,
                                    canManageLicences: true,
                                    canManageUsers: true,
                                    canManagePermissions: true,
                                });
                            } else {
                                setNewUser({
                                    ...newUser,
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

                {user.canManagePermissions && (
                    <>
                        <p className="mt-5 text-xl font-semibold">Permissões do utilizador</p>
                        <FormControlLabel
                            label="Todas"
                            control={
                                (
                                    <Checkbox
                                        checked={newUser.canManageClients && newUser.canManageLicences && newUser.canManageUsers && newUser.canManagePermissions}
                                        indeterminate={
                                            (!newUser.canManageClients || !newUser.canManageLicences || !newUser.canManageUsers || !newUser.canManagePermissions)
                                            && !(!newUser.canManageClients && !newUser.canManageLicences && !newUser.canManageUsers && !newUser.canManagePermissions)
                                        }
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                e.target.checked = true;
                                                setNewUser({
                                                    ...newUser,
                                                    canManageClients: true,
                                                    canManageLicences: true,
                                                    canManageUsers: true,
                                                    canManagePermissions: true,
                                                });
                                            } else {
                                                setNewUser({
                                                    ...newUser,
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
                                            checked={newUser.canManageClients}
                                            onChange={(e) => setNewUser({
                                                ...newUser,
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
                                            checked={newUser.canManageLicences}
                                            onChange={(e) => setNewUser({
                                                ...newUser,
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
                                            checked={newUser.canManageUsers}
                                            onChange={(e) => setNewUser({
                                                ...newUser,
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
                                            checked={newUser.canManagePermissions}
                                            onChange={(e) => setNewUser({
                                                ...newUser,
                                                canManagePermissions: e.target.checked,
                                            })}
                                        />
                                    )
                                }
                            />
                        </div>
                    </>
                )}

            </DialogContent>
            <DialogActions style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <Button
                    disabled={
                        newUser.username === ''
                        && newUser.name === ''
                        && newUser.email === ''
                    }
                    onClick={handleSave}
                >
                    Adicionar
                </Button>
                <Button onClick={() => handleClose(false)}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
}
