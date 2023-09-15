"use client"
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type props={
    link:string;
    title:string;
    icon:ReactNode;
}

export const SidebarLink = ({link,title,icon}:props) => {
    const pathname = usePathname()
    const isActive = pathname === link
  return (
    <Link href={link} className={`${isActive ? 'dark:bg-gray-400 bg-white dark:text-black':''} flex items-center gap-5 pl-4 pt-3 pb-2.5 m-2 rounded-lg text-md  hover:text-white hover:bg-gray-500`}>
        {icon}
        <span className="capitalize ">{title}</span>
    </Link>
  )
}
