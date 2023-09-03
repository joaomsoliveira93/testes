'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useStateContext } from '../../contexts/ContextProvider';
import config from '../../config.json';
import { AddClientSvr } from './AddClientSvr';
import Client from '@/app/interfaces/Client';

interface AddClientProps {
    open: boolean;
    setAdd: (load: boolean) => void,
}

export const AddClient = ({ open, setAdd }: AddClientProps) => {
    const { user } = useStateContext();
    const [client, setClient] = useState<Client>({
        _id: '',
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

    const handleClose = (load:boolean) => {
        setAdd(load);
    };

    const handleSave = () => {
        const cancelToken = axios.CancelToken.source();
        if (client.name !== '' && client.ncont !== '' && client.morada !== '' && client.codPost !== '' && client.cidade !== '' && client.email !== '') {
            axios.post(`${config.server.apiurl}/client/add`, { client, userId: user._id, cancelToken: cancelToken.token })
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
        <AddClientSvr open={open} handleClose={handleClose} client={client} user={user} setClient={setClient} handleSave={handleSave} />
    )
}
