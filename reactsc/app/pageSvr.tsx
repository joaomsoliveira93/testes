import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeSettings } from './components/themeSettings/ThemeSettings';
import { Login } from './pages/login/Login';
import { Navbar } from './components/navbar/Navbar';
import { Sidebar } from './components/sidabar/Sidebar';
import { UserProfile } from './components/userProfile/UserProfile';
import { Clients } from './pages/clients/allClients/Clients';

interface PageProps{
  user:any;
}

export default function PageSVR({user}:PageProps) {

  return (
    <BrowserRouter basename="/">
      {user === null ? (
        <div className="flex relative w-full min-h-screen bg-blue-500">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <div className={`${user.appMode === 'dark' ? 'dark' : ''} flex relative  ${user.appMode === 'dark' ? 'bg-gray-600' : 'bg-slate-400'}  w-full min-h-screen`}>
          <ThemeSettings />
          <Sidebar />
          <Navbar />
          <UserProfile />
          <Routes>
            <Route path="/" element={<Clients />} />
            <Route path="/Clientes" element={<Clients />} />
            {/*<Route path="/Clientes/:id" element={<DtlCliente />} />
            <Route path="/perfil/:id" element={<Profile />} />
            <Route path="/utilizadores" element={<Utilizadores />} />
      <Route path="/utilizadores/:id" element={<DtlUtilizador />} />*/}
          </Routes>
        </div>
      )}
    </BrowserRouter>
  )
}
