import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header } from '../../components';
import config from '../../config.json';

const DtlCliente = () => {
    const { currentMode, currentColor, activeMenu, screenSize, user } = useStateContext();
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
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

    useEffect(async () => {
        Swal.fire({
            title: 'A Carregar...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            background: currentMode === 'Dark' ? '#a1a6ad' : '#FFFFFF',
            iconColor: currentColor,
        });

        try {
            const res = await axios.get(`${config.server.apiurl}/client/${id}`);
            if (res.data) {
                setData(res.data);
                Swal.close();
            } else {
                Swal.fire({
                    title: 'Este cliente não está disponível, por favor tente mais tarde!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    background: currentMode === 'dark' ? '#a1a6ad' : '#FFFFFF',
                    iconColor: currentColor,
                }).then(() => {
                    navigate('/clientes');
                });
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleSave = () => {
        if (data.name !== '' && data.ncont !== '' && data.morada !== '' && data.codPost !== '' && data.cidade !== '' && data.email !== '') {
            Swal.fire({
                title: 'Tem a Certeza?',
                text: 'Os dados deste Cliente vão ser atualizados!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
                iconColor: currentColor,
                background: currentMode === 'dark' ? '#b0b5b5' : 'white',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await axios.put(`${config.server.apiurl}/client/update`, { userId: user.id, client: data });
                        if (res.data === 'NOK') {
                            Swal.fire({
                                title: 'Erro!',
                                text: 'Não foi possível atualizar os dados deste cliente!',
                                icon: 'error',
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                iconColor: currentColor,
                                allowOutsideClick: false,
                                background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                            }).then(async () => {
                                const res1 = await axios.get(`${config.server.apiurl}/client/${id}`);
                                setData(res1.data);
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
                                iconColor: currentColor,
                                background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                            });
                        } else {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'Os dados deste cliente foram atualizados!',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                allowOutsideClick: false,
                                iconColor: currentColor,
                                background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                            }).then(() => {
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
                            iconColor: currentColor,
                            timerProgressBar: true,
                            allowOutsideClick: false,
                            background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                        });
                    }
                }
            });
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: 'Tem a Certeza?',
            text: 'Vai apagar este cliente!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            iconColor: currentColor,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            background: currentMode === 'dark' ? '#b0b5b5' : 'white',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`${config.server.apiurl}/client/delete/${id}`);
                    if (res.data === 'NOK') {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível apagar o cliente!',
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            iconColor: currentColor,
                            allowOutsideClick: false,
                            background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                        });
                    } else if (res.data === null) {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível realizar a ligação ao servidor. Por favor tenta mais tarde!',
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            iconColor: currentColor,
                            allowOutsideClick: false,
                            background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                        });
                    } else {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'O cliente foi apagado!',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            iconColor: currentColor,
                            allowOutsideClick: false,
                            background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                        }).then(() => {
                            navigate('/clientes');
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
                        iconColor: currentColor,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        background: currentMode === 'dark' ? '#b0b5b5' : 'white',
                    });
                }
            }
        });
    };

    const handleCancel = async () => {
        Swal.fire({
            title: 'Tem a Certeza?',
            text: 'Todas as alterações serão descartadas!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            iconColor: currentColor,
            background: currentMode === 'dark' ? '#b0b5b5' : 'white',
        }).then(async () => {
            const res = await axios.get(`${config.server.apiurl}/client/${id}`);
            setData(res.data);
            setEdit(false);
        });
    };

    return (
        <>
            <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
                <div className="flex">
                    <Link
                        type="button"
                        to="/Clientes"
                        style={{ backgroundColor: currentColor, borderColor: currentColor }}
                        className="ml-2 h-10 w-12 pt-1.5 pl-2.5 mr-3 text-white rounded-lg hover:drop-shadow-xl hover:text-black"
                    >
                        <ArrowBackIcon />
                    </Link>
                    <Header category="Page" title="Detalhes do Cliente" />
                </div>
                {!edit ? (
                    <>
                        <Button
                            style={{ cursor: 'pointer', backgroundColor: currentColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                            onClick={() => setEdit(true)}
                        >
                            <EditIcon />Editar
                        </Button>
                        <Button
                            style={{ cursor: 'pointer', backgroundColor: currentColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                            onClick={() => handleDelete()}
                        >
                            <DeleteIcon />Apagar
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            style={{ cursor: 'pointer', backgroundColor: currentColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                            onClick={() => handleSave()}
                        >
                            <SaveIcon />Guardar
                        </Button>
                        <Button
                            style={{ cursor: 'pointer', backgroundColor: currentColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                            onClick={() => handleCancel()}
                        >
                            <DoDisturbIcon />Cancelar
                        </Button>
                    </>
                )}

            </div>

            <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-4 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md overflow-y-scroll`}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nome</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 ${data.name === '' ? 'border-red-500' : ''} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Nome"
                            disabled={!edit}
                            value={data.name}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    name: e.target.value,
                                });
                            }}

                        />
                        {data.name === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nº de Contribuinte</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.ncont === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Nº de contribuinte"
                            disabled={!edit}
                            value={data.ncont}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    ncont: e.target.value,
                                });
                            }}
                        />
                        {data.ncont === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Morada</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.morada === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Morada"
                            disabled={!edit}
                            value={data.morada}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    morada: e.target.value,
                                });
                            }}
                        />
                        {data.morada === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Cidade</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.cidade === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Cidade"
                            disabled={!edit}
                            value={data.cidade}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    cidade: e.target.value,
                                });
                            }}
                        />
                        {data.cidade === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Código Postal</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.codPost === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Código Postal"
                            disabled={!edit}
                            value={data.codPost}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    codPost: e.target.value,
                                });
                            }}
                        />
                        {data.codPost === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Contacto</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.contacto === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Contacto"
                            disabled={!edit}
                            value={data.contacto}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    contacto: e.target.value,
                                });
                            }}
                        />
                        {data.contacto === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.email === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Email"
                            disabled={!edit}
                            value={data.email}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    email: e.target.value,
                                });
                            }}
                        />
                        {data.email === '' && (
                            <p className="text-red-500 text-xs italic">
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Representante</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.rep === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Representante"
                            disabled={!edit}
                            value={data.rep}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    rep: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Contacto</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.repContacto === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Contacto"
                            disabled={!edit}
                            value={data.repContacto}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    repContacto: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                        <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</p>
                        <input
                            className={`appearance-none block w-full bg-gray-200 text-gray-700 border${data.repEmail === '' && 'border-red-500'}rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            type="text"
                            placeholder="Email"
                            disabled={!edit}
                            value={data.repEmail}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    repEmail: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};
export default DtlCliente;
