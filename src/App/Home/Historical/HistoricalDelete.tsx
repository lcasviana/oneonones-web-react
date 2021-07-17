import React from 'react';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { Close, EventBusy } from '@material-ui/icons';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';
import { ActionDialog } from '../../Shared/ActionDialog';
import { useDispatch } from 'react-redux';
import { getDashboard } from '../../../Core/Redux/Effects';

interface HistoricalDeleteProps {
  open: boolean;
  onClose: () => void;
  historical: HistoricalModel;
}

export const HistoricalDelete: React.FC<HistoricalDeleteProps> = ({ open, onClose, historical }: HistoricalDeleteProps) => {
  const dispatch = useDispatch();
  const user = AuthenticationRepository.user;

  const occurrence = historical.occurrence ? new Date(historical.occurrence).toISOString().substr(0, 10) : null;

  const remove = () => {
    HistoricalsRepository.delete(historical.id)
      .then(() => {
        dispatch(getDashboard(user.id));
        alert('Deleted!');
      })
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(onClose);
  };

  return (
    <>
      <ActionDialog open={open} onClose={onClose} title={'Remove occurrence'}>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12}>
            {user.id !== historical.leader.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{historical.leader.name}</Typography>
              </Grid>
            }

            {user.id !== historical.led.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Led</Typography>
                <Typography variant="body1">{historical.led.name}</Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Occurrence</Typography>
              <Typography variant="body1">{occurrence}</Typography>
            </Grid>
          </Grid>

          <Divider />

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button onClick={onClose} startIcon={<Close />} size="small">Cancel</Button>
            <Button variant="contained" color="primary" onClick={remove} startIcon={<EventBusy />}>Remove</Button>
          </div>

        </Grid>
      </ActionDialog>
    </>
  );
}