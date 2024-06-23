import React, { useRef } from 'react';
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

export default function UpdatePassword({ open, setAdd }) {
    const { user } = useStateContext();
    let current = useRef();
    let new1 = useRef();
    let new2 = useRef();

    const handleClose = (load) => {
        setAdd(load);
    };

    const handleSave = async () => {
        if (current !== '' && new1 !== '' && new2 !== '') {
            if (new1 === new2) {
                try {
                    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/changepassword`, { password: current, newpassword: new1, userId: user._id });
                    if (res.data === 'NOK') {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível alterar a Palavra-Passe!',
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
                    } else if (res.data === 'errada') {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'A Palavra-Passe atual esta errada!',
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
                            text: 'A Palavra-Passe foi atualizada!',
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
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'As novas Palavra-Passes não coincidem !',
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
            <div style={{ width: '300px' }}>
                <DialogTitle style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>Alterar Palavra-Passe</DialogTitle>
                <DialogContent style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TextField
                        error={current === ''}
                        helperText={current === '' ? 'Obrigatório' : ''}
                        autoFocus
                        margin="dense"
                        label="Palavra-Passe Atual"
                        type="password"
                        fullWidth
                        onChange={(e) => { current = e.target.value; }}
                        variant="standard"
                    />
                    <TextField
                        error={new1 === ''}
                        helperText={new1 === '' ? 'Obrigatório' : ''}
                        margin="dense"
                        label="Nova Palavra-Passe"
                        type="password"
                        fullWidth
                        onChange={(e) => { new1 = e.target.value; }}
                        variant="standard"
                    />
                    <TextField
                        error={new2 === ''}
                        helperText={new2 === '' ? 'Obrigatório' : ''}
                        margin="dense"
                        label="Confirmar nova Palavra-Passe"
                        type="password"
                        fullWidth
                        onChange={(e) => { new2 = e.target.value; }}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <Button
                        disabled={
                            current === ''
                            && new1 === ''
                            && new2 === ''
                        }
                        onClick={handleSave}
                    >
                        Alterar
                    </Button>
                    <Button onClick={() => handleClose(false)}>Cancelar</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}
