import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { Dashboard } from './Dashboard/Dashboard';
import { OneononeInsert } from './Oneonone/OneononeInsert';
import { AppState } from '../../Core/Redux/Store';
import { Shell } from '../Shared/Shell';
import { useAppDispatch, useAppSelector } from '../../Core/Redux/Hooks';
import { DashboardsRepository } from '../../Core/Repositories/DashboardsRepository';
import { getDashboard } from '../../Core/Redux/DashboardSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dashboard } = useAppSelector((state: AppState) => state.dashboard);
  const { user } = useAppSelector((state: AppState) => state.user);
  const [oneononeInsertDialog, setOneononeInsertDialog] = useState(false);
  
  useEffect(() => {
    DashboardsRepository.obtainById(user!.id)
      .then((dashboard) => dispatch(getDashboard(dashboard)));
  }, [dispatch, user]);

  return (
    <>
      <Shell title={'One-on-one\'s'} />

      <main className="flex flex-column items-start pa3" style={{ gap: '1rem' }}>
        <Button variant="contained" color="primary" startIcon={<GroupAdd />} onClick={() => setOneononeInsertDialog(true)}>Register one-on-one</Button>
        {!!dashboard && <Dashboard dashboard={dashboard} />}
      </main>

      <OneononeInsert open={oneononeInsertDialog} onClose={() => setOneononeInsertDialog(false)} />
    </>
  );
};