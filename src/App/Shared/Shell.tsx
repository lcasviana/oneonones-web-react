import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HomeOutlined, DashboardOutlined, Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type ShellProps = {
  title: string;
};

export const Shell: React.FC<ShellProps> = ({ title }) => {
  const [drawer, setDrawer] = useState(false);

  return (
    <>
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
          <List style={{ width: 250 }}>
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
          </List>
        </Drawer>
      </AppBar>
    </>
  );
};