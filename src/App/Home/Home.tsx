import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { GroupAdd } from '@mui/icons-material';
import { Dashboard } from './Dashboard/Dashboard';
import { OneononeInsert } from './Oneonone/OneononeInsert';
import { getDashboard } from '../../Core/Redux/Effects';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../Core/Redux/Store';
import { Shell } from '../Shared/Shell';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user)!;
  useEffect(() => {
    dispatch(getDashboard(user.id));
  }, [dispatch, user]);
  const dashboard = useSelector((state: AppState) => state.dashboard);

  const [oneononeInsertDialog, setOneononeInsertDialog] = useState(false);

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