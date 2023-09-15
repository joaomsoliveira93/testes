"use client"
import client from '@/interfaces/Client'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import { AddClient } from './addClient';
import AddIcon from '@mui/icons-material/Add';

type props = {
    clients: client[]
}

type Order = 'asc' | 'desc';

const rowsPerPageOptions = [5, 10, 25];

export const Content = ({ clients }: props) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);
    const [orderBy, setOrderBy] = React.useState<keyof client>('name')
    const [order, setOrder] = useState<Order>('asc');
    const [showFilters, setShowFilters] = useState<boolean>(true);
    const [filterNome, setFilterNome] = useState<string>('');
    const [filterNcont, setFilterNcont] = useState<string>('');
    const [filterEmail, setFilterEmail] = useState<string>('');
    const [addNew, setAddNew] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<number>(0);

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (((windowSize - 305) < 900) && !showFilters) {
            setShowFilters(false);
        } else {
            setShowFilters(true);
        }
    }, [windowSize]);

    const filteredData: client[] = clients.filter(
        (row: client) => (
            !filterNome || row.name.toLowerCase().includes(filterNome.toLowerCase()))
            && (!filterNcont || row.ncont.toString().includes(filterNcont))
            && (!filterEmail || row.email.toLowerCase().includes(filterEmail.toLowerCase())
            ),
    );

    const closeAddModel = async () => {
        setAddNew(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleSortRequest = (columnId: keyof client) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(order: string, orderBy: Key,): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort<T>(array: client[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order2 = comparator(a[0], b[0]);
            if (order2 !== 0) return order2;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    return (
        <>
            <div className="md:flex inline mt-1">
                <Button
                    className="ml-2 dark:bg-[#484B52] text-black dark:text-white bg-slate-200 rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-gray-400 hover:text-black "
                    onClick={() => setAddNew(true)}
                >
                    <AddIcon /> Novo
                </Button>
                {(windowSize - 305) < 900 &&
                    (
                        <Button
                            className="ml-2 dark:bg-[#484B52] text-black dark:text-white bg-slate-200 rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-gray-400 hover:text-black "
                            onClick={() => setShowFilters(!showFilters)}>
                            <VisibilityIcon />Filtros
                        </Button>

                    )}
            </div>
            {showFilters && (
                <div className='fixed z-50 dark:bg-gray-400 bg-white right-[20px] md:left-[310px] left-[10px] lg:shadow-none shadow-lg shadow-slate-400'>
                    <TextField
                        style={{ marginLeft: '12px', marginTop: '5px' }}
                        id="filterNome"
                        label="Nome do Cliente"
                        value={filterNome}
                        type="search"
                        variant="standard"
                        onChange={(e) => { setFilterNome(e.target.value); setPage(0); }}
                    />
                    <TextField
                        style={{ marginLeft: '12px', marginTop: '5px' }}
                        id="filterNcont"
                        label="Nº de contribuinte"
                        value={filterNcont}
                        type="search"
                        variant="standard"
                        onChange={(e) => { setFilterNcont(e.target.value); setPage(0); }}
                    />
                    <TextField
                        style={{ marginLeft: '12px', marginTop: '5px' }}
                        id="filterEmail"
                        label="Email"
                        value={filterEmail}
                        type="search"
                        variant="standard"
                        onChange={(e) => { setFilterEmail(e.target.value); setPage(0); }}
                    />
                </div>
            )
            }

            {addNew && <AddClient open={addNew} setAdd={closeAddModel} />}
            <Paper sx={{ width: '100%', background: 'transparent', overflow: 'hidden' }} className="lg:mt-11 xl:mt-16 mt-9 md:h-[calc(100%-150px)] h-[calc(100%-120px)]">
                <TableContainer className="h-[calc(100%-50px)]" >
                    <Table stickyHeader size="small">
                        <TableHead >
                            <TableRow >
                                <TableCell className="dark:bg-gray-400 bg-white" />
                                <TableCell className="dark:bg-gray-400 bg-white" >
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={() => handleSortRequest('name')}
                                    >
                                        Nome
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell key="ncont" className="dark:bg-gray-400 bg-white">
                                    <TableSortLabel
                                        active={orderBy === 'ncont'}
                                        direction={orderBy === 'ncont' ? order : 'asc'}
                                        onClick={() => handleSortRequest('ncont')}
                                    >
                                        Nº de contribuinte
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell key="morada" className="dark:bg-gray-400 bg-white">
                                    <TableSortLabel
                                        active={orderBy === 'morada'}
                                        direction={orderBy === 'morada' ? order : 'asc'}
                                        onClick={() => handleSortRequest('morada')}
                                    >
                                        Morada
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell key="cidade" className="dark:bg-gray-400 bg-white">
                                    <TableSortLabel
                                        active={orderBy === 'cidade'}
                                        direction={orderBy === 'cidade' ? order : 'asc'}
                                        onClick={() => handleSortRequest('cidade')}
                                    >
                                        Cidade
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell key="codPost" className="dark:bg-gray-400 bg-white">
                                    <TableSortLabel
                                        active={orderBy === 'codPost'}
                                        direction={orderBy === 'codPost' ? order : 'asc'}
                                        onClick={() => handleSortRequest('codPost')}
                                    >
                                        Código Postal
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell key="contacto" className="dark:bg-gray-400 bg-white">
                                    <TableSortLabel
                                        active={orderBy === 'contacto'}
                                        direction={orderBy === 'contacto' ? order : 'asc'}
                                        onClick={() => handleSortRequest('contacto')}
                                    >
                                        Contacto
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell key="email" className="dark:bg-gray-400 bg-white">
                                    <TableSortLabel
                                        active={orderBy === 'email'}
                                        direction={orderBy === 'email' ? order : 'asc'}
                                        onClick={() => handleSortRequest('email')}
                                    >
                                        Email
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(filteredData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell width="30px">
                                            <Link
                                                href={`/clientes/${encodeURIComponent(row._id)}`}
                                                className="p-2 dark:bg-[#484B52] dark:text-white bg-slate-200 rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-gray-400 hover:text-black "
                                            >
                                                <VisibilityIcon />
                                            </Link>
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.ncont}</TableCell>
                                        <TableCell>{row.morada}</TableCell>
                                        <TableCell>{row.cidade}</TableCell>
                                        <TableCell>{row.codPost}</TableCell>
                                        <TableCell>{row.contacto}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage=""
                    labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`}
                    getItemAriaLabel={(type) => { let newType; if (type === 'next') { newType = 'Próxima Página'; } else { newType = 'Página Anterior'; } return newType; }}
                />
            </Paper>


        </>
    )
}
