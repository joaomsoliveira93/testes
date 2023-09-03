import React from 'react'

interface HeaderProps{
    title: string;
}

export const Header = ({title}:HeaderProps) => {
  return (
    <div className="mt-2 ml-1 mb-4">
    <p className="text-xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
  )
}
