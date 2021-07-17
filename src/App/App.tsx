import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../Core/Routes/PrivateRoute';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { PublicRoute } from '../Core/Routes/PublicRoute';
import { Dashboads } from './Dashboards/Dashboards';
import { useSelector } from 'react-redux';
import { AppState } from '../Core/Redux/Store';

export const App: React.FC = () => {
  const user = useSelector((state: AppState) => state.user);
  const isAuthenticated = !!user;
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Home} isAuthenticated={isAuthenticated} />
          <PrivateRoute exact path="/dashboards" component={Dashboads} isAuthenticated={isAuthenticated} />
          <PublicRoute exact path="/login" component={Login} isAuthenticated={isAuthenticated} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
};