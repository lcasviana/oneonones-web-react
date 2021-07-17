import React, { useState } from 'react';
import { Button, Card, Grid, TextField, Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { AuthenticationRepository } from '../../Core/Repositories/AuthenticationRepository';
import { UserModel } from '../../Common/Models/UserModel';
import { useDispatch } from 'react-redux';
import { ErrorModel } from '../../Common/Models/ErrorModel';
import { getUser } from '../../Core/Redux/Actions';
import { Redirect } from 'react-router-dom';


export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);

  const login = () => {
    if (!email || !password) {
      alert('Bad request!');
      return;
    }

    AuthenticationRepository.login({ email, password })
      .then((user: UserModel) => {
        dispatch(getUser(user));
        setRedirect(true);
      })
      .catch((e: ErrorModel) => alert(e.errors[0]));
  };

  return (
    <>
      {redirect && <Redirect to={{ pathname: '/' }} />}

      <main className="flex justify-center items-center vw-100 vh-100">
        <Card className="pa3 flex flex-column" style={{ maxWidth: '80vw', width: 420, gap: '0.5rem' }}>

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Email</Typography>
            <TextField className="w-100" type="text" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Password</Typography>
            <TextField type="password" className="w-100" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Grid>

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button variant="contained" color="primary" onClick={login} startIcon={<ExitToApp />}>Login</Button>
          </div>
        </Card>
      </main>
    </>
  );
};