import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useDashboard } from '../../Core/Hooks/useDashboard';
import { Dashboard } from './Dashboard';

export const Home = () => {
  const dashboard = useDashboard('amanda.silvestre@dtidigital.com.br');

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
      <main className="pa3">
        {!!dashboard && Dashboard(dashboard)}
      </main>
    </>
  );
};