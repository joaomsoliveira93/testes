"use client"
import React, { ReactNode, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useStateContext } from '@/providers/contextProvider';

export const ToggleSidebar = ({ children }: { children: ReactNode }) => {
  const {activemenu,setActiveMenu} = useStateContext();

  return (
    <div>
      <button
        className="fixed dark:bg-gray-400 bg-white rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-gray-400 hover:text-black w-8 h-8 text-black z-40 top-2 left-5"
        onClick={() => setActiveMenu(!activemenu)}>
        <MenuIcon />
      </button>
      {children}
    </div>

  )
}
