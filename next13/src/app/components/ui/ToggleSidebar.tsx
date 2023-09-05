"use client"
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

export const ToggleSidebar = () => {
  return (
   <button className="fixed dark:bg-gray-400 bg-white rounded-lg dark:hover:bg-white dark:hover:text-black hover:bg-gray-400 hover:text-black w-8 h-8 text-black z-40 top-2 left-5">
   <MenuIcon/>
   </button>
  )
}
