"use client"
import Client from '@/app/interfaces/Client';
import React,{useState} from 'react'
import { Paper, TableContainer, Table, TableHead, TableBody, TableSortLabel, TableRow, TableCell, TablePagination, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface DataContentProps{
    user:any;
    filteredData:Client[];
}

type Order = 'asc' | 'desc';

const rowsPerPageOptions = [5, 10, 25];

export const DataContent = ({user, filteredData}:DataContentProps) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[2]);
    const [orderBy, setOrderBy] = React.useState<keyof Client>('name')
    const [order, setOrder] = useState<Order>('asc');

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
  )
}
