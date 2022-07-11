import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { HomeOutlined, DashboardOutlined, Menu, KeyboardReturn } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../Core/Redux/Hooks';
import { logout } from '../../Core/Redux/UserSlice';

type ShellProps = {
  title: string;
};

export const Shell: React.FC<ShellProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const [drawer, setDrawer] = useState(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  const logoutActions = () => {
    dispatch(logout());
    setRedirect(true);
  };

  return (
    <>
      {redirect && <Navigate to={{ pathname: '/login' }} />}

      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton onClick={() => setDrawer(true)} edge="start">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            {title}
          </Typography>
        </Toolbar>
        <Drawer anchor={'left'} open={drawer} onClose={() => setDrawer(false)}>
          <List className="flex flex-column h-100" style={{ width: 250 }}>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button component={Link} to="/dashboards">
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary={'Dashboards'} />
            </ListItem>
            <ListItem style={{ flexGrow: 1 }}></ListItem>
            <ListItem button onClick={logoutActions}>
              <ListItemIcon>
                <KeyboardReturn />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </>
  );
};