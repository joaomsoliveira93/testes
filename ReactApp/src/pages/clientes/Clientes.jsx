import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Paper, TableContainer, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';
import { AddClient, Header } from '../../components';
import config from '../../config.json';

const rowsPerPageOptions = [5, 10, 25];

const Clientes = () => {
    const { activeMenu, screenSize, user } = useStateContext();
    const [initialData, setInitialData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[2]);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [showFilters, setShowFilters] = useState(true);
    const [filterNome, setFilterNome] = useState('');
    const [filterNcont, setFilterNcont] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [addNew, setAddNew] = useState(false);

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
        (row) => (
            !filterNome || row.nome.toLowerCase().includes(filterNome.toLowerCase()))
            && (!filterNcont || row.ncont.toString().includes(filterNcont))
            && (!filterEmail || row.email.toLowerCase().includes(filterEmail.toLowerCase())
            ),
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order2 = comparator(a[0], b[0]);
            if (order2 !== 0) return order2;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const closeAddModel = async (load) => {
        setAddNew(false);
        if (load) {
            const res = await axios.get(`${config.server.apiurl}/allclients`);
            setInitialData(res.data);
        }
    };

    const getComparator = () => (order === 'desc' ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1) : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    return (
        <>
            <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
                <Header category="Page" title="Clientes" />
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
                                            active={orderBy === 'nome'}
                                            direction={orderBy === 'nome' ? order : 'asc'}
                                            onClick={() => handleSortRequest('nome')}
                                        >
                                            Nome
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="ncont" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                                        <TableSortLabel
                                            active={orderBy === 'ncont'}
                                            direction={orderBy === 'nconr' ? order : 'asc'}
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
    );
};

export default Clientes;
