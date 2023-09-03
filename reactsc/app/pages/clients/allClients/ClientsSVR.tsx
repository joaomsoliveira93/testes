import React, { Key } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import 'sweetalert2/dist/sweetalert2.min.css';
import TextField from '@mui/material/TextField';
import { Paper, TableContainer, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { AddClient } from '../../../components/addClient/AddClient';
import { Header } from '../../../components/header/Header';
import Client from '@/app/interfaces/Client';
type Order = 'asc' | 'desc';

interface PageClientsProps {
    activeMenu: boolean;
    screenSize: number;
    user: any;
    filterNome: string;
    setFilterNome: (filterNome: string) => void;
    filterNcont: string;
    setFilterNcont: (filterNcont: string) => void;
    filterEmail: string;
    setFilterEmail: (filterEmail: string) => void;
    addNew: boolean;
    setAddNew: (addNew: boolean) => void;
    handleSortRequest: (columnId: keyof Client) => void;
    orderBy: Key;
    order: Order;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    filteredData: Client[];
    setPage: (page: number) => void;
    page: number;
    showFilters: boolean;
    setShowFilters: (showFilters: boolean) => void;
    closeAddModel: (close: boolean) => void;
    rowsPerPageOptions: number[];
    rowsPerPage: number;
}

export const ClientsSVR = ({ rowsPerPage, rowsPerPageOptions, closeAddModel, showFilters, setShowFilters, page, setPage, activeMenu, screenSize, user, filterNome, setFilterNome, filterNcont, setFilterNcont, filterEmail, setFilterEmail, addNew, setAddNew, handleSortRequest, orderBy, order, handleChangeRowsPerPage, handleChangePage, filteredData }: PageClientsProps) => {

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

    function stableSort<T>(array: Client[], comparator: (a: T, b: T) => number) {
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
            <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
                <Header title="Clientes" />
                <div className="flex">
                    {user.canManageClients && (
                        <Button
                            className=""
                            style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
                            onClick={() => setAddNew(true)}
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
                                    onChange={(e) => { setFilterNome(e.target.value); setPage(0); }}
                                />
                                <TextField
                                    style={{ marginLeft: '12px', marginTop: '-15px' }}
                                    id="filterNcont"
                                    label="Nº de contribuinte"
                                    value={filterNcont}
                                    type="search"
                                    variant="standard"
                                    onChange={(e) => { setFilterNcont(e.target.value); setPage(0); }}
                                />
                                <TextField
                                    style={{ marginLeft: '12px', marginTop: '-15px' }}
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
                </div>
            </div>
            {addNew && <AddClient open={addNew} setAdd={closeAddModel} />}
            <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-4 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md`}>
                <Paper sx={{ width: '100%', height: '100%' }} style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TableContainer style={{ height: '90%', backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }} />
                                    <TableCell key="nome" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'name'}
                                            direction={orderBy === 'name' ? order : 'asc'}
                                            onClick={() => handleSortRequest('name')}
                                        >
                                            Nome
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="ncont" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'ncont'}
                                            direction={orderBy === 'ncont' ? order : 'asc'}
                                            onClick={() => handleSortRequest('ncont')}
                                        >
                                            Nº de contribuinte
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="morada" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'morada'}
                                            direction={orderBy === 'morada' ? order : 'asc'}
                                            onClick={() => handleSortRequest('morada')}
                                        >
                                            Morada
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="cidade" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'cidade'}
                                            direction={orderBy === 'cidade' ? order : 'asc'}
                                            onClick={() => handleSortRequest('cidade')}
                                        >
                                            Cidade
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="codPost" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'codPost'}
                                            direction={orderBy === 'codPost' ? order : 'asc'}
                                            onClick={() => handleSortRequest('codPost')}
                                        >
                                            Código Postal
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="contacto" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'contacto'}
                                            direction={orderBy === 'contacto' ? order : 'asc'}
                                            onClick={() => handleSortRequest('contacto')}
                                        >
                                            Contacto
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="email" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
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
                                                    to={`/clientes/${encodeURIComponent(row._id)}`}
                                                    style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px' }}
                                                    className="p-2 text-center text-white hover:drop-shadow-xl "
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

            </div>
        </>
    )
}
