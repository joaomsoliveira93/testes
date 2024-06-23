import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useStateContext } from '../contexts/ContextProvider';

export default function AddLicence({ client, open, setAdd }) {

    const date = new Date()
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const newdate = `${year}-${month}-${day}T00:00:00.000Z`;

    const { user } = useStateContext();
    const [licence, setLicence] = useState({
        clientId: client,
        estado: false,
        tipo: '',
        obs: '',
        startedAt: newdate,
        endedAt: newdate,
    });

    const handleClose = (load) => {
        setAdd(load);
    };

    const handleEstadoChange = () => {
        if (new Date(licence.startedAt) > new Date(licence.endedAt)) {
            setLicence({ ...licence, estado: false });
        } else {
            setLicence({ ...licence, estado: true });
        }
    };

    const handleSave = () => {
        const cancelToken = axios.CancelToken.source();
        if (licence.tipo === '' && licence.startedAt === '' && licence.endedAt === '' && licence.obs === '') {

            axios.post(`${process.env.REACT_APP_API_URL}/licence/add`, { licence, userId: user._id, cancelToken: cancelToken.token })
                .then((res) => {
                    if (res.data === 'NOK') {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível adicionar a licença!',
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
                    } else {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'A licença foi adicionada!',
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
                            customClass: {
                                container: 'sweetalert-container',
                            },
                        });
                    }
                });
        }
    };

    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>Adicionar Utilizador</DialogTitle>
            <DialogContent style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <TextField
                    error={licence.tipo === ''}
                    helperText={licence.tipo === '' ? 'Obrigatório' : ''}
                    autoFocus
                    margin="dense"
                    label="Tipo"
                    type="text"
                    fullWidth
                    value={licence.tipo}
                    onChange={(e) => setLicence({
                        ...licence,
                        tipo: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={licence.startedAt === ''}
                    helperText={licence.startedAt === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Início"
                    type="date"
                    fullWidth
                    value={licence.startedAt}
                    onChange={(e) => {
                        const date = new Date(e.target.value)
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2);
                        const day = ("0" + date.getDate()).slice(-2);

                        setLicence({
                            ...licence,
                            startedAt: `${year}-${month}-${day}T00:00:00.000Z`,
                        });
                        console.log(new Date(e.target.value))
                        handleEstadoChange();
                    }}
                    variant="standard"
                />
                <TextField
                    error={licence.endedAt === ''}
                    helperText={licence.endedAt === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Fim"
                    type="date"
                    fullWidth
                    value={licence.endedAt}
                    onChange={(e) => {
                        const date = new Date(e.target.value)
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2);
                        const day = ("0" + date.getDate()).slice(-2);

                        setLicence({
                            ...licence,
                            endedAt: `${year}-${month}-${day}T00:00:00.000Z`,
                        });
                        console.log(new Date(e.target.value))
                        handleEstadoChange();
                    }}
                    variant="standard"
                />
                <p>Estado: {licence.estado ? 'Válida' : 'Expirada'}</p>
                <TextField
                    error={licence.obs === ''}
                    helperText={licence.obs === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Observações"
                    type="text"
                    multiline
                    rows={4}
                    fullWidth
                    value={licence.obs}
                    onChange={(e) => setLicence({
                        ...licence,
                        obs: e.target.value,
                    })}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <Button
                    disabled={
                        licence.tipo === ''
                        && licence.startedAt === ''
                        && licence.endedAt === ''
                        && licence.obs === ''
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
