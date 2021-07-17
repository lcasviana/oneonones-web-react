import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../Core/Routes/PrivateRoute';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { PublicRoute } from '../Core/Routes/PublicRoute';
import { Dashboads } from './Dashboards/Dashboards';
import { AuthenticationRepository } from '../Core/Repositories/AuthenticationRepository';

export const App: React.FC = () => {
  const isAuthenticated = AuthenticationRepository.isAuthenticated;
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