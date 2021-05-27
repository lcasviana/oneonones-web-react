import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from '../Core/Routes/PrivateRoute';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { PublicRoute } from '../Core/Routes/PublicRoute';

export const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home} isAuthenticated={true} />
        <PublicRoute exact path="/login" component={Login} isAuthenticated={true} />
      </Switch>
    </BrowserRouter>
  </>
);