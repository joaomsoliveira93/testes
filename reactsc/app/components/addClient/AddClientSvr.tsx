'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Client from '@/app/interfaces/Client';


interface AddClientProps {
    open: boolean;
    client:Client;
    user:any;
    handleClose:(add:boolean)=>void;
    setClient:(client:Client)=>void;
    handleSave:()=>void;

}


export const AddClientSvr = ({ open, handleClose, client, user, setClient ,handleSave}: AddClientProps) => {
    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>Adicionar Cliente</DialogTitle>
            <DialogContent style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <TextField
                    error={client.name === ''}
                    helperText={client.name === '' ? 'Obrigatório' : ''}
                    autoFocus
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={client.name}
                    onChange={(e) => setClient({
                        ...client,
                        name: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.ncont === ''}
                    helperText={client.ncont === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Nº de contribuinte"
                    type="text"
                    fullWidth
                    value={client.ncont}
                    onChange={(e) => setClient({
                        ...client,
                        ncont: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.morada === ''}
                    helperText={client.morada === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Morada"
                    type="text"
                    fullWidth
                    value={client.morada}
                    onChange={(e) => setClient({
                        ...client,
                        morada: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.cidade === ''}
                    helperText={client.cidade === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Cidade"
                    type="text"
                    fullWidth
                    value={client.cidade}
                    onChange={(e) => setClient({
                        ...client,
                        cidade: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.codPost === ''}
                    helperText={client.codPost === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Código Postal"
                    type="text"
                    fullWidth
                    value={client.codPost}
                    onChange={(e) => setClient({
                        ...client,
                        codPost: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.contacto === ''}
                    helperText={client.contacto === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Contacto"
                    type="text"
                    fullWidth
                    value={client.contacto}
                    onChange={(e) => setClient({
                        ...client,
                        contacto: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    error={client.email === ''}
                    helperText={client.email === '' ? 'Obrigatório' : ''}
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={client.email}
                    onChange={(e) => setClient({
                        ...client,
                        email: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Representante"
                    type="text"
                    fullWidth
                    value={client.rep}
                    onChange={(e) => setClient({
                        ...client,
                        rep: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Contacto do Representante"
                    type="text"
                    fullWidth
                    value={client.repContacto}
                    onChange={(e) => setClient({
                        ...client,
                        repContacto: e.target.value,
                    })}
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Email do Representante"
                    type="text"
                    fullWidth
                    value={client.repEmail}
                    onChange={(e) => setClient({
                        ...client,
                        repEmail: e.target.value,
                    })}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions style={{ backgroundColor: user.appMode === 'dark' ? '#a1a6ad' : '#FFFFFF' }}>
                <Button
                    disabled={
                        client.name === ''
                        && client.ncont === ''
                        && client.morada === ''
                        && client.cidade === ''
                        && client.codPost === ''
                        && client.contacto === ''
                        && client.email === ''
                    }
                    onClick={handleSave}
                >
                    Adicionar
                </Button>
                <Button onClick={() => handleClose(false)}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    )
}


