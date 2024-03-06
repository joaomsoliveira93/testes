import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Sidebar, ThemeSettings, UserProfile } from './components';
import { Utilizadores, DtlUtilizador, Login, Profile, Clientes, DtlCliente } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { user, setUser } = useStateContext();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const temp = JSON.parse(localStorage.getItem('token'));
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      console.log('dark');
    } else {
      console.log('light');
    }
    if (temp) {
      const tokenValidDate = new Date(temp.tokenValidDate);
      const currentDateTime = new Date();
      axios.post(`${process.env.REACT_APP_API_URL}/login`, { userName: '', password: '', token: temp.token, cancelToken: cancelToken.token })
        .then((res) => {
          if (tokenValidDate < currentDateTime) {
            localStorage.setItem('token', JSON.stringify({
              token: res.data.token,
              tokenCreatedAt: res.data.tokenCreatedAt,
              tokenValidDate: res.data.tokenValidDate,
            }));
          }
          setUser({
            _id: res.data._id,
            username: res.data.username,
            name: res.data.name,
            email: res.data.email,
            tipo: res.data.tipo,
            img: res.data.img,
            canManageClients: res.data.canManageClients,
            canManageLicences: res.data.canManageLicences,
            canManagePermissions: res.data.canManagePermissions,
            canManageUsers: res.data.canManageUsers,
            appColor: res.data.appColor,
            appMode: res.data.appMode,
          });
        }).catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Operação Cancelada!")
          } else {
            console.log(err);
          }
        });
    }
    return () => {
      cancelToken.cancel();
    }
  }, [setUser]);

  return (
    <Router basename="/">
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
            <Route path="/" element={<Clientes />} />
            <Route path="/Clientes" element={<Clientes />} />
            <Route path="/Clientes/:id" element={<DtlCliente />} />
            <Route path="/perfil/:id" element={<Profile />} />
            <Route path="/utilizadores" element={<Utilizadores />} />
            <Route path="/utilizadores/:id" element={<DtlUtilizador />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;
