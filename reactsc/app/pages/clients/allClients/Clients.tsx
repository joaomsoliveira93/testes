'use client'
import React, { useState, useEffect } from 'react';

import { useStateContext } from '@/app/contexts/ContextProvider';
import { ClientsSvr } from './ClientsSvr';


const rowsPerPageOptions = [5, 10, 25];

export const Clients = () => {
    const { activeMenu, screenSize, user } = useStateContext();
    const [showFilters,setShowFilters]=useState<boolean>(false)
    const [addNew,setAddNew]=useState<boolean>(false)

    useEffect(() => {
        if ((activeMenu && ((screenSize - 305) < 900)) || (!activeMenu && (screenSize < 900))) {
            setShowFilters(false);
        } else {
            setShowFilters(true);
        }
    }, [screenSize, activeMenu]);

    const closeAddModel = () => {
        setAddNew(false);
    };

    return (
       <ClientsSvr activeMenu={activeMenu} screenSize={screenSize} user={user} showFilters={showFilters} addNew={addNew} closeAddModel={closeAddModel} setShowFilters={setShowFilters}/>
    )
}
