'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { useStateContext } from '../../../contexts/ContextProvider';
import config from '../../../config.json';
import Client from '../../../interfaces/Client'
import { ClientsSVR } from './ClientsSVR';

const rowsPerPageOptions = [5, 10, 25];

type Order = 'asc' | 'desc';

export const Clients = () => {
    const { activeMenu, screenSize, user } = useStateContext();
    const [initialData, setInitialData] = useState<Client[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[2]);
    const [orderBy, setOrderBy] = React.useState<keyof Client>('name')
    const [order, setOrder] = useState<Order>('asc');
    const [showFilters, setShowFilters] = useState<boolean>(true);
    const [filterNome, setFilterNome] = useState<string>('');
    const [filterNcont, setFilterNcont] = useState<string>('');
    const [filterEmail, setFilterEmail] = useState<string>('');
    const [addNew, setAddNew] = useState<boolean>(false);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        Swal.fire({
            title: 'A Carregar...',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF',
            iconColor: user.appColor,
        });

        axios.get(`${config.server.apiurl}/allclients`, { cancelToken: cancelToken.token })
            .then((res) => {
                setInitialData(res.data);
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
    }, [user.appColor, user.appMode]);

    useEffect(() => {
        if ((activeMenu && ((screenSize - 305) < 900)) || (!activeMenu && (screenSize < 900))) {
            setShowFilters(false);
        } else {
            setShowFilters(true);
        }
    }, [screenSize, activeMenu]);

    const filteredData = initialData.filter(
        (row: Client) => (
            !filterNome || row.name.toLowerCase().includes(filterNome.toLowerCase()))
            && (!filterNcont || row.ncont.toString().includes(filterNcont))
            && (!filterEmail || row.email.toLowerCase().includes(filterEmail.toLowerCase())
            ),
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (columnId: keyof Client) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    const closeAddModel = async (load: boolean) => {
        setAddNew(false);
        if (load) {
            const res = await axios.get(`${config.server.apiurl}/allclients`);
            setInitialData(res.data);
        }
    };


    type Order = 'asc' | 'desc';


    return (
       <ClientsSVR rowsPerPage={rowsPerPage} rowsPerPageOptions={rowsPerPageOptions} closeAddModel={closeAddModel} showFilters={showFilters} setShowFilters={setShowFilters} page={page} setPage={setPage} activeMenu={activeMenu} screenSize={screenSize} user={user} filterNome={filterNome} setFilterNome={setFilterNome} filterNcont={filterNcont} setFilterNcont={setFilterNcont} filterEmail={filterEmail} setFilterEmail={setFilterEmail} addNew={addNew} setAddNew={setAddNew} handleSortRequest={handleSortRequest} orderBy={orderBy} order={order} handleChangeRowsPerPage={handleChangeRowsPerPage} handleChangePage={handleChangePage} filteredData={filteredData}/>
    )
}
