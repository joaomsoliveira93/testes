import React from 'react';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import config from '@/app/config.json';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import 'sweetalert2/dist/sweetalert2.min.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { AddClient } from '@/app/components/addClient/AddClient';
import { Header } from '@/app/components/header/Header';
import Client from '@/app/interfaces/Client';
import { DataContent } from '@/app/components/dataContent/DataContent';

interface ClientSvrProps {
    activeMenu: boolean;
    screenSize: number;
    user: any;
    showFilters:boolean;
    addNew:boolean;
    closeAddModel:()=>void;
    setShowFilters:(showFilters:boolean)=>void;
}

async function load(cancelTokenSource: CancelTokenSource): Promise<Client[]> {
    try {
        const res: AxiosResponse<Client[]> = await axios.get(`${config.server.apiurl}/allclients`, { cancelToken: cancelTokenSource.token });
        return res.data; // Extract the data from the response
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log("Operação Cancelada!");
        } else {
            console.log(err);
        }
        throw err; // Rethrow the error so that it can be handled by the caller
    }
}

export const ClientsSvr = async ({ activeMenu, screenSize, user, showFilters,addNew, closeAddModel, setShowFilters}: ClientSvrProps) => {
    const cancelTokenSource = axios.CancelToken.source();
    let initialData: Client[] = []
    let filteredData: Client[] = []
    try {
        initialData = await load(cancelTokenSource);
        filteredData = await load(cancelTokenSource);
    } catch (error) {
        console.error(error);
    } finally {
        cancelTokenSource.cancel();
    }

    let filterNome:string='';
    let filterNcont:string='';
    let filterEmail:string='';

    const handleFilter = () => {
        filteredData = initialData.filter(
            (row: Client) => (
                !filterNome || row.name.toLowerCase().includes(filterNome.toLowerCase()))
                && (!filterNcont || row.ncont.toString().includes(filterNcont))
                && (!filterEmail || row.email.toLowerCase().includes(filterEmail.toLowerCase())
                ),
        );
    }

    return (
        <>
            <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
                <Header title="Clientes" />
                <div className="flex">
                    {user.canManageClients && (
                        <Button
                            className=""
                            style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                            onClick={() => addNew=true}
                        >
                            <AddIcon /> Novo
                        </Button>
                    )}
                    {((activeMenu && ((screenSize - 305) < 950)) || (!activeMenu && (screenSize < 950)))
                        && <Button style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }} onClick={() => setShowFilters(!showFilters)}><VisibilityIcon />Filtros</Button>}
                    {
                        showFilters && (
                            <div>
                                <TextField
                                    style={{ marginLeft: '12px', marginTop: '-15px' }}
                                    id="filterNome"
                                    label="Nome do Cliente"
                                    value={filterNome}
                                    type="search"
                                    variant="standard"
                                    onChange={(e) => { filterNome=e.target.value; handleFilter(); }}
                                />
                                <TextField
                                    style={{ marginLeft: '12px', marginTop: '-15px' }}
                                    id="filterNcont"
                                    label="Nº de contribuinte"
                                    value={filterNcont}
                                    type="search"
                                    variant="standard"
                                    onChange={(e) => { filterNcont=e.target.value; handleFilter(); }}
                                />
                                <TextField
                                    style={{ marginLeft: '12px', marginTop: '-15px' }}
                                    id="filterEmail"
                                    label="Email"
                                    value={filterEmail}
                                    type="search"
                                    variant="standard"
                                    onChange={(e) => { filterEmail=e.target.value; handleFilter(); }}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            {addNew && <AddClient open={addNew} setAdd={closeAddModel} />}
            <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-4 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md`}>
            <DataContent user={user} filteredData={filteredData}/>
            </div>
        </>
    )
}
