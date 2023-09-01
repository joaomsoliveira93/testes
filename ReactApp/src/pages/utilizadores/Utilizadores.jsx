import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { Paper, TableContainer, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TablePagination, Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useStateContext } from '../../contexts/ContextProvider';
import { Header, AddUser } from '../../components';
import config from '../../config.json';

const rowsPerPageOptions = [5, 10, 25];

const Utilizadores = () => {
  const { screenSize, activeMenu, user } = useStateContext();
  const [estadoFilter, setEstadoFilter] = useState(-1);
  const [nameFilter, setNameFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('all');
  const [showFilters, setShowFilters] = useState('');
  const [rows, setRows] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
  const [addNew, setAddNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (!user.canManageUsers) {
      navigate('/clientes');
    }

    Swal.fire({
      title: 'A Carregar...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF',
      iconColor: user.appColor,
    });

    axios.get(`${config.server.apiurl}/allusers`, { cancelToken: cancelToken.token })
      .then((res) => {
        setRows(res.data);
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
  }, [navigate, user.canManageUsers, user.appColor, user.appMode]);

  const filteredRows = rows.filter(
    (row) => (
      (!estadoFilter || estadoFilter === -1 || (row.estado === Number.parseInt(estadoFilter, 36))))
      && (!tipoFilter || tipoFilter === 'all' || (row.tipo === tipoFilter))
      && (!nameFilter || row.nome.toLowerCase().includes(nameFilter.toLowerCase())),
  );

  useEffect(() => {
    if ((activeMenu && ((screenSize - 305) < 950)) || (!activeMenu && (screenSize < 950))) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, [screenSize, activeMenu]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getComparator = () => (order === 'desc' ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1) : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

  const closeAddModel = async (load) => {
    setAddNew(false);
    if (load) {
      const res = await axios.get(`${config.server.apiurl}/allusers`);
      setRows(res.data);
    }
  };
  return (
    <>
      <div className={`fixed component z-10 mr-1 top-12 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-295px)] ' : 'w-[calc(100%-7px)]'} p-2 shadow-md shadow-black dark:bg-gray-400 bg-white rounded-md`}>
        <Header category="Page" title="Todos os Utilizadores" />
        <div className="flex">
          <Button
            className=""
            style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', marginBottom: '7px', padding: '5px' }}
            onClick={() => setAddNew(true)}
          >
            <AddIcon /> Novo
          </Button>
          {((activeMenu && ((screenSize - 305) < 950)) || (!activeMenu && (screenSize < 950)))
            && <Button style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px', color: 'white', marginLeft: '12px', padding: '5px' }} onClick={() => setShowFilters(!showFilters)}><VisibilityIcon />Filtros</Button>}

          {showFilters
            && (
              <div>
                <TextField
                  style={{ marginLeft: '12px', marginTop: '-15px', marginBottom: '8.5px' }}
                  id="nameFilter"
                  label="Nome"
                  value={nameFilter}
                  type="search"
                  variant="standard"
                  onChange={(e) => { setNameFilter(e.target.value); setPage(0); }}
                />
                <FormControl variant="standard" sx={{ minWidth: 150 }}>
                  <Select
                    height="20px"
                    style={{ marginLeft: '12px' }}
                    value={tipoFilter}
                    onChange={(e) => { setTipoFilter(e.target.value); setPage(0); }}
                  >
                    <MenuItem value="all">Tipo</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Utilizador</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ minWidth: 150 }}>
                  <Select
                    style={{ marginLeft: '12px' }}
                    value={estadoFilter}
                    onChange={(e) => { setEstadoFilter(e.target.value); setPage(0); }}
                  >
                    <MenuItem value="-1">Estado</MenuItem>
                    <MenuItem value="1">Ativo</MenuItem>
                    <MenuItem value="0">Inativo</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
        </div>
      </div>
      {addNew && <AddUser open={addNew} setAdd={closeAddModel} />}
      <div className={`fixed component mt-[180px] mr-2 p-3 bottom-2 -top-4 right-0 ${activeMenu && screenSize > 900 ? 'w-[calc(100%-305px)]' : 'w-[calc(100%-15px)]'} dark:bg-gray-400 bg-white rounded-md`}>
        <Paper sx={{ width: '100%', height: '100%' }} style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
          <TableContainer style={{ height: '90%', backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }} />
                  <TableCell key="id" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TableSortLabel
                      active={orderBy === 'id'}
                      direction={orderBy === 'id' ? order : 'asc'}
                      onClick={() => handleSortRequest('id')}
                    >
                      Nome de Utilizador
                    </TableSortLabel>
                  </TableCell>
                  <TableCell key="nome" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TableSortLabel
                      active={orderBy === 'nome'}
                      direction={orderBy === 'nome' ? order : 'asc'}
                      onClick={() => handleSortRequest('nome')}
                    >
                      Nome
                    </TableSortLabel>
                  </TableCell>
                  <TableCell key="email" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TableSortLabel
                      active={orderBy === 'email'}
                      direction={orderBy === 'email' ? order : 'asc'}
                      onClick={() => handleSortRequest('email')}
                    >
                      E-mail
                    </TableSortLabel>
                  </TableCell>
                  <TableCell key="tipo" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TableSortLabel
                      active={orderBy === 'tipo'}
                      direction={orderBy === 'tipo' ? order : 'asc'}
                      onClick={() => handleSortRequest('tipo')}
                    >
                      Tipo
                    </TableSortLabel>
                  </TableCell>
                  <TableCell key="estado" style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                    <TableSortLabel
                      active={orderBy === 'estado'}
                      direction={orderBy === 'estado' ? order : 'asc'}
                      onClick={() => handleSortRequest('estado')}
                    >
                      Estado
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell width="30px">
                        <Link
                          to={`/utilizadores/${row._id}`}
                          style={{ cursor: 'pointer', backgroundColor: user.appColor, borderRadius: '5px' }}
                          className="p-2 text-center text-white hover:drop-shadow-xl "
                        >
                          <VisibilityIcon />
                        </Link>
                      </TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.tipo === 'admin' ? 'Administrador' : 'Utilizador'}</TableCell>
                      <TableCell>{row.estado === 1 ? 'Ativo' : 'Inativo'}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage=""
            labelDisplayedRows={({ from, to, count }) => (`${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`)}
            getItemAriaLabel={(type) => { let newType; if (type === 'next') { newType = 'Próxima Página'; } else { newType = 'Pagina Anterior'; } return newType; }}
          />
        </Paper>
      </div>
    </>
  );
};

export default Utilizadores;
