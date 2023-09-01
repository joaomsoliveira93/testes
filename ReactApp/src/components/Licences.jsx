import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button } from '@mui/material';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import config from '../config.json';

export const Licences = ({ clientId }) => {
    const [value, setValue] = useState('0');
    const [edit, setEdit] = useState('');
    const { user } = useStateContext();
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
        axios.get(`${config.server.apiurl}/alllicences/${clientId}`, { cancelToken: cancelToken.token })
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

    const handleCancel = () => {
        setEdit('');
    };

    return (

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <p className="text-xl font-extrabold break-words mb-5">Licenças do Cliente</p>
            {edit === '' ? (
                <>
                    <Button
                        style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                        onClick={() => setEdit(value)}
                    >
                        <EditIcon />Editar
                    </Button>
                    <Button
                        style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                    >
                        <DeleteIcon />Apagar
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
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
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        {licences.map((row, index) => (
                            <Tab disabled={edit !== ''} key={index} label={row.tipo} value={index.toString()} />
                        ))}
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
                                    <label className="text-xl font-extrabold break-words">{row.estado === 1 ? 'Válida' : 'Expirada'}</label>
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
                        <>
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
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="text-xl mr-2">Estado:</label>
                                    <label className="text-xl font-extrabold break-words">{row.estado === 1 ? 'Válida' : 'Expirada'}</label>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <TextField
                                        error={row.startedAt === ''}
                                        helperText={row.startedAt === '' ? 'Obrigatório' : ''}
                                        margin="dense"
                                        label="Morada"
                                        type="text"
                                        fullWidth
                                        value={row.startedAt}
                                        variant="standard"
                                    />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <TextField
                                        error={row.endedAt === ''}
                                        helperText={row.endedAt === '' ? 'Obrigatório' : ''}
                                        margin="dense"
                                        label="Morada"
                                        type="text"
                                        fullWidth
                                        value={row.endedAt}
                                        variant="standard"
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
                                        fullWidth
                                        value={row.obs}
                                        variant="standard"
                                    />
                                </div>
                            </div>
                        </>
                    )
                ))}
            </TabContext>
        </Box>
    );
};
