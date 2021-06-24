import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import { DashboardOutlined, GroupAdd, HomeOutlined, Menu } from '@material-ui/icons';
import { useDashboard } from '../../Core/Hooks/useDashboard';
import { Dashboard } from './Dashboard/Dashboard';
import { OneononeInsert } from './Oneonone/OneononeInsert';
import { AuthenticationRepository } from '../../Core/Repositories/AuthenticationRepository';

export const Home: React.FC = () => {
  const dashboard = useDashboard(AuthenticationRepository.user.id);
  const [drawer, setDrawer] = useState(false);
  const [oneononeInsertDialog, setOneononeInsertDialog] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton onClick={() => setDrawer(true)} edge="start">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            One-on-one's
          </Typography>
        </Toolbar>
        <Drawer anchor={'left'} open={drawer} onClose={() => setDrawer(false)}>
          <List style={{ width: 250 }}>
            <ListItem button>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary={'Dashboards'} />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>

      <main className="flex flex-column items-start pa3" style={{ gap: '1rem' }}>
        <Button variant="contained" color="primary" startIcon={<GroupAdd />} onClick={() => setOneononeInsertDialog(true)}>Register one-on-one</Button>
        {!!dashboard && <Dashboard dashboard={dashboard} />}
      </main>

      <OneononeInsert open={oneononeInsertDialog} onClose={() => setOneononeInsertDialog(false)} />
    </>
  );
};