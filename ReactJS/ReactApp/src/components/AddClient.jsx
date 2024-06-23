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

export default function AddClient({ open, setAdd }) {
    const { user } = useStateContext();
    const [client, setClient] = useState({
        name: '',
        ncont: '',
        morada: '',
        cidade: '',
        codPost: '',
        contacto: '',
        email: '',
        rep: '',
        repContacto: '',
        repEmail: '',
    });

    const handleClose = (load) => {
        setAdd(load);
    };

    const handleSave = () => {
        const cancelToken = axios.CancelToken.source();
        if (client.name !== '' && client.ncont !== '' && client.morada !== '' && client.codPost !== '' && client.cidade !== '' && client.email !== '') {
            axios.post(`${process.env.REACT_APP_API_URL}/client/add`, { client, userId: user._id, cancelToken: cancelToken.token })
                .then((res) => {
                    if (res.data === 'NOK') {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível adicionar o cliente!',
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
            <DialogTitle style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>Adicionar Cliente</DialogTitle>
            <DialogContent style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <TextField
                    error={client.name === ''}
                    helperText={client.name === '' ? 'Obrigatório' : ''}
                    autoFocus
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={client.name}
                    onChange={(e) => setClient({
                        ...client,
                        name: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.ncont === ''}
                    helperText={client.ncont === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Nº de contribuinte"
                    type="text"
                    fullWidth
                    value={client.ncont}
                    onChange={(e) => setClient({
                        ...client,
                        ncont: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.morada === ''}
                    helperText={client.morada === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Morada"
                    type="text"
                    fullWidth
                    value={client.morada}
                    onChange={(e) => setClient({
                        ...client,
                        morada: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.cidade === ''}
                    helperText={client.cidade === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Cidade"
                    type="text"
                    fullWidth
                    value={client.cidade}
                    onChange={(e) => setClient({
                        ...client,
                        cidade: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.codPost === ''}
                    helperText={client.codPost === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Código Postal"
                    type="text"
                    fullWidth
                    value={client.codPost}
                    onChange={(e) => setClient({
                        ...client,
                        codPost: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.contacto === ''}
                    helperText={client.contacto === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Contacto"
                    type="text"
                    fullWidth
                    value={client.contacto}
                    onChange={(e) => setClient({
                        ...client,
                        contacto: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.email === ''}
                    helperText={client.email === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={client.email}
                    onChange={(e) => setClient({
                        ...client,
                        email: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Representante"
                    type="text"
                    fullWidth
                    value={client.rep}
                    onChange={(e) => setClient({
                        ...client,
                        rep: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Contacto do Representante"
                    type="text"
                    fullWidth
                    value={client.repContacto}
                    onChange={(e) => setClient({
                        ...client,
                        repContacto: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Email do Representante"
                    type="text"
                    fullWidth
                    value={client.repEmail}
                    onChange={(e) => setClient({
                        ...client,
                        repEmail: e.target.value,
                    })}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <Button
                    disabled={
                        client.name === ''
                        && client.ncont === ''
                        && client.morada === ''
                        && client.cidade === ''
                        && client.codPost === ''
                        && client.contacto === ''
                        && client.email === ''
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
