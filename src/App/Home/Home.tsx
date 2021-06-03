import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { GroupAdd, Menu } from '@material-ui/icons';
import { useDashboard } from '../../Core/Hooks/useDashboard';
import { Dashboard } from './Dashboard/Dashboard';
import { OneononeInsert } from './Oneonone/OneononeInsert';
import { AuthenticationRepository } from '../../Core/Repositories/AuthenticationRepository';

export const Home: React.FC = () => {
  const dashboard = useDashboard(AuthenticationRepository.user.id);
  const [oneononeInsertDialog, setOneononeInsertDialog] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton edge="start">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            One-on-one's
          </Typography>
        </Toolbar>
      </AppBar>

      <main className="flex flex-column items-start pa3" style={{ gap: '1rem' }}>
        <Button variant="contained" color="primary" startIcon={<GroupAdd />} onClick={() => setOneononeInsertDialog(true)}>Register one-on-one</Button>
        {!!dashboard && <Dashboard dashboard={dashboard} />}
      </main>

      <OneononeInsert open={oneononeInsertDialog} onClose={() => setOneononeInsertDialog(false)} />
    </>
  );
};