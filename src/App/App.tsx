import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { Dashboads } from './Dashboards/Dashboards';
import { useSelector } from 'react-redux';
import { AppState } from '../Core/Redux/Store';

export const App: React.FC = () => {
  const { user } = useSelector((state: AppState) => state.user);
  const isAuthenticated = !!user;

  const PublicRoute: React.FC = () =>
    isAuthenticated ? <Navigate to={'/'} replace /> : <Outlet />;

  const PrivateRoute: React.FC = () =>
    !isAuthenticated ? <Navigate to={'/login'} replace /> : <Outlet />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />} >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboards" element={<Dashboads />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};