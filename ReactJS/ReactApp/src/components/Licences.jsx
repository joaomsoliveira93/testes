import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddLicence from './AddLicence';

export const Licences = ({ clientId }) => {
    const [value, setValue] = useState('0');
    const [edit, setEdit] = useState('');
    const { user } = useStateContext();
    const [addNew, setAddNew] = useState(false);
    const [licences, setLicences] = useState([{
        clientId: '',
        estado: '',
        tipo: '',
        obs: '',
        startedAt: '',
        endedAt: '',
    }]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        axios.get(`${process.env.REACT_APP_API_URL}/alllicences/${clientId}`, { cancelToken: cancelToken.token })
            .then((res) => {
                setLicences(res.data);
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Operação Cancelada!")
                } else {
                    console.log(err);
                }
            });
        return () => {
            cancelToken.cancel();
        }
    }, [clientId]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleTipoChange = (newTipo, rowIndex) => {
        const updatedLicences = [...licences];
        updatedLicences[rowIndex].tipo = newTipo;
        setLicences(updatedLicences);
    };

    const handleInicioChange = (newInicio, rowIndex) => {
        const updatedLicences = [...licences];
        if (new Date(updatedLicences[rowIndex].startedAt) > new Date(updatedLicences[rowIndex].endedAt)) {
            updatedLicences[rowIndex].estado = false;
        } else {
            updatedLicences[rowIndex].estado = true;
        }
        updatedLicences[rowIndex].startedAt = newInicio + "T00:00:00.000z";
        setLicences(updatedLicences);
    };

    const handleFimChange = (newFim, rowIndex) => {
        const updatedLicences = [...licences];
        if (new Date(updatedLicences[rowIndex].startedAt) > new Date(updatedLicences[rowIndex].endedAt)) {
            updatedLicences[rowIndex].estado = false;
        } else {
            updatedLicences[rowIndex].estado = true;
        }
        updatedLicences[rowIndex].endedAt = newFim + "T00:00:00.000z";
        setLicences(updatedLicences);
    };

    const handleObsChange = (newObs, rowIndex) => {
        const updatedLicences = [...licences];
        updatedLicences[rowIndex].obs = newObs;
        setLicences(updatedLicences);
    };

    const closeAddModel = async (load) => {
        setAddNew(false);
        if (load) {
            const cancelToken = axios.CancelToken.source();
            axios.get(`${process.env.REACT_APP_API_URL}/alllicences/${clientId}`, { cancelToken: cancelToken.token })
                .then((res) => {
                    setLicences(res.data);
                }).catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("Operação Cancelada!")
                    } else {
                        console.log(err);
                    }
                });
        }
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
        }).then(() => {
            const cancelToken = axios.CancelToken.source();
            axios.get(`${process.env.REACT_APP_API_URL}/alllicences/${clientId}`, { cancelToken: cancelToken.token })
                .then((res) => {
                    setLicences(res.data);
                }).catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("Operação Cancelada!")
                    } else {
                        console.log(err);
                    }
                });
            setEdit('');
        });

    };

    const handleEdit = (value) => {
        setEdit(value);
    };

    const handleSave = () => {
        const cancelToken = axios.CancelToken.source();
        const temp = licences.at(edit);
        console.log(temp)
        Swal.fire({
            title: 'Tem a Certeza?',
            text: 'Os dados da licença vão ser atualizados!',
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

                axios.put(`${process.env.REACT_APP_API_URL}/licence/update`, { userId: user._id, licence: temp, cancelToken: cancelToken.token })
                    .then((res) => {
                        if (res.data === 'NOK') {
                            Swal.fire({
                                title: 'Erro!',
                                text: 'Não foi possível atualizar a Licença!',
                                icon: 'error',
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                iconColor: user.appColor,
                                allowOutsideClick: false,
                                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                            }).then(async () => {
                                axios.get(`${process.env.REACT_APP_API_URL}/alllicences/${clientId}`, { cancelToken: cancelToken.token })
                                    .then((res) => {
                                        setLicences(res.data);
                                    }).catch((err) => {
                                        if (axios.isCancel(err)) {
                                            console.log("Operação Cancelada!")
                                        } else {
                                            console.log(err);
                                        }
                                    });
                                setEdit('');
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
                                text: 'Os dados da licença foram atualizados!',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                allowOutsideClick: false,
                                iconColor: user.appColor,
                                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                            }).then(() => {
                                setEdit('');
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
                                iconColor: user.appColor,
                                timerProgressBar: true,
                                allowOutsideClick: false,
                                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                            });
                        }

                    });
            }
        });
    };

    const handleDelete = async () => {
        const cancelToken = axios.CancelToken.source();
        const temp = licences.at(value)._id;

        Swal.fire({
            title: 'Tem a Certeza?',
            text: 'Vai apagar esta Licença!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            iconColor: user.appColor,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
        }).then(async (result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/licence/delete/${temp}`, { cancelToken: cancelToken.token })
                    .then((res) => {
                        if (res.data === 'NOK') {
                            Swal.fire({
                                title: 'Erro!',
                                text: 'Não foi possível apagar a licença!',
                                icon: 'error',
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                iconColor: user.appColor,
                                allowOutsideClick: false,
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
                                iconColor: user.appColor,
                                allowOutsideClick: false,
                                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                            });
                        } else {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'O licença foi apagada!',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false,
                                timerProgressBar: true,
                                iconColor: user.appColor,
                                allowOutsideClick: false,
                                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                            }).then(() => {
                                axios.get(`${process.env.REACT_APP_API_URL}/alllicences/${clientId}`, { cancelToken: cancelToken.token })
                                    .then((res) => {
                                        setLicences(res.data);
                                    }).catch((err) => {
                                        if (axios.isCancel(err)) {
                                            console.log("Operação Cancelada!")
                                        } else {
                                            console.log(err);
                                        }
                                    });
                                setValue('0')
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
                                iconColor: user.appColor,
                                timerProgressBar: true,
                                allowOutsideClick: false,
                                background: user.appMode === 'dark' ? '#b0b5b5' : 'white',
                            });
                        }
                    })
            }
        });
    };



    return (

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <p className="text-xl font-extrabold break-words mb-5">Licenças do Cliente</p>
            {edit === '' ? (
                <>
                    <Button
                        style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                        onClick={() => setAddNew(true)}
                    >
                        <AddIcon />Nova
                    </Button>
                    <Button
                        style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                        onClick={() => handleEdit(value)}
                    >
                        <EditIcon />Editar
                    </Button>
                    <Button
                        style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                        onClick={() => handleDelete()}
                    >
                        <DeleteIcon />Apagar
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
            {addNew && <AddLicence client={clientId} open={addNew} setAdd={closeAddModel} />}
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        {licences.map((row, index) =>
                            <Tab disabled={edit !== ''} key={index} label={row.tipo} value={index.toString()} />
                        )}
                    </TabList>
                </Box>
                {licences.map((row, index) => (

                    edit !== index.toString() ? (
                        <TabPanel key={index} value={index.toString()}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2">Tipo:</label>
                                    <label className="text-xl font-extrabold break-words">{row.tipo}</label>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2">Estado:</label>
                                    <label className="text-xl font-extrabold break-words">{row.estado ? 'Válida' : 'Expirada'}</label>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2 break-keep">Inicio:</label>
                                    <label className="text-xl font-extrabold break-words">{row.startedAt.split('T')[0]}</label>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2 break-keep">Fim:</label>
                                    <label className="text-xl font-extrabold break-words">{row.endedAt.split('T')[0]}</label>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2 break-keep">Observações:</label>
                                    <label className="text-xl font-extrabold break-words">{row.obs}</label>
                                </div>
                            </div>
                        </TabPanel>
                    ) : (
                        <div key={row._id}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                                    <TextField
                                        error={row.tipo === ''}
                                        helperText={row.tipo === '' ? 'Obrigatório' : ''}
                                        margin="dense"
                                        label="Tipo"
                                        type="text"
                                        fullWidth
                                        value={row.tipo}
                                        variant="standard"
                                        onChange={(e) => handleTipoChange(e.target.value, index)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2">Estado:</label>
                                    <label className="text-xl font-extrabold break-words">{row.estado ? 'Válida' : 'Expirada'}</label>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <TextField
                                        error={row.startedAt === ''}
                                        helperText={row.startedAt === '' ? 'Obrigatório' : ''}
                                        margin="dense"
                                        label="Início"
                                        type="date"
                                        fullWidth
                                        value={row.startedAt.split('T')[0]}
                                        variant="standard"
                                        onChange={(e) => handleInicioChange(e.target.value, index)}
                                    />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <TextField
                                        error={row.endedAt === ''}
                                        helperText={row.endedAt === '' ? 'Obrigatório' : ''}
                                        margin="dense"
                                        label="Fim"
                                        type="date"
                                        fullWidth
                                        value={row.endedAt.split('T')[0]}
                                        variant="standard"
                                        onChange={(e) => handleFimChange(e.target.value, index)}
                                    />
                                </div>

                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-3/3 px-3 mb-6 md:mb-0">
                                    <TextField
                                        error={row.obs === ''}
                                        helperText={row.obs === '' ? 'Obrigatório' : ''}
                                        margin="dense"
                                        label="Observações"
                                        type="text"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={row.obs}
                                        variant="standard"
                                        onChange={(e) => handleObsChange(e.target.value, index)}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </TabContext>
        </Box>
    );
};
